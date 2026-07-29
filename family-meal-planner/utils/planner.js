/**
 * 每日菜单生成引擎
 *
 * 规则：
 *  - 早餐：1 套早餐组合
 *  - 午餐：1 荤 + 1 素 + 主食
 *  - 晚餐：1 荤 + 1 素 + 1 汤 + 主食（荤素与午餐不重复）
 *  - 家有 10 岁以下孩子时自动排除辛辣菜
 *  - 同一天菜单按日期确定性生成（第二天自动换新），"换一换"在当日基础上轮换
 */

const { byType, byId } = require('../data/recipes');

/** 简单字符串哈希（用于把日期变成随机种子） */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 伪随机数生成器：同一种子永远产生同一序列 */
function rng(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 允许一天内重复出现的基础食材（鸡蛋、葱姜蒜、米、奶等），
 * 其余主料一天内尽量不重复，保证菜单看起来的多样性。
 */
const ALLOW_REPEAT = [
  '鸡蛋', '姜', '蒜', '小葱', '大米', '糙米', '小米', '黑米',
  '纯牛奶', '豆浆（或黄豆现打）', '虾皮', '面粉'
];

/**
 * 含猪肉的食材（含鲜肉包、馄饨、肉松等隐性猪肉制品）与含酒精食材。
 * 开启"不吃猪肉"模式后，含这些食材的菜一律不出现在菜单中。
 */
const PORK_INGREDIENTS = [
  '猪里脊肉', '猪肉末', '猪肋排', '猪筒骨', '五花肉', '猪肝',
  '腊肠', '午餐肉', '肉松', '速冻鲜肉包', '速冻猪肉煎饺', '速冻荠菜猪肉馄饨'
];
const ALCOHOL_INGREDIENTS = ['啤酒', '酒酿'];

/** 这道菜是否含猪肉或酒精类食材 */
function containsPork(recipe) {
  return (recipe.ingredients || []).some(
    (ing) =>
      PORK_INGREDIENTS.indexOf(ing.name) >= 0 ||
      ALCOHOL_INGREDIENTS.indexOf(ing.name) >= 0 ||
      ing.name.indexOf('猪') >= 0
  );
}

/** 一道菜的"主料"列表（排除调味品与允许重复的基础食材） */
function mainIngredients(recipe) {
  const names = [];
  (recipe.ingredients || []).forEach((ing) => {
    if (ing.pantry) return;
    if (ALLOW_REPEAT.indexOf(ing.name) >= 0) return;
    names.push(ing.name);
  });
  return names;
}

/**
 * 从（已洗好序的）候选池中选一道菜：
 * 跳过当天已选过的菜；优先选主料与当天已用主料零重叠的；
 * 全部有重叠时选重叠最少的，避免死锁。
 */
function pickDiverse(pool, usedIngredients, chosenIds) {
  let best = null;
  let bestOverlap = Infinity;
  for (let i = 0; i < pool.length; i++) {
    const r = pool[i];
    if (chosenIds[r.id]) continue;
    let overlap = 0;
    const mains = mainIngredients(r);
    for (let j = 0; j < mains.length; j++) {
      if (usedIngredients[mains[j]]) overlap++;
    }
    if (overlap === 0) return r;
    if (overlap < bestOverlap) {
      bestOverlap = overlap;
      best = r;
    }
  }
  return best;
}

/**
 * 按家庭份量系数决定三餐结构：人少 → 菜少、但每道菜份量加大（portionBoost），
 * 避免"一位老人一天做七道菜"的不合理菜单，同时保证营养总量不缩水。
 * @param {number} factor 全家份数系数（约等于折算后的人数）
 */
function mealPlanFor(factor) {
  if (factor < 1.6) {
    return {
      tier: 'S',
      boost: 1.4,
      lunch: ['meat', 'staple'],
      dinner: ['veg', 'soup', 'staple'],
      label: '一口人精简模式：每餐一两道菜，每道菜份量已加大'
    };
  }
  if (factor < 2.4) {
    return {
      tier: 'M',
      boost: 1.1,
      lunch: ['meat', 'veg', 'staple'],
      dinner: ['meat', 'soup', 'staple'],
      label: '两口人模式：全天两荤一素一汤，份量略有加大'
    };
  }
  return {
    tier: 'L',
    boost: 1,
    lunch: ['meat', 'veg', 'staple'],
    dinner: ['meat', 'veg', 'soup', 'staple'],
    label: ''
  };
}

/**
 * 生成某一天的菜单
 * @param {string} dateStr  如 '2026-07-26'
 * @param {number|object} shuffle "换一换"次数：数字为整天统一；
 *   传 {breakfast, lunch, dinner} 可按餐独立换（换前面的餐可能连带影响后面的餐，
 *   因为后面的餐要避开前面已用的食材）
 * @param {boolean|object} prefs 口味偏好：布尔值兼容旧用法（= noSpicy），
 *   或对象 { noSpicy, noPork, factor }（factor 决定三餐结构，缺省按大家庭）
 * @returns {{breakfast: object[], lunch: object[], dinner: object[]}}
 */
function planDay(dateStr, shuffle, prefs) {
  const opts = typeof prefs === 'object' && prefs ? prefs : { noSpicy: !!prefs, noPork: false };
  const structure = mealPlanFor(typeof opts.factor === 'number' ? opts.factor : 3);
  const shuffles =
    typeof shuffle === 'object' && shuffle
      ? shuffle
      : { breakfast: shuffle || 0, lunch: shuffle || 0, dinner: shuffle || 0 };

  const base = hash(dateStr);
  const pool = (type, mealShuffle) => {
    let list = byType(type);
    if (opts.noSpicy) list = list.filter((r) => !r.spicy);
    if (opts.noPork) list = list.filter((r) => !containsPork(r));
    return seededShuffle(list, rng(base + hash(type) + (mealShuffle || 0) * 7919));
  };

  const usedIngredients = {};
  const chosenIds = {};
  const take = (type, mealShuffle) => {
    const r = pickDiverse(pool(type, mealShuffle), usedIngredients, chosenIds);
    if (!r) return null;
    chosenIds[r.id] = true;
    mainIngredients(r).forEach((n) => {
      usedIngredients[n] = true;
    });
    return r;
  };

  const breakfast = [take('breakfast', shuffles.breakfast)];
  const lunch = structure.lunch.map((t) => take(t, shuffles.lunch));
  const dinner = structure.dinner.map((t) => take(t, shuffles.dinner));

  return {
    breakfast: breakfast.filter(Boolean),
    lunch: lunch.filter(Boolean),
    dinner: dinner.filter(Boolean)
  };
}

/**
 * 汇总一天菜单的营养：早餐按份数系数，午晚餐额外乘以份量加大倍率
 * （小家庭菜少时每道做大，营养总量才不缩水）
 */
function dayNutrition(menu, familyFactor, portionBoost) {
  const boost = portionBoost || 1;
  const total = { kcal: 0, protein: 0, fat: 0, carbs: 0, calcium: 0, iron: 0 };
  ['breakfast', 'lunch', 'dinner'].forEach((meal) => {
    const mealFactor = meal === 'breakfast' ? familyFactor : familyFactor * boost;
    (menu[meal] || []).forEach((r) => {
      if (!r || !r.nutrition) return;
      Object.keys(total).forEach((k) => {
        total[k] += (r.nutrition[k] || 0) * mealFactor;
      });
    });
  });
  Object.keys(total).forEach((k) => {
    total[k] = Math.round(total[k]);
  });
  return total;
}

/** 把菜单（菜谱对象）压缩为 id 结构，便于存储 */
function menuToIds(menu) {
  const pick = (list) => list.map((r) => r.id);
  return { breakfast: pick(menu.breakfast), lunch: pick(menu.lunch), dinner: pick(menu.dinner) };
}

/** 从 id 结构恢复菜单 */
function menuFromIds(ids) {
  const restore = (list) => (list || []).map(byId).filter(Boolean);
  return { breakfast: restore(ids.breakfast), lunch: restore(ids.lunch), dinner: restore(ids.dinner) };
}

module.exports = { planDay, dayNutrition, menuToIds, menuFromIds, containsPork, mealPlanFor };

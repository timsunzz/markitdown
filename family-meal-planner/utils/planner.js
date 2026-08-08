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

const { byType, byId, RECIPES } = require('../data/recipes');

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
      boost: 1.25,
      lunch: ['meat', 'staple'],
      dinner: ['meat', 'veg', 'staple'],
      label: '一口人精简模式：午晚餐都有荤菜保证蛋白质，每道菜份量已加大'
    };
  }
  if (factor < 2.4) {
    return {
      tier: 'M',
      boost: 1.1,
      lunch: ['meat', 'veg', 'staple'],
      dinner: ['meat', 'veg', 'soup', 'staple'],
      label: '两口人模式：晚餐两菜一汤，份量略有加大'
    };
  }
  // 3 口及以上：晚餐三菜一汤（大荤 + 半荤小炒 + 素菜 + 汤 + 主食）
  return {
    tier: 'L',
    boost: 1,
    lunch: ['meat', 'veg', 'staple'],
    dinner: ['meat', 'meat', 'veg', 'soup', 'staple'],
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
 *   或对象 { noSpicy, noPork, factor, kcalLimit, budget }
 *   - factor    决定三餐结构，缺省按大家庭
 *   - kcalLimit 全家全天热量上限（千卡）。设置后超出会自动换低热量做法的菜
 *   - budget    今日买菜预算（元）。设置后超出会自动换便宜的菜，尽量贴近
 *   约束优先级：营养 > 热量 > 预算。晚餐荤菜位始终从「大荤」硬菜里选，
 *   预算再紧也不会把大荤换成半荤——营养是底线，钱不够时如实提示。
 * @returns {{breakfast: object[], lunch: object[], dinner: object[]}}
 */
function planDay(dateStr, shuffle, prefs) {
  const opts = typeof prefs === 'object' && prefs ? prefs : { noSpicy: !!prefs, noPork: false };
  const factor = typeof opts.factor === 'number' ? opts.factor : 3;
  const structure = mealPlanFor(factor);
  const shuffles =
    typeof shuffle === 'object' && shuffle
      ? shuffle
      : { breakfast: shuffle || 0, lunch: shuffle || 0, dinner: shuffle || 0 };

  const base = hash(dateStr);
  const applyFilters = (list) => {
    if (opts.noSpicy) list = list.filter((r) => !r.spicy);
    if (opts.noPork) list = list.filter((r) => !containsPork(r));
    return list;
  };
  const pool = (type, mealShuffle) => {
    // 一锅端菜（solo）不进常规菜位：牛肉面/咖喱饭不该和一桌荤素菜拼在一起
    let list = applyFilters(byType(type).filter((r) => !r.solo));
    list = seededShuffle(list, rng(base + hash(type) + (mealShuffle || 0) * 7919));
    // 家传菜轮值：带「拿手」徽章的菜每隔几天优先登场一次
    // （只在当天未点"换一换"时生效，点了换一换就正常轮换，不会赖着不走）
    if (!mealShuffle && hash(dateStr + type + 'heir') % 8 === 0) {
      const heirs = list.filter((r) => r.badge);
      if (heirs.length) list = heirs.concat(list.filter((r) => !r.badge));
    }
    return list;
  };
  // 一锅端候选池（咖喱饭、各种面、煲仔饭）：独占一餐，份量按人数放大
  const soloPool = (mealShuffle) => {
    let list = applyFilters(RECIPES.filter((r) => r.solo));
    list = seededShuffle(list, rng(base + hash('solo') + (mealShuffle || 0) * 7919));
    if (!mealShuffle && hash(dateStr + 'soloheir') % 3 === 0) {
      const heirs = list.filter((r) => r.badge);
      if (heirs.length) list = heirs.concat(list.filter((r) => !r.badge));
    }
    return list;
  };

  const usedIngredients = {};
  const chosenIds = {};
  const take = (type, mealShuffle, heavyOnly) => {
    let candidates = pool(type, mealShuffle);
    if (heavyOnly) {
      const heavies = candidates.filter((r) => r.heavy);
      if (heavies.length) candidates = heavies;
    }
    const r = pickDiverse(candidates, usedIngredients, chosenIds);
    if (!r) return null;
    chosenIds[r.id] = true;
    mainIngredients(r).forEach((n) => {
      usedIngredients[n] = true;
    });
    return r;
  };

  const breakfast = [take('breakfast', shuffles.breakfast)];

  // 一锅端午餐日：每隔几天午餐换成一道独立成餐的一锅端（咖喱饭、面、煲仔饭），
  // 省时省力。点"换一换"即可回到正常的一桌菜。晚餐永远不一锅端。
  let lunch;
  if (!shuffles.lunch && hash(dateStr + 'solo') % 6 === 0) {
    const solo = pickDiverse(soloPool(shuffles.lunch), usedIngredients, chosenIds);
    if (solo) {
      chosenIds[solo.id] = true;
      mainIngredients(solo).forEach((n) => {
        usedIngredients[n] = true;
      });
      lunch = [solo];
    }
  }
  if (!lunch) lunch = structure.lunch.map((t) => take(t, shuffles.lunch));

  // 晚餐的第一个荤菜位必须是大荤硬菜（排骨、整鱼、鸡腿这类，半荤小炒不算）
  let dinnerHeavyUsed = false;
  const dinner = structure.dinner.map((t) => {
    const heavyOnly = t === 'meat' && !dinnerHeavyUsed;
    if (heavyOnly) dinnerHeavyUsed = true;
    return take(t, shuffles.dinner, heavyOnly);
  });

  const menu = {
    breakfast: breakfast.filter(Boolean),
    lunch: lunch.filter(Boolean),
    dinner: dinner.filter(Boolean)
  };

  // ===== 优化管线：先热量、后预算（营养 > 热量 > 预算）=====
  if (opts.kcalLimit || opts.budget) {
    optimizeMenu(menu, structure, opts, factor, pool, shuffles);
  }
  return menu;
}

/**
 * 贪心换菜优化：每轮找出「换掉后改善最大」的一道菜替换为同类型的更优做法，
 * 直到达标或换无可换。晚餐大荤位只在大荤池内互换。全程确定性（候选池已按日期洗序）。
 */
function optimizeMenu(menu, structure, opts, factor, pool, shuffles) {
  const { dishCost } = require('../data/prices');
  const heavyDinnerId = { id: null };
  // 找出晚餐大荤位（第一道 heavy 荤菜）
  (menu.dinner || []).some((r) => {
    if (r && r.type === 'meat' && r.heavy) {
      heavyDinnerId.id = r.id;
      return true;
    }
    return false;
  });

  // 一锅端午餐不参与换菜：它本身就是省时省钱的一餐，调整空间留给晚餐
  const slots = [];
  ['lunch', 'dinner'].forEach((meal) => {
    (menu[meal] || []).forEach((r, idx) => {
      if (r && !r.solo) slots.push({ meal, idx });
    });
  });

  const chosen = () => {
    const ids = {};
    ['breakfast', 'lunch', 'dinner'].forEach((m) => (menu[m] || []).forEach((r) => r && (ids[r.id] = true)));
    return ids;
  };
  const dayKcal = () => dayNutrition(menu, factor, structure.boost).kcal;
  const dayMoney = () => {
    let sum = 0;
    ['breakfast', 'lunch', 'dinner'].forEach((m) => {
      const f = m === 'breakfast' ? factor : factor * structure.boost;
      (menu[m] || []).forEach((r) => r && (sum += dishCost(r, f)));
    });
    return sum;
  };

  // metric(r) 越小越好；swap 保持大荤位只换大荤，且预算阶段不把热量顶回超标
  const pass = (limitFn, metric, guardFn, maxIter) => {
    for (let iter = 0; iter < maxIter; iter++) {
      if (limitFn() <= 0) return;
      let best = null;
      const ids = chosen();
      slots.forEach((s) => {
        const cur = menu[s.meal][s.idx];
        const mustHeavy = cur.id === heavyDinnerId.id;
        let candidates = pool(cur.type, shuffles[s.meal]);
        if (mustHeavy) candidates = candidates.filter((r) => r.heavy);
        for (let i = 0; i < candidates.length; i++) {
          const cand = candidates[i];
          if (ids[cand.id]) continue;
          const gain = metric(cur) - metric(cand);
          if (gain <= 0) continue;
          if (guardFn && !guardFn(s, cur, cand)) continue;
          if (!best || gain > best.gain) best = { slot: s, cand, gain, mustHeavy };
        }
      });
      if (!best) return;
      const old = menu[best.slot.meal][best.slot.idx];
      menu[best.slot.meal][best.slot.idx] = best.cand;
      if (old.id === heavyDinnerId.id) heavyDinnerId.id = best.cand.id;
    }
  };

  // 第一轮：热量。超出上限时，把热量最高收益的菜换成同类型低热量做法
  if (opts.kcalLimit) {
    pass(
      () => dayKcal() - opts.kcalLimit,
      (r) => (r.nutrition && r.nutrition.kcal) || 0,
      null,
      8
    );
  }

  // 第二轮：预算。超出预算时换便宜的菜；若开了热量控制，换入的菜不能把热量顶回超标
  if (opts.budget) {
    pass(
      () => dayMoney() - opts.budget,
      (r) => dishCost(r, 1),
      (s, cur, cand) => {
        if (!opts.kcalLimit) return true;
        const f = (s.meal === 'breakfast' ? 1 : structure.boost) * factor;
        const delta = (((cand.nutrition && cand.nutrition.kcal) || 0) - ((cur.nutrition && cur.nutrition.kcal) || 0)) * f;
        return dayKcal() + delta <= opts.kcalLimit;
      },
      8
    );
  }
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

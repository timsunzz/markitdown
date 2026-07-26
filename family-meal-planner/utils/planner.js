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
 * 生成某一天的菜单
 * @param {string} dateStr  如 '2026-07-26'
 * @param {number} shuffle  "换一换"次数，0 为默认菜单
 * @param {boolean} noSpicy 是否排除辛辣菜
 * @returns {{breakfast: object[], lunch: object[], dinner: object[]}}
 */
function planDay(dateStr, shuffle, noSpicy) {
  const random = rng(hash(dateStr) + (shuffle || 0) * 7919);

  const pool = (type) => {
    let list = byType(type);
    if (noSpicy) list = list.filter((r) => !r.spicy);
    return seededShuffle(list, random);
  };

  const breakfasts = pool('breakfast');
  const meats = pool('meat');
  const vegs = pool('veg');
  const soups = pool('soup');
  const staples = pool('staple');

  return {
    breakfast: [breakfasts[0]],
    lunch: [meats[0], vegs[0], staples[0]],
    dinner: [meats[1 % meats.length], vegs[1 % vegs.length], soups[0], staples[1 % staples.length]]
  };
}

/** 汇总一天菜单的营养（每标准份），再乘以全家份数系数 */
function dayNutrition(menu, familyFactor) {
  const total = { kcal: 0, protein: 0, fat: 0, carbs: 0, calcium: 0, iron: 0 };
  ['breakfast', 'lunch', 'dinner'].forEach((meal) => {
    (menu[meal] || []).forEach((r) => {
      if (!r || !r.nutrition) return;
      Object.keys(total).forEach((k) => {
        total[k] += r.nutrition[k] || 0;
      });
    });
  });
  Object.keys(total).forEach((k) => {
    total[k] = Math.round(total[k] * familyFactor);
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

module.exports = { planDay, dayNutrition, menuToIds, menuFromIds };

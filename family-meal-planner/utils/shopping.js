/**
 * 购物清单模块
 *
 * 把一天菜单里的所有食材按全家份数系数放大、按品类聚合，
 * 生成可直接复制到盒马 / 奥乐齐搜索下单的购物清单文本。
 */

const { priceFor } = require('../data/prices');

const CATEGORY_ORDER = ['蔬菜水果', '肉禽蛋', '水产海鲜', '奶品豆制品', '米面粮油', '调味干货'];
const CATEGORY_ICONS = {
  '蔬菜水果': '🥬',
  '肉禽蛋': '🥩',
  '水产海鲜': '🦐',
  '奶品豆制品': '🥛',
  '米面粮油': '🍚',
  '调味干货': '🧂'
};

/** 数量取整：克/毫升取 10 的倍数，个/根/片/包向上取整 */
function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') {
    return Math.max(10, Math.round(amount / 10) * 10);
  }
  return Math.max(1, Math.ceil(amount));
}

/**
 * 聚合一天菜单的食材（午晚餐按份量加大倍率放大）
 * @returns {Array<{category, icon, items: Array<{name, amountText, pantry, checked}>}>}
 */
function buildList(menu, familyFactor, portionBoost) {
  const boost = portionBoost || 1;
  const map = {}; // name -> { name, amount, unit, category, pantry }

  ['breakfast', 'lunch', 'dinner'].forEach((meal) => {
    const mealFactor = meal === 'breakfast' ? familyFactor : familyFactor * boost;
    (menu[meal] || []).forEach((recipe) => {
      (recipe.ingredients || []).forEach((ing) => {
        const key = ing.name;
        if (!map[key]) {
          map[key] = {
            name: ing.name,
            amount: 0,
            unit: ing.unit,
            category: ing.category,
            pantry: !!ing.pantry
          };
        }
        map[key].amount += (ing.amount || 0) * mealFactor;
      });
    });
  });

  const groups = [];
  CATEGORY_ORDER.forEach((cat) => {
    const items = Object.keys(map)
      .map((k) => map[k])
      .filter((it) => it.category === cat)
      .map((it) => {
        const price = it.pantry ? 0 : Math.round(priceFor(it.name, it.amount) * 10) / 10;
        return {
          name: it.name,
          // 干净的搜索词：去掉括号说明，直接粘贴到盒马/奥乐齐搜索框
          searchName: it.name.replace(/（[^）]*）/g, ''),
          pantry: it.pantry,
          checked: false,
          price,
          priceText: price ? `约¥${price}` : '',
          amountText: it.unit === '适量' ? '适量（家中常备）' : `${roundAmount(it.amount, it.unit)}${it.unit}`
        };
      })
      .sort((a, b) => (a.pantry === b.pantry ? 0 : a.pantry ? 1 : -1));
    if (items.length) {
      groups.push({ category: cat, icon: CATEGORY_ICONS[cat] || '🛒', items });
    }
  });
  return groups;
}

/** 待购食材的预估总花费（元，不含已划掉与常备调味品） */
function totalCost(groups) {
  let sum = 0;
  groups.forEach((g) =>
    g.items.forEach((it) => {
      if (!it.pantry && !it.checked) sum += it.price || 0;
    })
  );
  return Math.round(sum);
}

/** 生成备忘/分享用的清单文本（含预估价，逐样购买请用条目上的"复制"按钮） */
function listToText(groups, dateLabel, memberCount) {
  const lines = [`🛒 ${dateLabel} 全家营养餐购物清单（${memberCount} 口人）`, ''];
  groups.forEach((g) => {
    const items = g.items.filter((it) => !it.pantry && !it.checked);
    if (!items.length) return;
    lines.push(`${g.icon} ${g.category}`);
    items.forEach((it) => lines.push(`· ${it.name} ${it.amountText}${it.priceText ? '（' + it.priceText + '）' : ''}`));
    lines.push('');
  });
  lines.push(`预估合计：约 ¥${totalCost(groups)}（盒马/奥乐齐参考价，以门店为准）`);
  lines.push('—— 由「全家营养餐」小程序生成');
  return lines.join('\n');
}

module.exports = { buildList, listToText, totalCost, CATEGORY_ORDER };

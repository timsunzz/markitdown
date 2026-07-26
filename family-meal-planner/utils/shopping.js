/**
 * 购物清单模块
 *
 * 把一天菜单里的所有食材按全家份数系数放大、按品类聚合，
 * 生成可直接复制到盒马 / 奥乐齐搜索下单的购物清单文本。
 */

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
 * 聚合一天菜单的食材
 * @returns {Array<{category, icon, items: Array<{name, amountText, pantry, checked}>}>}
 */
function buildList(menu, familyFactor) {
  const map = {}; // name -> { name, amount, unit, category, pantry }

  ['breakfast', 'lunch', 'dinner'].forEach((meal) => {
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
        map[key].amount += (ing.amount || 0) * familyFactor;
      });
    });
  });

  const groups = [];
  CATEGORY_ORDER.forEach((cat) => {
    const items = Object.keys(map)
      .map((k) => map[k])
      .filter((it) => it.category === cat)
      .map((it) => ({
        name: it.name,
        pantry: it.pantry,
        checked: false,
        amountText: it.unit === '适量' ? '适量（家中常备）' : `${roundAmount(it.amount, it.unit)}${it.unit}`
      }))
      .sort((a, b) => (a.pantry === b.pantry ? 0 : a.pantry ? 1 : -1));
    if (items.length) {
      groups.push({ category: cat, icon: CATEGORY_ICONS[cat] || '🛒', items });
    }
  });
  return groups;
}

/** 生成用于复制到剪贴板的清单文本（盒马 / 奥乐齐搜索友好） */
function listToText(groups, dateLabel, memberCount) {
  const lines = [`🛒 ${dateLabel} 全家营养餐购物清单（${memberCount} 口人）`, ''];
  groups.forEach((g) => {
    const items = g.items.filter((it) => !it.pantry && !it.checked);
    if (!items.length) return;
    lines.push(`${g.icon} ${g.category}`);
    items.forEach((it) => lines.push(`· ${it.name} ${it.amountText}`));
    lines.push('');
  });
  lines.push('—— 由「全家营养餐」小程序生成，在盒马/奥乐齐搜索名称即可下单');
  return lines.join('\n');
}

module.exports = { buildList, listToText, CATEGORY_ORDER };

const { byId } = require('../../data/recipes');
const nutrition = require('../../utils/nutrition');

function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') {
    return Math.max(5, Math.round(amount / 5) * 5);
  }
  return Math.max(1, Math.ceil(amount * 2) / 2); // 个/根/片允许半个
}

Page({
  data: {
    recipe: null,
    factor: 1,
    memberCount: 0,
    ingredientViews: [],
    familyNutrition: null
  },

  onLoad(options) {
    const recipe = byId(options.id);
    if (!recipe) {
      wx.showToast({ title: '菜谱不存在', icon: 'none' });
      wx.navigateBack();
      return;
    }

    const members = wx.getStorageSync('familyMembers') || [];
    const summary = nutrition.familySummary(members);
    const factor = summary.factor || 1;

    this.setData({
      recipe,
      factor: Math.round(factor * 10) / 10,
      memberCount: members.length,
      ingredientViews: recipe.ingredients.map((ing) => ({
        name: ing.name,
        note: ing.note || '',
        pantry: !!ing.pantry,
        amountText:
          ing.unit === '适量' ? '适量' : `${roundAmount(ing.amount * factor, ing.unit)}${ing.unit}`
      })),
      familyNutrition: {
        kcal: Math.round(recipe.nutrition.kcal * factor),
        protein: Math.round(recipe.nutrition.protein * factor),
        calcium: Math.round(recipe.nutrition.calcium * factor),
        iron: Math.round(recipe.nutrition.iron * 10 * factor) / 10
      }
    });

    wx.setNavigationBarTitle({ title: recipe.name });
  }
});

const { byId } = require('../../data/recipes');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');

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
    familyNutrition: null,
    dishCost: 0
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
      ingredientViews: recipe.ingredients.map((ing) => {
        const price = ing.pantry
          ? 0
          : Math.round(prices.priceFor(ing.name, ing.amount * factor) * 10) / 10;
        return {
          name: ing.name,
          note: ing.note || '',
          pantry: !!ing.pantry,
          priceText: price ? `约¥${price}` : '',
          amountText:
            ing.unit === '适量' ? '适量' : `${roundAmount(ing.amount * factor, ing.unit)}${ing.unit}`
        };
      }),
      dishCost: prices.dishCost(recipe, factor),
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

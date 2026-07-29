const { byId } = require('../../data/recipes');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');
const covers = require('../../data/covers');

function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') {
    return Math.max(5, Math.round(amount / 5) * 5);
  }
  return Math.max(1, Math.ceil(amount * 2) / 2); // 个/根/片允许半个
}

Page({
  onShareAppMessage() {
    const rec = this.data.recipe;
    if (!rec) return { title: '全家营养餐', path: '/pages/index/index' };
    return {
      title: rec.name + '的做法（食材已按人口换算）',
      path: '/pages/recipe/recipe?id=' + rec.id
    };
  },

  onShareTimeline() {
    const rec = this.data.recipe;
    return { title: rec ? rec.name + ' · 家常做法与营养' : '全家营养餐' };
  },

  data: {
    recipe: null,
    factor: 1,
    memberCount: 0,
    ingredientViews: [],
    familyNutrition: null,
    dishCost: 0,
    isFav: false
  },

  /** 收藏 / 取消收藏（存本地，无需登录） */
  onToggleFav() {
    const id = this.data.recipe.id;
    let ids = wx.getStorageSync('favorites') || [];
    const has = ids.indexOf(id) >= 0;
    ids = has ? ids.filter((x) => x !== id) : ids.concat(id);
    wx.setStorageSync('favorites', ids);
    this.setData({ isFav: !has });
    wx.showToast({ title: has ? '已取消收藏' : '已收藏，可在"我的家庭"里查看', icon: 'none' });
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
    // 小家庭模式下午晚餐每道菜份量加大（与今日菜单/购物清单保持一致）
    const current = wx.getStorageSync('currentMenu') || {};
    const boost = recipe.type === 'breakfast' ? 1 : current.boost || 1;
    const factor = (summary.factor || 1) * boost;

    this.setData({
      recipe,
      emoji: covers.emojiFor(recipe),
      isFav: (wx.getStorageSync('favorites') || []).indexOf(recipe.id) >= 0,
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

const { byId } = require('../../data/recipes');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');

Page({
  onShareAppMessage() {
    return {
      title: '我在卡卡家常菜谱收藏的家常菜，每道都有做法和营养',
      path: '/pages/index/index'
    };
  },

  data: {
    items: []
  },

  onShow() {
    this.load();
  },

  load() {
    const ids = wx.getStorageSync('favorites') || [];
    const members = wx.getStorageSync('familyMembers') || [];
    const factor = members.length ? nutrition.familySummary(members).factor : 1;
    const items = ids
      .map(byId)
      .filter(Boolean)
      .map((r) => {
        const cost = prices.dishCost(r, factor);
        return {
          id: r.id,
          name: r.name,
          type: r.type,
          badge: r.badge || '',
          firstChar: r.name.charAt(0),
          tags: (r.tags || []).slice(0, 3),
          kcal: r.nutrition.kcal,
          time: r.time,
          costText: cost ? `全家¥${cost}` : ''
        };
      });
    this.setData({ items });
  },

  onOpen(e) {
    wx.navigateTo({ url: `/pages/recipe/recipe?id=${e.currentTarget.dataset.id}` });
  },

  /** 从收藏夹移除 */
  onRemove(e) {
    const id = e.currentTarget.dataset.id;
    const ids = (wx.getStorageSync('favorites') || []).filter((x) => x !== id);
    wx.setStorageSync('favorites', ids);
    this.load();
    wx.showToast({ title: '已取消收藏', icon: 'none' });
  },

  onGoIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

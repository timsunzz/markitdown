const { RECIPES } = require('../../data/recipes');

Page({
  data: {
    kw: '',
    results: [],
    favs: {},
    hot: ['黄瓜', '牛肉', '鸡蛋', '豆腐', '凉拌', '快手', '汤', '儿童最爱']
  },

  onShow() {
    this.setData({ favs: this.favMap() });
  },

  favMap() {
    const m = {};
    (wx.getStorageSync('favorites') || []).forEach((id) => {
      m[id] = true;
    });
    return m;
  },

  onInput(e) {
    const kw = (e.detail.value || '').trim();
    this.setData({ kw });
    this.doSearch(kw);
  },

  onHotTap(e) {
    const kw = e.currentTarget.dataset.kw;
    this.setData({ kw });
    this.doSearch(kw);
  },

  /** 按菜名 / 食材 / 标签模糊匹配 */
  doSearch(kw) {
    if (!kw) {
      this.setData({ results: [] });
      return;
    }
    const results = RECIPES.filter(
      (r) =>
        r.name.indexOf(kw) >= 0 ||
        (r.tags || []).some((t) => t.indexOf(kw) >= 0) ||
        (r.ingredients || []).some((i) => !i.pantry && i.name.indexOf(kw) >= 0)
    )
      .slice(0, 60)
      .map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        badge: r.badge || '',
        firstChar: r.name.charAt(0),
        tags: (r.tags || []).slice(0, 3),
        kcal: r.nutrition.kcal,
        time: r.time
      }));
    this.setData({ results });
  },

  onOpen(e) {
    wx.navigateTo({ url: `/pages/recipe/recipe?id=${e.currentTarget.dataset.id}` });
  },

  /** 搜索结果里直接收藏 / 取消收藏 */
  onFav(e) {
    const id = e.currentTarget.dataset.id;
    let ids = wx.getStorageSync('favorites') || [];
    const has = ids.indexOf(id) >= 0;
    ids = has ? ids.filter((x) => x !== id) : ids.concat(id);
    wx.setStorageSync('favorites', ids);
    this.setData({ [`favs.${id}`]: !has });
    wx.showToast({ title: has ? '已取消收藏' : '已收藏', icon: 'none' });
  }
});

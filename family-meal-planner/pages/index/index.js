const planner = require('../../utils/planner');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');
const covers = require('../../data/covers');

const MEAL_LABELS = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' };
const MEAL_EMOJIS = { breakfast: '☀️', lunch: '🍱', dinner: '🌙' };

function todayStr() {
  const d = new Date();
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function dateLabel(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const week = ['日', '一', '二', '三', '四', '五', '六'][new Date(y, m - 1, d).getDay()];
  return `${m}月${d}日 星期${week}`;
}

Page({
  onShareAppMessage() {
    return {
      title: '每天吃什么不用愁：营养菜单自动配好，买菜清单一键复制',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return { title: '全家营养餐：按家里人口自动配每日营养菜单' };
  },

  data: {
    dateLabel: '',
    noMembers: false,
    noSpicyAll: false,
    noPorkAll: false,
    members: [],
    summary: null,
    menu: null,
    mealList: [],
    totals: null,
    percents: null,
    dayCost: 0,
    toddlerTip: false,
    isDefaultFamily: false
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const members = wx.getStorageSync('familyMembers') || [];
    if (!members.length) {
      wx.removeStorageSync('currentMenu');
      this.setData({ noMembers: true, dateLabel: dateLabel(todayStr()) });
      return;
    }
    const summary = nutrition.familySummary(members);
    const noSpicyAll = !!wx.getStorageSync('noSpicyAll');
    const noPorkAll = !!wx.getStorageSync('noPorkAll');
    const prefs = {
      noSpicy: noSpicyAll || nutrition.hasYoungChild(members),
      noPork: noPorkAll
    };
    const date = todayStr();

    // 读取/初始化当日"换一换"计数
    const key = `menuShuffles:${date}`;
    let shuffles = wx.getStorageSync(key);
    if (!shuffles) {
      shuffles = { breakfast: 0, lunch: 0, dinner: 0 };
      wx.setStorageSync(key, shuffles);
    }

    const menu = this.buildMenu(date, shuffles, prefs);
    wx.setStorageSync('currentMenu', {
      date,
      ids: planner.menuToIds(menu),
      factor: summary.factor,
      memberCount: members.length
    });

    const totals = planner.dayNutrition(menu, summary.factor);
    const pct = (v, t) => Math.min(100, Math.round((v / t) * 100));

    this.setData({
      noMembers: false,
      noSpicyAll,
      noPorkAll,
      dateLabel: dateLabel(date),
      members,
      summary,
      menu,
      mealList: ['breakfast', 'lunch', 'dinner'].map((k) => {
        let mealCost = 0;
        const dishes = menu[k].map((d) => {
          const cost = prices.dishCost(d, summary.factor);
          mealCost += cost;
          return {
            id: d.id,
            name: d.name,
            type: d.type,
            emoji: covers.emojiFor(d),
            image: d.image || '',
            tags: d.tags,
            time: d.time,
            nutrition: d.nutrition,
            costText: cost ? `¥${cost}` : ''
          };
        });
        return {
          key: k,
          label: MEAL_LABELS[k],
          emoji: MEAL_EMOJIS[k],
          dishes,
          costText: `约 ¥${Math.round(mealCost)}`
        };
      }),
      dayCost: prices.dayCost(menu, summary.factor),
      totals,
      percents: {
        kcal: pct(totals.kcal, summary.kcal),
        protein: pct(totals.protein, summary.protein),
        calcium: pct(totals.calcium, summary.calcium),
        iron: pct(totals.iron, summary.iron)
      },
      toddlerTip: nutrition.hasToddler(members),
      isDefaultFamily: !!wx.getStorageSync('familyIsDefault')
    });
  },

  /** 按三餐各自的换一换次数组装菜单（引擎会保证整天菜品与主料不重复） */
  buildMenu(date, shuffles, prefs) {
    return planner.planDay(date, shuffles, prefs);
  },

  onShuffleMeal(e) {
    const meal = e.currentTarget.dataset.meal;
    const date = todayStr();
    const key = `menuShuffles:${date}`;
    const shuffles = wx.getStorageSync(key) || { breakfast: 0, lunch: 0, dinner: 0 };
    shuffles[meal] += 1;
    wx.setStorageSync(key, shuffles);
    this.refresh();
    wx.vibrateShort({ type: 'light' });
  },

  onOpenRecipe(e) {
    wx.navigateTo({ url: `/pages/recipe/recipe?id=${e.currentTarget.dataset.id}` });
  },

  onGoShopping() {
    wx.switchTab({ url: '/pages/shopping/shopping' });
  },

  onGoFamily() {
    wx.switchTab({ url: '/pages/family/family' });
  }
});

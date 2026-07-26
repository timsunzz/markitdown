const planner = require('../../utils/planner');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');

const MEAL_LABELS = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' };

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
  data: {
    dateLabel: '',
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
    const summary = nutrition.familySummary(members);
    const noSpicy = nutrition.hasYoungChild(members);
    const date = todayStr();

    // 读取/初始化当日"换一换"计数
    const key = `menuShuffles:${date}`;
    let shuffles = wx.getStorageSync(key);
    if (!shuffles) {
      shuffles = { breakfast: 0, lunch: 0, dinner: 0 };
      wx.setStorageSync(key, shuffles);
    }

    const menu = this.buildMenu(date, shuffles, noSpicy);
    wx.setStorageSync('currentMenu', {
      date,
      ids: planner.menuToIds(menu),
      factor: summary.factor,
      memberCount: members.length
    });

    const totals = planner.dayNutrition(menu, summary.factor);
    const pct = (v, t) => Math.min(100, Math.round((v / t) * 100));

    this.setData({
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
            tags: d.tags,
            time: d.time,
            nutrition: d.nutrition,
            costText: cost ? `¥${cost}` : ''
          };
        });
        return {
          key: k,
          label: MEAL_LABELS[k],
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

  /** 按三餐各自的换一换次数组装菜单，并避免同一道菜一天出现两次 */
  buildMenu(date, shuffles, noSpicy) {
    const breakfast = planner.planDay(date, shuffles.breakfast, noSpicy).breakfast;
    const lunch = planner.planDay(date, shuffles.lunch, noSpicy).lunch;

    let dinner = null;
    const lunchIds = lunch.map((r) => r.id);
    for (let i = 0; i < 6; i++) {
      dinner = planner.planDay(date, shuffles.dinner + i * 101, noSpicy).dinner;
      const clash = dinner.some((r) => r.type !== 'staple' && lunchIds.indexOf(r.id) >= 0);
      if (!clash) break;
    }
    return { breakfast, lunch, dinner };
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

const planner = require('../../utils/planner');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');
const { RECIPES } = require('../../data/recipes');

const MEAL_LABELS = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' };

function todayStr() {
  const d = new Date();
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function dateParts(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const week = ['日', '一', '二', '三', '四', '五', '六'][new Date(y, m - 1, d).getDay()];
  return { day: `${m}月${d}日`, week: `星期${week}` };
}

Page({
  onShareAppMessage() {
    return {
      title: '每天吃什么不用愁：营养菜单自动配好，买菜清单一键复制',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return { title: '卡卡家常菜谱：按家里人口自动配每日营养菜单' };
  },

  data: {
    mastDay: '',
    mastWeek: '',
    recipeCount: RECIPES.length,
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
      const dp0 = dateParts(todayStr());
      this.setData({ noMembers: true, mastDay: dp0.day, mastWeek: dp0.week });
      return;
    }
    const summary = nutrition.familySummary(members);
    const noSpicyAll = !!wx.getStorageSync('noSpicyAll');
    const noPorkAll = !!wx.getStorageSync('noPorkAll');
    const budgetOn = !!wx.getStorageSync('budgetOn');
    const budgetAmount = Number(wx.getStorageSync('budgetAmount')) || 0;
    const kcalOn = !!wx.getStorageSync('kcalOn');
    const kcalLimit = kcalOn ? Math.round(summary.kcal * 0.85) : 0;
    const structure = planner.mealPlanFor(summary.factor);
    const prefs = {
      noSpicy: noSpicyAll || nutrition.hasYoungChild(members),
      noPork: noPorkAll,
      factor: summary.factor,
      kcalLimit: kcalLimit || undefined,
      budget: budgetOn && budgetAmount > 0 ? budgetAmount : undefined
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
      boost: structure.boost,
      memberCount: members.length
    });

    const totals = planner.dayNutrition(menu, summary.factor, structure.boost);
    const pct = (v, t) => Math.min(100, Math.round((v / t) * 100));
    const cost = prices.dayCost(menu, summary.factor, structure.boost);
    // 热量等营养数值一律按人均展示（总数对用户没有直观意义）
    const per = (v) => Math.round(v / (summary.count || 1));
    const perTenth = (v) => Math.round((v / (summary.count || 1)) * 10) / 10;

    // 预算与热量控制的状态提示
    let budgetTip = '';
    if (prefs.budget) {
      budgetTip =
        cost <= prefs.budget
          ? `今日预算 ¥${prefs.budget}：当前菜单约 ¥${cost}，在预算内`
          : `今日预算 ¥${prefs.budget}：已自动优选便宜搭配，为保住营养底线（晚餐大荤等）仍需约 ¥${cost}。可点"换一换"再调，或适当上调预算`;
    }
    const kcalTip = kcalLimit
      ? `热量控制中：今日人均约 ${per(totals.kcal)} 千卡，目标不超过 ${per(kcalLimit)} 千卡（推荐值的 85%）`
      : '';

    const dp = dateParts(date);
    this.setData({
      noMembers: false,
      noSpicyAll,
      noPorkAll,
      mastDay: dp.day,
      mastWeek: dp.week,
      members,
      summary,
      menu,
      structureLabel: structure.label,
      mealList: ['breakfast', 'lunch', 'dinner'].map((k) => {
        const mealFactor = k === 'breakfast' ? summary.factor : summary.factor * structure.boost;
        let mealCost = 0;
        const dishes = menu[k].map((d) => {
          const cost = prices.dishCost(d, mealFactor);
          mealCost += cost;
          // 早餐把蛋白量亮出来（早餐吃够蛋白是营养均衡的关键，也让人一眼看到）
          const tags =
            k === 'breakfast'
              ? [`蛋白 ${d.nutrition.protein} 克`].concat((d.tags || []).slice(0, 2))
              : (d.tags || []).slice(0, 3);
          return {
            id: d.id,
            name: d.name,
            type: d.type,
            firstChar: d.name.charAt(0),
            tags,
            time: d.time,
            nutrition: d.nutrition,
            costText: cost ? `¥${cost}` : ''
          };
        });
        return {
          key: k,
          label:
            MEAL_LABELS[k] +
            (dishes.length === 1 && menu[k][0] && menu[k][0].solo ? ' · 一锅端' : ''),
          dishes,
          costText: `约 ¥${Math.round(mealCost)}`
        };
      }),
      dayCost: cost,
      budgetTip,
      kcalTip,
      totals,
      kcalPer: per(summary.kcal),
      totalsPer: {
        kcal: per(totals.kcal),
        protein: per(totals.protein),
        calcium: per(totals.calcium),
        iron: perTenth(totals.iron)
      },
      targetPer: {
        kcal: per(summary.kcal),
        protein: per(summary.protein),
        calcium: per(summary.calcium),
        iron: perTenth(summary.iron)
      },
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
  },

  onGoSearch() {
    wx.navigateTo({ url: '/pages/search/search' });
  }
});

<template>
  <view class="page">
    <!-- 刊头：宋体大字日期，像一册菜谱的扉页 -->
    <view class="masthead">
      <view class="mast-date serif">{{ mastDay }}</view>
      <view class="mast-sub">
        <text>{{ mastWeek }}</text>
        <!-- 用 summary 兜底：WXML 里 {{summary.count}} 遇到 null 会渲染成空，
             Vue 模板则会直接抛错，所以这里判断的是 summary 本身而不是 noMembers -->
        <text v-if="summary" class="mast-family" @click="onGoFamily">
          {{ summary.count }} 口人 · 人均约 {{ kcalPer }} 千卡
        </text>
      </view>
      <view class="mast-search" @click="onGoSearch">
        <view class="search-icon"></view>
        <text class="search-hint">搜菜名、搜食材 · {{ recipeCount }} 道家常菜</text>
      </view>
    </view>

    <!-- 没有家庭成员时的引导 -->
    <view class="card empty-family" v-if="noMembers">
      <view class="ef-title serif">先介绍一下你的家</view>
      <view class="muted ef-note">按实际情况添加成员——一位老人、两位老人、有孩子……都可以。菜单份量与营养目标会完全按真实成员计算。</view>
      <button class="btn-primary ef-btn" @click="onGoFamily">设置家庭成员</button>
    </view>

    <template v-if="!noMembers">
      <view class="notice" v-if="isDefaultFamily" @click="onGoFamily">
        当前按"2 位成人"的默认家庭生成菜单。点这里设置真实的家庭成员，份量和营养会自动调整。
      </view>

      <view class="notice" v-if="toddlerTip">
        家有 3 岁以下幼儿：给宝宝的部分请单独少盐、食材切小块，整虾整颗坚果等谨防呛噎。
      </view>

      <view class="notice" v-if="noSpicyAll">
        已开启全家免辣，今天的菜单不含任何辣菜。可在"我的家庭"关闭。
      </view>

      <view class="notice" v-if="noPorkAll">
        已开启不吃猪肉，今天的菜单不含任何猪肉及含酒精食材的菜。可在"我的家庭"关闭。
      </view>

      <view class="notice" v-if="structureLabel">
        {{ structureLabel }}，购物清单与热量已同步换算。
      </view>

      <view class="notice" v-if="kcalTip">{{ kcalTip }}</view>
      <view class="notice" v-if="budgetTip">{{ budgetTip }}</view>

      <!-- 三餐 -->
      <view class="card" v-for="meal in mealList" :key="meal.key">
        <view class="meal-head">
          <view class="meal-title">
            <text class="meal-label">{{ meal.label }}</text>
            <text class="meal-cost">{{ meal.costText }}</text>
          </view>
          <view class="shuffle" @click.stop="onShuffleMeal(meal.key)">换一换</view>
        </view>
        <view
          class="dish"
          v-for="dish in meal.dishes"
          :key="dish.id"
          @click="onOpenRecipe(dish.id)"
        >
          <view class="seal" :class="dish.type">{{ dish.firstChar }}</view>
          <view class="dish-main">
            <view class="dish-name">{{ dish.name }}</view>
            <view class="dish-tags">
              <text class="tag" v-for="t in dish.tags" :key="t">{{ t }}</text>
            </view>
          </view>
          <view class="dish-right">
            <view class="dish-kcal">
              人均 {{ dish.nutrition.kcal }} 千卡<text v-if="dish.costText"> · {{ dish.costText }}</text>
            </view>
            <view class="muted">{{ dish.time }} 分钟</view>
          </view>
        </view>
      </view>

      <!-- 营养 -->
      <view class="card" v-if="totals">
        <view class="meal-title">
          <text class="meal-label">今日营养 · 人均</text>
          <text class="meal-cost">买菜约 ¥{{ dayCost }}</text>
        </view>
        <view class="nutrient">
          <view class="n-label">能量</view>
          <view class="bar"><view class="bar-fill" :style="'width: ' + percents.kcal + '%'"></view></view>
          <view class="n-val">{{ totalsPer.kcal }}/{{ targetPer.kcal }} 千卡</view>
        </view>
        <view class="nutrient">
          <view class="n-label">蛋白质</view>
          <view class="bar"><view class="bar-fill" :style="'width: ' + percents.protein + '%'"></view></view>
          <view class="n-val">{{ totalsPer.protein }}/{{ targetPer.protein }} 克</view>
        </view>
        <view class="nutrient">
          <view class="n-label">钙</view>
          <view class="bar"><view class="bar-fill" :style="'width: ' + percents.calcium + '%'"></view></view>
          <view class="n-val">{{ totalsPer.calcium }}/{{ targetPer.calcium }} 毫克</view>
        </view>
        <view class="nutrient">
          <view class="n-label">铁</view>
          <view class="bar"><view class="bar-fill" :style="'width: ' + percents.iron + '%'"></view></view>
          <view class="n-val">{{ totalsPer.iron }}/{{ targetPer.iron }} 毫克</view>
        </view>
        <view class="muted nut-note">
          数值为全家平均到每人的量，目标按《中国居民膳食营养素参考摄入量》估算（孩子与老人的个人目标见"我的家庭"）；水果、奶类加餐不在此列，缺口可用它们补足。价格为盒马、奥乐齐参考价。
        </view>
      </view>

      <view class="bottom-space"></view>
      <view class="bottom-bar">
        <button class="btn-primary buy-btn" @click="onGoShopping">生成今日购物清单</button>
        <!-- #ifdef MP-WEIXIN -->
        <button class="btn-ghost share-btn" open-type="share">分享</button>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN -->
        <button class="btn-ghost share-btn" @click="onShare">分享</button>
        <!-- #endif -->
      </view>
    </template>
  </view>
</template>

<script>
import * as planner from '../../utils/planner.js';
import * as nutrition from '../../utils/nutrition.js';
import * as prices from '../../data/prices.js';
import { RECIPES } from '../../data/recipes.js';
import { shareBySystem, SHARE_TITLE } from '../../utils/share.js';

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

export default {
  data() {
    return {
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
      isDefaultFamily: false,
      structureLabel: '',
      budgetTip: '',
      kcalTip: '',
      kcalPer: 0,
      totalsPer: null,
      targetPer: null
    };
  },

  // #ifdef MP-WEIXIN
  onShareAppMessage() {
    return {
      title: '每天吃什么不用愁：营养菜单自动配好，买菜清单一键复制',
      path: '/pages/index/index'
    };
  },

  onShareTimeline() {
    return { title: '卡卡家常菜谱：按家里人口自动配每日营养菜单' };
  },
  // #endif

  onShow() {
    this.refresh();
  },

  methods: {
    refresh() {
      const members = uni.getStorageSync('familyMembers') || [];
      if (!members.length) {
        uni.removeStorageSync('currentMenu');
        const dp0 = dateParts(todayStr());
        this.noMembers = true;
        this.mastDay = dp0.day;
        this.mastWeek = dp0.week;
        return;
      }
      const summary = nutrition.familySummary(members);
      const noSpicyAll = !!uni.getStorageSync('noSpicyAll');
      const noPorkAll = !!uni.getStorageSync('noPorkAll');
      const budgetOn = !!uni.getStorageSync('budgetOn');
      const budgetAmount = Number(uni.getStorageSync('budgetAmount')) || 0;
      const kcalOn = !!uni.getStorageSync('kcalOn');
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
      let shuffles = uni.getStorageSync(key);
      if (!shuffles) {
        shuffles = { breakfast: 0, lunch: 0, dinner: 0 };
        uni.setStorageSync(key, shuffles);
      }

      const menu = this.buildMenu(date, shuffles, prefs);
      uni.setStorageSync('currentMenu', {
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
      this.noMembers = false;
      this.noSpicyAll = noSpicyAll;
      this.noPorkAll = noPorkAll;
      this.mastDay = dp.day;
      this.mastWeek = dp.week;
      this.members = members;
      this.summary = summary;
      this.menu = menu;
      this.structureLabel = structure.label;
      this.mealList = ['breakfast', 'lunch', 'dinner'].map((k) => {
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
      });
      this.dayCost = cost;
      this.budgetTip = budgetTip;
      this.kcalTip = kcalTip;
      this.totals = totals;
      this.kcalPer = per(summary.kcal);
      this.totalsPer = {
        kcal: per(totals.kcal),
        protein: per(totals.protein),
        calcium: per(totals.calcium),
        iron: perTenth(totals.iron)
      };
      this.targetPer = {
        kcal: per(summary.kcal),
        protein: per(summary.protein),
        calcium: per(summary.calcium),
        iron: perTenth(summary.iron)
      };
      this.percents = {
        kcal: pct(totals.kcal, summary.kcal),
        protein: pct(totals.protein, summary.protein),
        calcium: pct(totals.calcium, summary.calcium),
        iron: pct(totals.iron, summary.iron)
      };
      this.toddlerTip = nutrition.hasToddler(members);
      this.isDefaultFamily = !!uni.getStorageSync('familyIsDefault');
    },

    /** 按三餐各自的换一换次数组装菜单（引擎会保证整天菜品与主料不重复） */
    buildMenu(date, shuffles, prefs) {
      return planner.planDay(date, shuffles, prefs);
    },

    onShuffleMeal(meal) {
      const date = todayStr();
      const key = `menuShuffles:${date}`;
      const shuffles = uni.getStorageSync(key) || { breakfast: 0, lunch: 0, dinner: 0 };
      shuffles[meal] += 1;
      uni.setStorageSync(key, shuffles);
      this.refresh();
      uni.vibrateShort({ type: 'light', fail: () => {} });
    },

    onOpenRecipe(id) {
      uni.navigateTo({ url: `/pages/recipe/recipe?id=${id}` });
    },

    onGoShopping() {
      uni.switchTab({ url: '/pages/shopping/shopping' });
    },

    onGoFamily() {
      uni.switchTab({ url: '/pages/family/family' });
    },

    onGoSearch() {
      uni.navigateTo({ url: '/pages/search/search' });
    },

    /** App / H5 端的分享（小程序走原生 open-type="share"） */
    onShare() {
      shareBySystem(SHARE_TITLE);
    }
  }
};
</script>

<style scoped>
.masthead {
  padding: 40rpx 32rpx 24rpx;
  border-bottom: none;
}

.mast-date {
  font-size: 68rpx;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1.15;
}

.mast-sub {
  margin-top: 10rpx;
  font-size: 25rpx;
  color: #9c9084;
  display: flex;
  align-items: baseline;
  gap: 22rpx;
}

.mast-family {
  color: #f0592b;
}

/* 搜索条：白底圆条 + 手绘放大镜，醒目但不喧宾夺主 */
.mast-search {
  margin-top: 24rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #fffcf8;
  border: 2rpx solid #f0e4d3;
  border-radius: 999rpx;
  padding: 18rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(160, 110, 60, 0.08);
}

.search-icon {
  width: 26rpx;
  height: 26rpx;
  border: 4rpx solid #f0592b;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 4rpx;
  height: 14rpx;
  background: #f0592b;
  border-radius: 4rpx;
  right: -8rpx;
  bottom: -10rpx;
  transform: rotate(-45deg);
}

.search-hint {
  color: #9c9084;
  font-size: 28rpx;
  letter-spacing: 0;
}

.empty-family {
  padding: 70rpx 32rpx;
  border-bottom: none;
}

.ef-title {
  font-size: 44rpx;
  font-weight: 600;
  margin-bottom: 18rpx;
}

.ef-note {
  line-height: 1.8;
}

.ef-btn {
  margin-top: 40rpx;
  width: 100%;
}

/* 三餐 */
.meal-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.meal-title {
  display: flex;
  align-items: baseline;
  gap: 18rpx;
}

.meal-label {
  font-size: 31rpx;
  font-weight: 700;
  letter-spacing: 0;
}

.meal-cost {
  font-size: 23rpx;
  color: #9c9084;
  font-variant-numeric: tabular-nums;
}

.shuffle {
  font-size: 25rpx;
  color: #f0592b;
  letter-spacing: 2rpx;
}

.dish {
  display: flex;
  align-items: center;
  padding: 22rpx 0;
}

.dish + .dish {
  border-top: 2rpx solid #f1eae0;
}

.dish-main {
  flex: 1;
  min-width: 0;
  margin-left: 22rpx;
}

.dish-name {
  font-size: 31rpx;
  font-weight: 500;
  margin-bottom: 6rpx;
}

.dish-tags {
  line-height: 1.4;
}

.dish-right {
  text-align: right;
  flex-shrink: 0;
  margin-left: 16rpx;
}

.dish-kcal {
  font-size: 23rpx;
  color: #b0642c;
  margin-bottom: 4rpx;
  font-variant-numeric: tabular-nums;
}

/* 营养 */
.nutrient {
  display: flex;
  align-items: center;
  margin: 22rpx 0;
}

.n-label {
  width: 104rpx;
  font-size: 25rpx;
  letter-spacing: 2rpx;
}

.bar {
  flex: 1;
  height: 8rpx;
  background: #ece4d8;
  border-radius: 999rpx;
  overflow: hidden;
  margin-right: 18rpx;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f2a33c 0%, #f0592b 100%);
  border-radius: 999rpx;
}

.n-val {
  width: 220rpx;
  text-align: right;
  font-size: 22rpx;
  color: #9c9084;
  font-variant-numeric: tabular-nums;
}

.nut-note {
  margin-top: 18rpx;
  line-height: 1.7;
}

.bottom-space {
  height: 140rpx;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 16rpx;
  padding: 16rpx 28rpx calc(16rpx + env(safe-area-inset-bottom));
  background: rgba(247, 241, 233, 0.95);
  border-top: 1px solid #ece4d8;
}

.buy-btn {
  flex: 2.4;
}

.share-btn {
  flex: 1;
}
</style>

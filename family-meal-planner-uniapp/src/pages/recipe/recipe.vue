<template>
  <view class="page" v-if="recipe">
    <!-- 题头：字印 + 宋体菜名 -->
    <view class="r-hero">
      <view class="seal r-seal" :class="recipe.type">{{ firstChar }}</view>
      <view class="r-head">
        <view class="r-name serif">
          {{ recipe.name }}
          <text class="badge-heir" v-if="recipe.badge"><text class="badge-heart">♥</text> {{ recipe.badge }}</text>
        </view>
        <view class="muted r-info">约 {{ recipe.time }} 分钟 · 难度{{ recipe.difficulty }} · 人均 {{ recipe.nutrition.kcal }} 千卡</view>
        <view class="r-tags">
          <text class="tag" v-for="t in recipe.tags" :key="t">{{ t }}</text>
        </view>
      </view>
      <view class="fav-chip" :class="{ on: isFav }" @click="onToggleFav">{{ isFav ? '已收藏' : '收藏' }}</view>
    </view>

    <view class="card">
      <view class="meal-title">
        <text class="sec-label">食材</text>
        <text class="muted">已按 {{ memberCount }} 口人 · {{ factor }} 份换算</text>
      </view>
      <view class="ing" v-for="ing in ingredientViews" :key="ing.name">
        <view class="ing-name">
          {{ ing.name }}<text class="muted" v-if="ing.note">（{{ ing.note }}）</text><text class="muted" v-if="ing.pantry">（常备）</text>
        </view>
        <view class="ing-leader"></view>
        <view class="ing-right">
          <text class="ing-amount">{{ ing.amountText }}</text>
          <text class="ing-price" v-if="ing.priceText"> {{ ing.priceText }}</text>
        </view>
      </view>
      <view class="dish-cost-line">
        <text class="muted">本菜食材预估（盒马、奥乐齐参考价）</text>
        <text class="dish-cost-num">约 ¥{{ dishCost }}</text>
      </view>
    </view>

    <view class="card">
      <view class="sec-label">做法</view>
      <view class="step" v-for="(s, i) in recipe.steps" :key="i">
        <view class="step-no serif">{{ i + 1 }}</view>
        <view class="step-text">{{ s }}</view>
      </view>
    </view>

    <view class="card">
      <view class="sec-label">营养 · 全家合计</view>
      <view class="nut-grid">
        <view class="nut-item"><view class="nut-num serif">{{ familyNutrition.kcal }}</view><view class="muted">千卡</view></view>
        <view class="nut-item"><view class="nut-num serif">{{ familyNutrition.protein }}</view><view class="muted">蛋白质 克</view></view>
        <view class="nut-item"><view class="nut-num serif">{{ familyNutrition.calcium }}</view><view class="muted">钙 毫克</view></view>
        <view class="nut-item"><view class="nut-num serif">{{ familyNutrition.iron }}</view><view class="muted">铁 毫克</view></view>
      </view>
      <view class="tip">{{ recipe.tip }}</view>
    </view>

    <view class="bottom-space"></view>
    <view class="bottom-bar">
      <button class="btn-primary bar-btn" @click="onMakeImage">生成菜谱图片</button>
      <!-- #ifdef MP-WEIXIN -->
      <button class="btn-ghost bar-btn share-s" open-type="share">分享</button>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <button class="btn-ghost bar-btn share-s" @click="onShare">分享</button>
      <!-- #endif -->
    </view>

    <!-- 离屏画布：绘制菜谱图片 -->
    <!-- #ifdef MP-WEIXIN -->
    <canvas
      type="2d"
      id="recipeCanvas"
      :style="'position: fixed; left: 2000px; top: 0; width: 640px; height: ' + canvasH + 'px;'"
    ></canvas>
    <!-- #endif -->
    <!-- #ifndef MP-WEIXIN -->
    <canvas
      canvas-id="recipeCanvas"
      id="recipeCanvas"
      :style="'position: fixed; left: 2000px; top: 0; width: 640px; height: ' + canvasH + 'px;'"
    ></canvas>
    <!-- #endif -->
  </view>
</template>

<script>
import { byId } from '../../data/recipes.js';
import * as nutrition from '../../utils/nutrition.js';
import * as prices from '../../data/prices.js';
import { drawWatermark } from '../../utils/watermark.js';
import { prepareCanvas, previewGeneratedImage, saveHintText } from '../../utils/canvas.js';
import { shareBySystem } from '../../utils/share.js';

function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') {
    return Math.max(5, Math.round(amount / 5) * 5);
  }
  return Math.max(1, Math.ceil(amount * 2) / 2); // 个/根/片允许半个
}

/** 按固定字数折行（高度预估与绘制使用同一规则，保证不错位） */
function chunkText(str, size) {
  const out = [];
  const s = String(str || '');
  for (let i = 0; i < s.length; i += size) out.push(s.substr(i, size));
  return out.length ? out : [''];
}

export default {
  data() {
    return {
      recipe: null,
      firstChar: '',
      factor: 1,
      memberCount: 0,
      ingredientViews: [],
      familyNutrition: null,
      dishCost: 0,
      isFav: false,
      canvasH: 900
    };
  },

  // #ifdef MP-WEIXIN
  onShareAppMessage() {
    const rec = this.recipe;
    if (!rec) return { title: '卡卡家常菜谱', path: '/pages/index/index' };
    return {
      title: rec.name + '的做法（食材已按人口换算）',
      path: '/pages/recipe/recipe?id=' + rec.id
    };
  },

  onShareTimeline() {
    const rec = this.recipe;
    return { title: rec ? rec.name + ' · 家常做法与营养' : '卡卡家常菜谱' };
  },
  // #endif

  onLoad(options) {
    const recipe = byId(options.id);
    if (!recipe) {
      uni.showToast({ title: '菜谱不存在', icon: 'none' });
      uni.navigateBack();
      return;
    }

    const members = uni.getStorageSync('familyMembers') || [];
    const summary = nutrition.familySummary(members);
    // 小家庭模式下午晚餐每道菜份量加大（与今日菜单/购物清单保持一致）
    const current = uni.getStorageSync('currentMenu') || {};
    const boost = recipe.type === 'breakfast' ? 1 : current.boost || 1;
    const factor = (summary.factor || 1) * boost;

    this.recipe = recipe;
    this.firstChar = recipe.name.charAt(0);
    this.isFav = (uni.getStorageSync('favorites') || []).indexOf(recipe.id) >= 0;
    this.factor = Math.round(factor * 10) / 10;
    this.memberCount = members.length;
    this.ingredientViews = recipe.ingredients.map((ing) => {
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
    });
    this.dishCost = prices.dishCost(recipe, factor);
    this.familyNutrition = {
      kcal: Math.round(recipe.nutrition.kcal * factor),
      protein: Math.round(recipe.nutrition.protein * factor),
      calcium: Math.round(recipe.nutrition.calcium * factor),
      iron: Math.round(recipe.nutrition.iron * 10 * factor) / 10
    };

    uni.setNavigationBarTitle({ title: recipe.name });
  },

  methods: {
    /**
     * 生成菜谱图片：菜名 + 按全家换算的食材 + 做法 + 营养 + 小贴士，
     * 画成一张竖版长图，全屏预览后长按可保存相册或转发。
     */
    async onMakeImage() {
      const r = this.recipe;
      if (!r) return;
      const W = 640;
      const ings = this.ingredientViews;
      const nameLines = chunkText(r.name, 16);
      const stepLines = r.steps.map((s, i) => chunkText(`${i + 1}. ${s}`, 21));
      const tipLines = chunkText('小贴士：' + r.tip, 24);

      // 高度预估（与下方绘制使用相同的行高常数）
      let H = 60; // 顶部
      H += nameLines.length * 46 + 8; // 标题
      H += 36 + 20; // meta 行 + 间距
      H += 52 + ings.length * 40 + 20; // 食材区
      H += 52 + stepLines.reduce((n, ls) => n + ls.length * 34 + 12, 0) + 8; // 做法区
      H += 48; // 营养行
      H += tipLines.length * 32 + 26; // 小贴士
      H += 100; // 品牌水印页脚

      uni.showLoading({ title: '正在生成…' });
      this.canvasH = H;
      await this.$nextTick();

      try {
        const { ctx, toTempFilePath } = await prepareCanvas({
          id: 'recipeCanvas',
          width: W,
          height: H,
          component: this
        });

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#f0592b';
        ctx.fillRect(0, 0, W, 10);

        let y = 60;
        // 标题
        ctx.fillStyle = '#33281f';
        ctx.font = 'bold 34px sans-serif';
        ctx.textAlign = 'left';
        nameLines.forEach((ln) => {
          ctx.fillText(ln, 40, y);
          y += 46;
        });
        y += 8;
        // meta
        ctx.fillStyle = '#9c9084';
        ctx.font = '22px sans-serif';
        ctx.fillText(
          `约 ${r.time} 分钟 · 难度${r.difficulty} · 人均 ${r.nutrition.kcal} kcal · 已按 ${this.memberCount} 口人换算`,
          40,
          y
        );
        y += 36 + 20;

        const section = (title) => {
          ctx.fillStyle = '#f0592b';
          ctx.fillRect(40, y - 20, 6, 24);
          ctx.font = 'bold 26px sans-serif';
          ctx.fillText(title, 58, y);
          y += 52 - 20;
        };

        // 食材
        section('食材');
        ings.forEach((ing) => {
          ctx.fillStyle = '#33281f';
          ctx.font = '24px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(ing.name + (ing.pantry ? '（常备）' : ''), 44, y);
          ctx.fillStyle = '#f0592b';
          ctx.textAlign = 'right';
          ctx.fillText(ing.amountText, W - 40, y);
          ctx.textAlign = 'left';
          y += 40;
        });
        y += 20;

        // 做法
        section('做法');
        ctx.fillStyle = '#33281f';
        ctx.font = '24px sans-serif';
        stepLines.forEach((ls) => {
          ls.forEach((ln, i) => {
            ctx.fillText(ln, i === 0 ? 44 : 74, y);
            y += 34;
          });
          y += 12;
        });
        y += 8;

        // 营养（全家合计）
        const fn = this.familyNutrition;
        ctx.fillStyle = '#f0592b';
        ctx.font = '22px sans-serif';
        ctx.fillText(
          `全家合计：能量 ${fn.kcal} kcal · 蛋白质 ${fn.protein}g · 钙 ${fn.calcium}mg · 铁 ${fn.iron}mg`,
          40,
          y
        );
        y += 48;

        // 小贴士
        ctx.fillStyle = '#7d7168';
        ctx.font = '22px sans-serif';
        tipLines.forEach((ln) => {
          ctx.fillText(ln, 40, y);
          y += 32;
        });

        // 品牌水印
        drawWatermark(ctx, W, H - 85);

        const tempFilePath = await toTempFilePath();
        uni.hideLoading();
        previewGeneratedImage(tempFilePath);
        uni.showToast({ title: saveHintText(), icon: 'none', duration: 2500 });
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: '生成失败，请重试', icon: 'none' });
      }
    },

    /** 收藏 / 取消收藏（存本地，无需登录） */
    onToggleFav() {
      const id = this.recipe.id;
      let ids = uni.getStorageSync('favorites') || [];
      const has = ids.indexOf(id) >= 0;
      ids = has ? ids.filter((x) => x !== id) : ids.concat(id);
      uni.setStorageSync('favorites', ids);
      this.isFav = !has;
      uni.showToast({ title: has ? '已取消收藏' : '已收藏，可在"我的家庭"里查看', icon: 'none' });
    },

    /** App / H5 端的分享（小程序走原生 open-type="share"） */
    onShare() {
      const rec = this.recipe;
      shareBySystem(rec ? `${rec.name} · 家常做法与营养（卡卡家常菜谱）` : '卡卡家常菜谱');
    }
  }
};
</script>

<style scoped>
.r-hero {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  background: #ffffff;
  border-radius: 24rpx;
  margin: 20rpx 28rpx;
  padding: 30rpx;
  border-bottom: none;
}

.r-seal {
  width: 108rpx;
  height: 108rpx;
  font-size: 60rpx;
  border-radius: 12rpx;
}

.r-head {
  flex: 1;
  min-width: 0;
}

.r-name {
  font-size: 42rpx;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
}

.r-info {
  margin-top: 10rpx;
  font-variant-numeric: tabular-nums;
}

.r-tags {
  margin-top: 8rpx;
}

.fav-chip {
  flex-shrink: 0;
  font-size: 24rpx;
  letter-spacing: 2rpx;
  color: #f0592b;
  border: 2rpx solid #f0592b;
  border-radius: 8rpx;
  padding: 8rpx 22rpx;
  margin-top: 6rpx;
}

.fav-chip.on {
  background: #f0592b;
  color: #ffffff;
}

.meal-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6rpx;
}

.sec-label {
  font-size: 30rpx;
  font-weight: 700;
  letter-spacing: 0;
}

.ing {
  display: flex;
  align-items: baseline;
  padding: 16rpx 0;
}

.ing + .ing {
  border-top: 2rpx solid #f1eae0;
}

.ing-name {
  font-size: 28rpx;
  flex-shrink: 1;
}

.ing-leader {
  flex: 1;
  border-bottom: 2rpx dotted #d8ccbe;
  margin: 0 14rpx;
  min-width: 30rpx;
}

.ing-right {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}

.ing-amount {
  font-size: 28rpx;
  font-weight: 500;
}

.ing-price {
  font-size: 22rpx;
  color: #9c9084;
}

.dish-cost-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 22rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #ece4d8;
}

.dish-cost-num {
  font-size: 30rpx;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.step {
  display: flex;
  margin: 24rpx 0;
  gap: 20rpx;
}

.step-no {
  font-size: 34rpx;
  color: #f0592b;
  flex-shrink: 0;
  width: 40rpx;
  text-align: center;
  line-height: 1.5;
}

.step-text {
  font-size: 28rpx;
  line-height: 1.75;
}

.nut-grid {
  display: flex;
  margin: 20rpx 0 8rpx;
}

.nut-item {
  flex: 1;
  text-align: center;
}

.nut-num {
  font-size: 40rpx;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  margin-bottom: 4rpx;
}

.tip {
  margin-top: 24rpx;
  font-size: 25rpx;
  line-height: 1.7;
  color: #9c9084;
  border-left: none;
  padding-left: 0;
}

.bottom-space {
  height: 150rpx;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 16rpx;
  padding: 16rpx 32rpx calc(16rpx + env(safe-area-inset-bottom));
  background: rgba(247, 241, 233, 0.95);
  border-top: 2rpx solid #ece4d8;
}

.bar-btn {
  flex: 2;
  font-size: 28rpx;
}

.share-s {
  flex: 1;
}
</style>

<template>
  <view class="page">
    <view class="card empty" v-if="!hasMenu">
      <view>还没有今日菜单</view>
      <button class="btn-primary empty-btn" @click="onGoIndex">去生成今日菜单</button>
    </view>

    <template v-if="hasMenu">
      <view class="card head">
        <view class="card-title">
          <text>{{ dateLabel }} 购物清单</text>
          <text class="total-cost">预估 ¥{{ totalCost }}</text>
        </view>
        <view class="muted head-note">
          按 {{ memberCount }} 口人份量换算 · 已勾选 {{ buyableCount }} 样 · 打勾的才会进清单，家里已有的点一下去掉勾
        </view>
        <view class="copy-all" @click="onCopyList">复制全文清单备忘</view>
      </view>

      <view class="notice">
        勾选中的食材才会进清单：家里已有的点一下去掉勾；料酒、生抽等常备调味品默认不勾，需要补货就点一下勾进来。买菜 App 下单点每行<text class="hl">「复制」</text>逐样搜索；去超市或发家人代买，点底部<text class="hl">「生成清单图片」</text>长按保存转发。
      </view>

      <view class="card" v-for="(g, gi) in groups" :key="g.category">
        <view class="card-title">{{ g.category }}</view>
        <view class="divider"></view>
        <view
          class="item"
          :class="[it.checked ? 'checked' : 'unchecked', it.pantry ? 'pantry' : '']"
          v-for="(it, ii) in g.items"
          :key="it.name"
          @click="onToggleItem(gi, ii)"
        >
          <view class="checkbox">{{ it.checked ? '✓' : '' }}</view>
          <view class="item-main">
            <view class="item-name">
              {{ it.name }}
              <text class="copied-tag" v-if="it.copied">已复制</text>
            </view>
            <view class="item-sub">
              <text>{{ it.amountText }}</text>
              <text v-if="it.priceText" class="item-price"> · {{ it.priceText }}</text>
            </view>
          </view>
          <view class="copy-btn" @click.stop="onCopyItem(gi, ii)">复制</view>
        </view>
      </view>

      <view class="bottom-space"></view>
      <view class="bottom-bar">
        <button class="btn-primary bar-btn img-btn" @click="onMakeImage">
          生成清单图片（已选 {{ buyableCount }} 样 · ¥{{ totalCost }}）
        </button>
        <button class="btn-ghost bar-btn copy-btn2" @click="onCopySelected">复制</button>
      </view>

      <!-- 离屏画布：用于绘制清单图片 -->
      <!-- #ifdef MP-WEIXIN -->
      <canvas
        type="2d"
        id="listCanvas"
        :style="'position: fixed; left: 2000px; top: 0; width: 640px; height: ' + canvasH + 'px;'"
      ></canvas>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <canvas
        canvas-id="listCanvas"
        id="listCanvas"
        :style="'position: fixed; left: 2000px; top: 0; width: 640px; height: ' + canvasH + 'px;'"
      ></canvas>
      <!-- #endif -->
    </template>
  </view>
</template>

<script>
import { menuFromIds } from '../../utils/planner.js';
import * as shopping from '../../utils/shopping.js';
import { drawWatermark } from '../../utils/watermark.js';
import { prepareCanvas, previewGeneratedImage, saveHintText } from '../../utils/canvas.js';

/**
 * 采购交互说明：
 * 勾选 = 今天要买。生鲜食材默认全部勾上，家里已有的点一下去掉勾；
 * 常备调味品（料酒、生抽、八角等）默认不勾，需要补货时点一下勾进清单。
 * 「生成清单图片」和「复制」只输出勾选中的食材。
 * 各买菜平台（盒马、奥乐齐、美团买菜、多点等）的搜索框一次只认一样商品，
 * 所以每个条目另有「复制」按钮，只复制这一样的干净搜索词（去掉括号备注）。
 */

function dateLabel(dateStr) {
  const parts = (dateStr || '').split('-');
  return parts.length === 3 ? `${Number(parts[1])}月${Number(parts[2])}日` : '今日';
}

export default {
  data() {
    return {
      hasMenu: false,
      dateLabel: '',
      memberCount: 0,
      groups: [],
      buyableCount: 0,
      copiedCount: 0,
      totalCost: 0,
      canvasH: 400,
      currentDate: ''
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
    const current = uni.getStorageSync('currentMenu');
    if (!current || !current.ids) {
      this.hasMenu = false;
      return;
    }
    const menu = menuFromIds(current.ids);
    const groups = shopping.buildList(menu, current.factor || 1, current.boost || 1);
    // 恢复当日勾选/已复制状态（没记录的条目保持默认：生鲜勾上、调味品不勾）
    const saved = uni.getStorageSync(`shoppingSel:${current.date}`) || {};
    groups.forEach((g) =>
      g.items.forEach((it) => {
        const s = saved[it.name];
        it.copied = s ? !!s.copied : false;
        if (s) it.checked = !!s.checked;
      })
    );
    this.currentDate = current.date;
    this.hasMenu = true;
    this.dateLabel = dateLabel(current.date);
    this.memberCount = current.memberCount || 0;
    this.groups = groups;
    this.recount();
  },

  methods: {
    saveState() {
      const saved = {};
      this.groups.forEach((g) =>
        g.items.forEach((it) => {
          saved[it.name] = { checked: it.checked, copied: it.copied };
        })
      );
      uni.setStorageSync(`shoppingSel:${this.currentDate}`, saved);
    },

    /** 勾选中的食材（= 今天要买的） */
    selectedItems() {
      const list = [];
      this.groups.forEach((g) =>
        g.items.forEach((it) => {
          if (it.checked) list.push(it);
        })
      );
      return list;
    },

    recount() {
      const selected = this.selectedItems();
      this.buyableCount = selected.length;
      this.copiedCount = selected.filter((it) => it.copied).length;
      this.totalCost = shopping.totalCost(this.groups);
      this.saveState();
    },

    /** 点击条目切换勾选（勾上 = 要买；去掉勾 = 家里已有/不买） */
    onToggleItem(gi, ii) {
      this.groups[gi].items[ii].checked = !this.groups[gi].items[ii].checked;
      this.recount();
    },

    /** 单个食材的复制按钮：只复制干净的搜索词，方便到平台逐样搜索 */
    onCopyItem(gi, ii) {
      const item = this.groups[gi].items[ii];
      uni.setClipboardData({
        data: item.searchName,
        success: () => {
          this.groups[gi].items[ii].copied = true;
          this.recount();
          uni.showToast({ title: `已复制「${item.searchName}」`, icon: 'none' });
        }
      });
    },

    /** 复制勾选清单：把勾选中的食材整单复制 */
    onCopySelected() {
      const selected = this.selectedItems();
      if (!selected.length) {
        uni.showToast({ title: '先勾选要买的食材', icon: 'none' });
        return;
      }
      const text = selected.map((it) => `${it.searchName} ${it.amountText}`).join('\n');
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({
            title: `已复制勾选的 ${selected.length} 样食材`,
            icon: 'none',
            duration: 2000
          });
        }
      });
    },

    /**
     * 生成购物清单图片：只画勾选中的食材，
     * 全屏预览后长按即可保存到相册或转发给家人。
     */
    async onMakeImage() {
      const groups = this.groups
        .map((g) => ({
          category: g.category,
          items: g.items.filter((it) => it.checked)
        }))
        .filter((g) => g.items.length);
      const rows = groups.reduce((n, g) => n + g.items.length, 0);
      if (!rows) {
        uni.showToast({ title: '先勾选要买的食材', icon: 'none' });
        return;
      }

      const W = 640;
      const H = 150 + groups.length * 60 + rows * 54 + 100;
      uni.showLoading({ title: '正在生成…' });

      this.canvasH = H;
      await this.$nextTick();

      try {
        const { ctx, toTempFilePath } = await prepareCanvas({
          id: 'listCanvas',
          width: W,
          height: H,
          component: this
        });

        // 背景与顶部色条
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#f0592b';
        ctx.fillRect(0, 0, W, 10);

        // 标题与副标题
        ctx.fillStyle = '#33281f';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.dateLabel} 买菜清单`, 40, 66);
        ctx.fillStyle = '#9c9084';
        ctx.font = '22px sans-serif';
        ctx.fillText(`${this.memberCount} 口人 · 共 ${rows} 样 · 预估 ¥${this.totalCost}`, 40, 102);
        ctx.strokeStyle = '#f0e8dc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 124);
        ctx.lineTo(W - 40, 124);
        ctx.stroke();

        let y = 150;
        groups.forEach((g) => {
          // 分类标题
          ctx.fillStyle = '#f0592b';
          ctx.fillRect(40, y + 6, 6, 24);
          ctx.font = 'bold 24px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(g.category, 58, y + 26);
          y += 60;
          g.items.forEach((it) => {
            // 可打勾的方框
            ctx.strokeStyle = '#d3c7b8';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(44, y - 2, 26, 26);
            // 名称
            ctx.fillStyle = '#33281f';
            ctx.font = '26px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(it.name, 88, y + 20);
            // 数量 + 价格（右对齐）
            ctx.fillStyle = '#7d7168';
            ctx.font = '22px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(
              `${it.pantry ? '适量' : it.amountText}${it.priceText ? '  ' + it.priceText : ''}`,
              W - 40,
              y + 19
            );
            y += 54;
          });
        });

        // 品牌水印
        drawWatermark(ctx, W, H - 85, '价格为参考价');

        const tempFilePath = await toTempFilePath();
        uni.hideLoading();
        previewGeneratedImage(tempFilePath);
        uni.showToast({ title: saveHintText(), icon: 'none', duration: 2500 });
      } catch (e) {
        uni.hideLoading();
        uni.showToast({ title: '生成失败，请重试', icon: 'none' });
      }
    },

    /** 复制含预估价的完整清单（备忘/分享用） */
    onCopyList() {
      uni.setClipboardData({
        data: shopping.listToText(this.groups, this.dateLabel, this.memberCount),
        success: () => uni.showToast({ title: '备忘清单已复制', icon: 'success' })
      });
    },

    onGoIndex() {
      uni.switchTab({ url: '/pages/index/index' });
    }
  }
};
</script>

<style scoped>
.empty {
  text-align: center;
  padding: 80rpx 28rpx;
  color: #7d7168;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 20rpx;
}

.empty-btn {
  margin-top: 30rpx;
  width: 70%;
}

.total-cost {
  font-size: 30rpx;
  color: #7d7168;
  font-weight: 700;
}

.head-note {
  margin-top: 10rpx;
  line-height: 1.5;
}

.copy-all {
  margin-top: 14rpx;
  font-size: 25rpx;
  color: #f0592b;
}

.howto {
  background: #fdeee4;
  color: #7d7168;
  font-size: 25rpx;
  line-height: 1.7;
}

.hl {
  color: #f0592b;
  font-weight: 700;
}

.item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
}

.item + .item {
  border-top: 2rpx solid #f1eae0;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 3rpx solid #d3c7b8;
  border-radius: 10rpx;
  margin-right: 20rpx;
  text-align: center;
  line-height: 36rpx;
  color: #fff;
  font-size: 26rpx;
  flex-shrink: 0;
}

.item.checked .checkbox {
  background: #f0592b;
  border-color: #f0592b;
}

/* 勾选 = 要买，正常显示；未勾选 = 不买/已有，整行变淡 */
.item.unchecked .item-name,
.item.unchecked .item-sub {
  color: #c2b6a9;
}

.item-main {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 28rpx;
}

.copied-tag {
  font-size: 20rpx;
  color: #f0592b;
  background: #fdeee4;
  border-radius: 6rpx;
  padding: 2rpx 8rpx;
  margin-left: 8rpx;
}

.item-sub {
  font-size: 23rpx;
  color: #9c9084;
  margin-top: 4rpx;
}

.item-price {
  color: #7d7168;
}

.copy-btn {
  flex-shrink: 0;
  font-size: 24rpx;
  color: #f0592b;
  border: 2rpx solid #f0592b;
  border-radius: 10rpx;
  padding: 8rpx 22rpx;
  margin-left: 16rpx;
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
  gap: 12rpx;
  padding: 16rpx 24rpx calc(16rpx + env(safe-area-inset-bottom));
  background: rgba(247, 241, 233, 0.95);
}

.bar-btn {
  font-size: 26rpx;
  padding: 0 12rpx;
}

.img-btn {
  flex: 2.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-btn2 {
  flex: 1;
}

.next-btn {
  flex: 2.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.small {
  flex: 0.9;
}

.btn-hema {
  background: #f0592b;
  color: #fff;
  font-weight: 600;
  border-radius: 14rpx;
}

.btn-hema::after {
  border: none;
}
</style>

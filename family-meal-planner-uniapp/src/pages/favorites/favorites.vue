<template>
  <view class="page">
    <view class="card empty" v-if="!items.length">
      <view>收藏夹还是空的</view>
      <view class="muted empty-note">在任意菜谱详情页点「收藏」，喜欢的菜就会存到这里，随时翻出来做。</view>
      <button class="btn-primary empty-btn" @click="onGoIndex">去看看今日菜单</button>
    </view>

    <template v-if="items.length">
      <view class="card head">
        <view class="card-title">我的收藏（{{ items.length }} 道）</view>
        <view class="muted head-note">点菜品看做法；点右侧「移除」可取消收藏</view>
      </view>

      <view class="card">
        <view class="dish" v-for="dish in items" :key="dish.id" @click="onOpen(dish.id)">
          <view class="seal" :class="dish.type">{{ dish.firstChar }}</view>
          <view class="dish-main">
            <view class="dish-name">{{ dish.name }}</view>
            <view>
              <text class="tag" v-for="t in dish.tags" :key="t">{{ t }}</text>
            </view>
          </view>
          <view class="dish-right">
            <view class="dish-kcal">人均 {{ dish.kcal }} 千卡</view>
            <view class="muted">{{ dish.time }} 分钟</view>
          </view>
          <view class="fav-remove" @click.stop="onRemove(dish.id)">移除</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { byId } from '../../data/recipes.js';
import * as nutrition from '../../utils/nutrition.js';
import * as prices from '../../data/prices.js';

export default {
  data() {
    return {
      items: []
    };
  },

  // #ifdef MP-WEIXIN
  onShareAppMessage() {
    return {
      title: '我在卡卡家常菜谱收藏的家常菜，每道都有做法和营养',
      path: '/pages/index/index'
    };
  },
  // #endif

  onShow() {
    this.load();
  },

  methods: {
    load() {
      const ids = uni.getStorageSync('favorites') || [];
      const members = uni.getStorageSync('familyMembers') || [];
      const factor = members.length ? nutrition.familySummary(members).factor : 1;
      this.items = ids
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
    },

    onOpen(id) {
      uni.navigateTo({ url: `/pages/recipe/recipe?id=${id}` });
    },

    /** 从收藏夹移除 */
    onRemove(id) {
      const ids = (uni.getStorageSync('favorites') || []).filter((x) => x !== id);
      uni.setStorageSync('favorites', ids);
      this.load();
      uni.showToast({ title: '已取消收藏', icon: 'none' });
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
  padding: 90rpx 32rpx;
  color: #7d7168;
  font-size: 30rpx;
}

.empty-icon {
  font-size: 80rpx;
  margin-bottom: 16rpx;
}

.empty-note {
  margin-top: 14rpx;
  line-height: 1.7;
}

.empty-btn {
  margin-top: 32rpx;
  width: 76%;
}

.head-note {
  margin-top: 8rpx;
}

.dish {
  display: flex;
  align-items: center;
  padding: 18rpx 0;
}

.dish + .dish {
  border-top: 2rpx solid #f1eae0;
}

.dish-avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  flex-shrink: 0;
  margin-right: 20rpx;
}

.cover-breakfast { background: linear-gradient(135deg, #ffe9c7, #ffd18d); }
.cover-meat { background: linear-gradient(135deg, #ffdccb, #ffb497); }
.cover-veg { background: linear-gradient(135deg, #dcf0de, #abddb5); }
.cover-soup { background: linear-gradient(135deg, #d9edf6, #abd8ea); }
.cover-staple { background: linear-gradient(135deg, #f3ecda, #e5d5ae); }

.dish-main {
  flex: 1;
  min-width: 0;
}

.dish-name {
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.dish-right {
  text-align: right;
  flex-shrink: 0;
  margin-left: 12rpx;
}

.dish-kcal {
  font-size: 24rpx;
  color: #7d7168;
  margin-bottom: 6rpx;
}

.fav-remove {
  font-size: 24rpx;
  color: #b4453c;
  letter-spacing: 2rpx;
  padding: 10rpx 0 10rpx 24rpx;
  flex-shrink: 0;
}
</style>

<template>
  <view class="page">
    <view class="search-box">
      <input
        class="search-input"
        placeholder="搜菜名、食材、标签，比如：黄瓜"
        :value="kw"
        :focus="true"
        confirm-type="search"
        @input="onInput"
      />
    </view>

    <view class="card" v-if="!kw">
      <view class="muted">大家常搜：</view>
      <view class="hot-wrap">
        <view class="hot" v-for="item in hot" :key="item" @click="onHotTap(item)">{{ item }}</view>
      </view>
      <view class="muted search-tip">支持按食材搜索——比如搜"黄瓜"，能找到所有用到黄瓜的菜。</view>
    </view>

    <view class="card empty-r" v-if="kw && !results.length">
      <view>没有找到「{{ kw }}」相关的菜</view>
      <view class="muted" style="margin-top: 8rpx">想吃这道菜？把菜名发给开发者，几分钟就能加进菜谱库。</view>
    </view>

    <view class="card" v-if="results.length">
      <view class="muted" style="margin-bottom: 8rpx">找到 {{ results.length }} 道</view>
      <view class="dish" v-for="dish in results" :key="dish.id" @click="onOpen(dish.id)">
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
        <view class="fav-btn" @click.stop="onFav(dish.id)">{{ favs[dish.id] ? '已收藏' : '收藏' }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { RECIPES } from '../../data/recipes.js';

export default {
  data() {
    return {
      kw: '',
      results: [],
      favs: {},
      hot: ['黄瓜', '牛肉', '鸡蛋', '豆腐', '凉拌', '快手', '汤', '儿童最爱']
    };
  },

  onShow() {
    this.favs = this.favMap();
  },

  methods: {
    favMap() {
      const m = {};
      (uni.getStorageSync('favorites') || []).forEach((id) => {
        m[id] = true;
      });
      return m;
    },

    onInput(e) {
      const kw = (e.detail.value || '').trim();
      this.kw = kw;
      this.doSearch(kw);
    },

    onHotTap(kw) {
      this.kw = kw;
      this.doSearch(kw);
    },

    /** 按菜名 / 食材 / 标签模糊匹配 */
    doSearch(kw) {
      if (!kw) {
        this.results = [];
        return;
      }
      this.results = RECIPES.filter(
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
    },

    onOpen(id) {
      uni.navigateTo({ url: `/pages/recipe/recipe?id=${id}` });
    },

    /** 搜索结果里直接收藏 / 取消收藏 */
    onFav(id) {
      let ids = uni.getStorageSync('favorites') || [];
      const has = ids.indexOf(id) >= 0;
      ids = has ? ids.filter((x) => x !== id) : ids.concat(id);
      uni.setStorageSync('favorites', ids);
      this.favs[id] = !has;
      uni.showToast({ title: has ? '已取消收藏' : '已收藏', icon: 'none' });
    }
  }
};
</script>

<style scoped>
.search-box {
  padding: 20rpx 24rpx 4rpx;
}

.search-input {
  background: #ffffff;
  border: 2rpx solid #d8ccbe;
  border-radius: 10rpx;
  padding: 18rpx 28rpx;
  font-size: 28rpx;
}

.hot-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin: 18rpx 0;
}

.hot {
  font-size: 26rpx;
  color: #f0592b;
  background: #fdeee4;
  border-radius: 999rpx;
  padding: 10rpx 28rpx;
}

.search-tip {
  line-height: 1.6;
}

.empty-r {
  text-align: center;
  padding: 50rpx 28rpx;
  font-size: 28rpx;
  color: #7d7168;
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

.fav-btn {
  font-size: 24rpx;
  color: #f0592b;
  letter-spacing: 2rpx;
  padding: 10rpx 0 10rpx 24rpx;
  flex-shrink: 0;
}
</style>

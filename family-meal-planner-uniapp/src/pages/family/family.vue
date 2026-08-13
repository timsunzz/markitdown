<template>
  <view class="page">
    <view class="card summary-card" v-if="summary">
      <view class="card-title">我的家庭（{{ summary.count }} 口人）</view>
      <view class="divider"></view>
      <view class="summary-line">全家每日营养目标：</view>
      <view class="summary-grid">
        <view class="s-item"><view class="s-num">{{ summary.kcal }}</view><view class="muted">能量 kcal</view></view>
        <view class="s-item"><view class="s-num">{{ summary.protein }}g</view><view class="muted">蛋白质</view></view>
        <view class="s-item"><view class="s-num">{{ summary.calcium }}mg</view><view class="muted">钙</view></view>
        <view class="s-item"><view class="s-num">{{ summary.iron }}mg</view><view class="muted">铁</view></view>
      </view>
      <view class="muted factor-note">
        做菜总份量系数：{{ summary.factor }} 标准份（菜谱食材与购物清单按此自动换算）
      </view>
    </view>

    <view class="card fav-entry" @click="onGoFavorites">
      <view class="card-title">
        <text>我的收藏</text>
        <text class="fav-count">{{ favCount }} 道 ›</text>
      </view>
    </view>

    <view class="card">
      <view class="card-title">口味偏好</view>
      <view class="divider"></view>
      <view class="pref-row">
        <view>
          <view class="pref-name">全家免辣</view>
          <view class="muted">开启后菜单不再出现任何辣菜；关闭时家有 10 岁以下孩子仍会自动避辣</view>
        </view>
        <switch :checked="noSpicy" color="#f0592b" @change="onToggleNoSpicy" />
      </view>
      <view class="divider"></view>
      <view class="pref-row">
        <view>
          <view class="pref-name">不吃猪肉</view>
          <view class="muted">开启后菜单不出现任何含猪肉食材的菜（含鲜肉包、馄饨、肉松等），也排除含酒精的菜。注：家常做法常用料酒去腥，如需严格清真，烹饪时省略料酒即可</view>
        </view>
        <switch :checked="noPork" color="#f0592b" @change="onToggleNoPork" />
      </view>
      <view class="divider"></view>
      <view class="pref-row">
        <view>
          <view class="pref-name">今日预算</view>
          <view class="muted">开启后按预算自动优选便宜搭配；晚餐大荤不会被省掉，预算实在紧时会如实提示实际金额</view>
        </view>
        <switch :checked="budgetOn" color="#f0592b" @change="onToggleBudget" />
      </view>
      <view class="budget-input-row" v-if="budgetOn">
        <text class="budget-yuan">¥</text>
        <input
          class="budget-input"
          type="number"
          :value="budgetAmount"
          placeholder="如 60"
          @blur="onBudgetInput"
        />
        <text class="muted">元 / 天（全家买菜钱）</text>
      </view>
      <view class="divider"></view>
      <view class="pref-row">
        <view>
          <view class="pref-name">热量控制</view>
          <view class="muted">轻盈模式：全天总热量自动控制在全家推荐值的 85% 左右，优先换低热量做法，适合想控制体重的家庭</view>
        </view>
        <switch :checked="kcalOn" color="#f0592b" @change="onToggleKcal" />
      </view>
    </view>

    <view class="card">
      <view class="card-title">
        <text>家庭成员</text>
        <view class="add-link" @click="onToggleForm">{{ showForm ? '收起' : '添加成员' }}</view>
      </view>
      <view class="divider"></view>

      <view class="muted empty-hint" v-if="!members.length">
        还没有家庭成员。请按你家的实际情况添加（比如一位或两位老人的家庭，只添加"老人"即可），份量和营养目标会完全按真实成员计算。
      </view>

      <view class="member" v-for="m in memberViews" :key="m.id">
        <view class="member-main">
          <view class="member-name">{{ m.label }}</view>
          <view class="muted">{{ m.desc }}</view>
        </view>
        <view class="remove" @click="onRemoveMember(m.id)">删除</view>
      </view>

      <view class="form" v-if="showForm">
        <view class="divider" v-if="members.length"></view>
        <view class="form-row">
          <text class="form-label">成员类型</text>
          <picker :range="roleLabels" :value="roleIndex" @change="onRoleChange">
            <view class="picker-value">{{ roleLabels[roleIndex] }} ▾</view>
          </picker>
        </view>
        <view class="form-row" v-if="roles[roleIndex].needAge">
          <text class="form-label">孩子年龄</text>
          <input
            class="age-input"
            type="number"
            placeholder="1-17 岁"
            :value="childAge"
            @input="onAgeInput"
          />
        </view>
        <button class="btn-primary form-btn" @click="onAddMember">保存成员</button>
      </view>
    </view>

    <view class="card muted about">
      营养目标依据《中国居民膳食营养素参考摄入量（2023 版）》按轻体力活动水平估算，仅供家庭配餐参考，不能替代医生或临床营养师的个体化建议。孕期、哺乳期及慢病成员请遵医嘱。
    </view>
  </view>
</template>

<script>
import * as nutrition from '../../utils/nutrition.js';

export default {
  data() {
    return {
      members: [],
      memberViews: [],
      summary: null,
      roles: nutrition.ROLES,
      roleLabels: nutrition.ROLES.map((r) => r.label),
      noSpicy: false,
      noPork: false,
      budgetOn: false,
      budgetAmount: '',
      kcalOn: false,
      favCount: 0,
      // 新增成员表单
      showForm: false,
      roleIndex: 0,
      childAge: ''
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
    this.load();
  },

  methods: {
    load() {
      const members = uni.getStorageSync('familyMembers') || [];
      this.members = members;
      this.memberViews = members.map((m) => {
        const t = nutrition.targetsFor(m);
        return {
          id: m.id,
          label: nutrition.roleLabel(m),
          desc: `每日约 ${t.kcal} kcal · 蛋白质 ${t.protein}g · 钙 ${t.calcium}mg · 铁 ${t.iron}mg`
        };
      });
      this.summary = members.length ? nutrition.familySummary(members) : null;
      this.noSpicy = !!uni.getStorageSync('noSpicyAll');
      this.noPork = !!uni.getStorageSync('noPorkAll');
      this.budgetOn = !!uni.getStorageSync('budgetOn');
      this.budgetAmount = uni.getStorageSync('budgetAmount') || '';
      this.kcalOn = !!uni.getStorageSync('kcalOn');
      this.favCount = (uni.getStorageSync('favorites') || []).length;
      // 没有成员时自动展开表单，引导添加
      this.showForm = this.showForm || !members.length;
    },

    onToggleNoSpicy(e) {
      uni.setStorageSync('noSpicyAll', !!e.detail.value);
      this.noSpicy = !!e.detail.value;
      uni.showToast({
        title: e.detail.value ? '已开启全家免辣' : '已关闭免辣（家有 10 岁以下孩子仍自动避辣）',
        icon: 'none'
      });
    },

    onGoFavorites() {
      uni.navigateTo({ url: '/pages/favorites/favorites' });
    },

    onToggleNoPork(e) {
      uni.setStorageSync('noPorkAll', !!e.detail.value);
      this.noPork = !!e.detail.value;
      uni.showToast({
        title: e.detail.value ? '已开启，菜单不再出现含猪肉的菜' : '已关闭不吃猪肉',
        icon: 'none'
      });
    },

    onToggleBudget(e) {
      const on = !!e.detail.value;
      uni.setStorageSync('budgetOn', on);
      this.budgetOn = on;
      if (on && !uni.getStorageSync('budgetAmount')) {
        // 给个合理的默认值：约每标准份 20 元
        const summary = this.summary;
        const def = summary ? Math.round(summary.factor * 20) : 60;
        uni.setStorageSync('budgetAmount', def);
        this.budgetAmount = def;
      }
      uni.showToast({
        title: on ? '已开启今日预算，菜单会自动贴近' : '已关闭预算限制',
        icon: 'none'
      });
    },

    onBudgetInput(e) {
      const v = parseInt(e.detail.value, 10);
      if (!v || v <= 0) {
        uni.showToast({ title: '请填写正确的金额', icon: 'none' });
        return;
      }
      uni.setStorageSync('budgetAmount', v);
      this.budgetAmount = v;
    },

    onToggleKcal(e) {
      const on = !!e.detail.value;
      uni.setStorageSync('kcalOn', on);
      this.kcalOn = on;
      uni.showToast({
        title: on ? '已开启热量控制（推荐值的 85%）' : '已关闭热量控制',
        icon: 'none'
      });
    },

    onToggleForm() {
      this.showForm = !this.showForm;
      this.roleIndex = 0;
      this.childAge = '';
    },

    onRoleChange(e) {
      this.roleIndex = Number(e.detail.value);
    },

    onAgeInput(e) {
      this.childAge = e.detail.value;
    },

    onAddMember() {
      const role = this.roles[this.roleIndex];
      let age = 30;
      if (role.key === 'child') {
        age = parseInt(this.childAge, 10);
        if (!age || age < 1 || age > 17) {
          uni.showToast({ title: '请填写 1-17 岁的年龄', icon: 'none' });
          return;
        }
      }
      const members = uni.getStorageSync('familyMembers') || [];
      members.push({ id: Date.now(), role: role.key, age });
      uni.setStorageSync('familyMembers', members);
      uni.removeStorageSync('familyIsDefault');
      this.showForm = false;
      this.childAge = '';
      this.load();
      uni.showToast({ title: '已添加，菜单份量已更新', icon: 'none' });
    },

    onRemoveMember(id) {
      const members = (uni.getStorageSync('familyMembers') || []).filter((m) => m.id !== id);
      uni.setStorageSync('familyMembers', members);
      uni.removeStorageSync('familyIsDefault');
      if (!members.length) {
        uni.removeStorageSync('currentMenu');
        uni.showToast({ title: '已清空，请添加真实的家庭成员', icon: 'none' });
      }
      this.load();
    }
  }
};
</script>

<style scoped>
.summary-card {
  background: #f0592b;
  color: #ffffff;
  border-bottom: none;
}

.summary-card .divider {
  background: rgba(255, 255, 255, 0.16);
}

.summary-card .muted {
  color: rgba(255, 255, 255, 0.72);
}

.summary-card .s-num {
  color: #ffffff;
  font-family: -apple-system, "PingFang SC", sans-serif;
}

.summary-line {
  font-size: 26rpx;
  margin-bottom: 16rpx;
}

.summary-grid {
  display: flex;
  justify-content: space-between;
}

.s-item {
  text-align: center;
  flex: 1;
}

.s-num {
  font-size: 34rpx;
  font-weight: 700;
  color: #f0592b;
  margin-bottom: 4rpx;
}

.factor-note {
  margin-top: 20rpx;
  line-height: 1.5;
}

.fav-count {
  font-size: 26rpx;
  font-weight: 400;
  color: #9c9084;
}

.pref-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.pref-name {
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 6rpx;
}

.empty-hint {
  line-height: 1.7;
  padding: 10rpx 0 16rpx;
}

.add-link {
  font-size: 26rpx;
  color: #f0592b;
  font-weight: 400;
}

.member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 0;
}

.member + .member {
  border-top: 2rpx solid #f1eae0;
}

.member-name {
  font-size: 30rpx;
  font-weight: 500;
  margin-bottom: 6rpx;
}

.remove {
  color: #c0574f;
  font-size: 25rpx;
  padding: 10rpx 0 10rpx 24rpx;
  flex-shrink: 0;
}

.form-row {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
}

.form-label {
  width: 160rpx;
  font-size: 28rpx;
}

.picker-value {
  color: #f0592b;
  font-size: 28rpx;
}

.age-input {
  border: 2rpx solid #e9e1d5;
  border-radius: 10rpx;
  padding: 8rpx 16rpx;
  width: 200rpx;
  font-size: 28rpx;
}

.form-btn {
  margin-top: 16rpx;
}

.about {
  line-height: 1.7;
  font-size: 24rpx;
}

.budget-input-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 4rpx 0 18rpx;
}

.budget-yuan {
  font-size: 30rpx;
  font-weight: 600;
  color: #f0592b;
}

.budget-input {
  border: 2rpx solid #e9e1d5;
  border-radius: 10rpx;
  padding: 8rpx 16rpx;
  width: 160rpx;
  font-size: 30rpx;
  font-variant-numeric: tabular-nums;
}
</style>

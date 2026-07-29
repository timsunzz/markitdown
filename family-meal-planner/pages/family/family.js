const nutrition = require('../../utils/nutrition');

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
    members: [],
    memberViews: [],
    summary: null,
    roles: nutrition.ROLES,
    roleLabels: nutrition.ROLES.map((r) => r.label),
    noSpicy: false,
    noPork: false,
    // 新增成员表单
    showForm: false,
    roleIndex: 0,
    childAge: ''
  },

  onShow() {
    this.load();
  },

  load() {
    const members = wx.getStorageSync('familyMembers') || [];
    this.setData({
      members,
      memberViews: members.map((m) => {
        const t = nutrition.targetsFor(m);
        return {
          id: m.id,
          label: nutrition.roleLabel(m),
          desc: `每日约 ${t.kcal} kcal · 蛋白质 ${t.protein}g · 钙 ${t.calcium}mg · 铁 ${t.iron}mg`
        };
      }),
      summary: members.length ? nutrition.familySummary(members) : null,
      noSpicy: !!wx.getStorageSync('noSpicyAll'),
      noPork: !!wx.getStorageSync('noPorkAll'),
      // 没有成员时自动展开表单，引导添加
      showForm: this.data.showForm || !members.length
    });
  },

  onToggleNoSpicy(e) {
    wx.setStorageSync('noSpicyAll', !!e.detail.value);
    this.setData({ noSpicy: !!e.detail.value });
    wx.showToast({
      title: e.detail.value ? '已开启全家免辣' : '已关闭免辣（家有 10 岁以下孩子仍自动避辣）',
      icon: 'none'
    });
  },

  onToggleNoPork(e) {
    wx.setStorageSync('noPorkAll', !!e.detail.value);
    this.setData({ noPork: !!e.detail.value });
    wx.showToast({
      title: e.detail.value ? '已开启，菜单不再出现含猪肉的菜' : '已关闭不吃猪肉',
      icon: 'none'
    });
  },

  onToggleForm() {
    this.setData({ showForm: !this.data.showForm, roleIndex: 0, childAge: '' });
  },

  onRoleChange(e) {
    this.setData({ roleIndex: Number(e.detail.value) });
  },

  onAgeInput(e) {
    this.setData({ childAge: e.detail.value });
  },

  onAddMember() {
    const role = this.data.roles[this.data.roleIndex];
    let age = 30;
    if (role.key === 'child') {
      age = parseInt(this.data.childAge, 10);
      if (!age || age < 1 || age > 17) {
        wx.showToast({ title: '请填写 1-17 岁的年龄', icon: 'none' });
        return;
      }
    }
    const members = wx.getStorageSync('familyMembers') || [];
    members.push({ id: Date.now(), role: role.key, age });
    wx.setStorageSync('familyMembers', members);
    wx.removeStorageSync('familyIsDefault');
    this.setData({ showForm: false, childAge: '' });
    this.load();
    wx.showToast({ title: '已添加，菜单份量已更新', icon: 'none' });
  },

  onRemoveMember(e) {
    const id = e.currentTarget.dataset.id;
    const members = (wx.getStorageSync('familyMembers') || []).filter((m) => m.id !== id);
    wx.setStorageSync('familyMembers', members);
    wx.removeStorageSync('familyIsDefault');
    if (!members.length) {
      wx.removeStorageSync('currentMenu');
      wx.showToast({ title: '已清空，请添加真实的家庭成员', icon: 'none' });
    }
    this.load();
  }
});

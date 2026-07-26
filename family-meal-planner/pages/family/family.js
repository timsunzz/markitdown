const nutrition = require('../../utils/nutrition');

Page({
  data: {
    members: [],
    memberViews: [],
    summary: null,
    roles: nutrition.ROLES,
    roleLabels: nutrition.ROLES.map((r) => r.label),
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
      summary: nutrition.familySummary(members)
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
    if (!members.length) {
      wx.showToast({ title: '至少保留 1 位成员', icon: 'none' });
      return;
    }
    wx.setStorageSync('familyMembers', members);
    wx.removeStorageSync('familyIsDefault');
    this.load();
  }
});

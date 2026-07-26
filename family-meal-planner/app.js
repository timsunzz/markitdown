App({
  onLaunch() {
    // 首次启动时给一个默认家庭配置（2 位成人），引导用户去"我的家庭"完善
    const members = wx.getStorageSync('familyMembers');
    if (!members || !members.length) {
      wx.setStorageSync('familyMembers', [
        { id: 1, role: 'adultFemale', age: 32 },
        { id: 2, role: 'adultMale', age: 34 }
      ]);
      wx.setStorageSync('familyIsDefault', true);
    }
  }
});

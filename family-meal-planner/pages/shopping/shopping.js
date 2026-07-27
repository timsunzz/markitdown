const { menuFromIds } = require('../../utils/planner');
const shopping = require('../../utils/shopping');

/**
 * 采购交互说明：
 * 各买菜平台（盒马、奥乐齐、美团买菜、多点等）的搜索框一次只认一样商品，
 * 所以提供两种复制方式，用户复制后自行粘贴到任意平台搜索购买：
 *  1. 每个条目的「复制」按钮：只复制这一样的干净搜索词（去掉括号备注）
 *  2. 底部「复制所选清单」：把还需购买的食材（未打勾的）整单复制，
 *     适合发给家人代买、或在支持批量的平台/线下超市对着买
 */

function dateLabel(dateStr) {
  const parts = (dateStr || '').split('-');
  return parts.length === 3 ? `${Number(parts[1])}月${Number(parts[2])}日` : '今日';
}

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
    hasMenu: false,
    dateLabel: '',
    memberCount: 0,
    groups: [],
    buyableCount: 0,
    copiedCount: 0,
    totalCost: 0
  },

  onShow() {
    const current = wx.getStorageSync('currentMenu');
    if (!current || !current.ids) {
      this.setData({ hasMenu: false });
      return;
    }
    const menu = menuFromIds(current.ids);
    const groups = shopping.buildList(menu, current.factor || 1);
    // 恢复当日已勾选/已复制状态
    const saved = wx.getStorageSync(`shoppingState:${current.date}`) || {};
    groups.forEach((g) =>
      g.items.forEach((it) => {
        const s = saved[it.name] || {};
        it.checked = !!s.checked;
        it.copied = !!s.copied;
      })
    );
    this.currentDate = current.date;
    this.setData({
      hasMenu: true,
      dateLabel: dateLabel(current.date),
      memberCount: current.memberCount || 0,
      groups
    });
    this.recount();
  },

  saveState() {
    const saved = {};
    this.data.groups.forEach((g) =>
      g.items.forEach((it) => {
        if (it.checked || it.copied) saved[it.name] = { checked: it.checked, copied: it.copied };
      })
    );
    wx.setStorageSync(`shoppingState:${this.currentDate}`, saved);
  },

  /** 待购列表（非常备、未勾掉） */
  buyables() {
    const list = [];
    this.data.groups.forEach((g) =>
      g.items.forEach((it) => {
        if (!it.pantry && !it.checked) list.push(it);
      })
    );
    return list;
  },

  recount() {
    const buyable = this.buyables();
    this.setData({
      buyableCount: buyable.length,
      copiedCount: buyable.filter((it) => it.copied).length,
      totalCost: shopping.totalCost(this.data.groups)
    });
    this.saveState();
  },

  /** 点击条目打勾（家里已有 / 已经买了） */
  onToggleItem(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const checked = !this.data.groups[gi].items[ii].checked;
    this.setData({ [`groups[${gi}].items[${ii}].checked`]: checked }, () => this.recount());
  },

  /** 单个食材的复制按钮：只复制干净的搜索词，方便到平台逐样搜索 */
  onCopyItem(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const item = this.data.groups[gi].items[ii];
    wx.setClipboardData({
      data: item.searchName,
      success: () => {
        this.setData({ [`groups[${gi}].items[${ii}].copied`]: true }, () => this.recount());
        wx.showToast({ title: `已复制「${item.searchName}」`, icon: 'none' });
      }
    });
  },

  /** 复制所选清单：把还需购买的食材整单复制 */
  onCopySelected() {
    const buyable = this.buyables();
    if (!buyable.length) {
      wx.showToast({ title: '所有食材都已备齐', icon: 'none' });
      return;
    }
    const text = buyable.map((it) => `${it.searchName} ${it.amountText}`).join('\n');
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: `已复制 ${buyable.length} 样食材，去买菜平台搜索购买吧`,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /** 复制含预估价的完整清单（备忘/分享用） */
  onCopyList() {
    wx.setClipboardData({
      data: shopping.listToText(this.data.groups, this.data.dateLabel, this.data.memberCount),
      success: () => wx.showToast({ title: '备忘清单已复制', icon: 'success' })
    });
  },

  onGoIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

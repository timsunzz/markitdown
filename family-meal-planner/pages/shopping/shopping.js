const { menuFromIds } = require('../../utils/planner');
const shopping = require('../../utils/shopping');

/**
 * 一键购买配置
 *
 * 奥乐齐（ALDI）有官方微信小程序，可通过 wx.navigateToMiniProgram 直接跳转。
 * 上架前请在微信中打开「奥乐齐ALDI」官方小程序 → 右上角"…" → 更多资料，
 * 获取其 AppID 填到下方 ALDI_APPID，并在 mp.weixin.qq.com 的
 * 「设置-第三方设置-跳转小程序管理」中添加该 AppID。
 *
 * 盒马目前没有微信小程序（属阿里生态），采用"逐样复制 → 盒马 App 搜索下单"的方式。
 *
 * 采购交互说明：盒马/奥乐齐的搜索框一次只能搜一样商品，所以不提供
 * "整单粘贴"，而是"下一样"逐个复制干净的搜索词（去掉括号备注），
 * 用户在两个 App 间往返粘贴加购，进度自动记录。
 */
const ALDI_APPID = ''; // TODO: 上架前填入奥乐齐官方小程序 AppID

function dateLabel(dateStr) {
  const parts = (dateStr || '').split('-');
  return parts.length === 3 ? `${Number(parts[1])}月${Number(parts[2])}日` : '今日';
}

Page({
  data: {
    hasMenu: false,
    dateLabel: '',
    memberCount: 0,
    groups: [],
    buyableCount: 0,
    copiedCount: 0,
    totalCost: 0,
    nextName: ''
  },

  onShow() {
    const current = wx.getStorageSync('currentMenu');
    if (!current || !current.ids) {
      this.setData({ hasMenu: false });
      return;
    }
    const menu = menuFromIds(current.ids);
    const groups = shopping.buildList(menu, current.factor || 1);
    // 恢复本次会话中已复制/已勾选的状态（按食材名，跨菜单日期不保留）
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
    const next = buyable.find((it) => !it.copied);
    this.setData({
      buyableCount: buyable.length,
      copiedCount: buyable.filter((it) => it.copied).length,
      totalCost: shopping.totalCost(this.data.groups),
      nextName: next ? next.searchName : ''
    });
    this.saveState();
  },

  /** 点击条目打勾（家里已有 / 已经买了） */
  onToggleItem(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const checked = !this.data.groups[gi].items[ii].checked;
    this.setData({ [`groups[${gi}].items[${ii}].checked`]: checked }, () => this.recount());
  },

  /** 单个食材的复制按钮：只复制干净的搜索词 */
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

  /** 逐样采购：复制下一个还没复制过的待购食材 */
  onCopyNext() {
    const buyable = this.buyables();
    const next = buyable.find((it) => !it.copied);
    if (!next) {
      wx.showToast({ title: '全部复制过啦，买完记得打勾', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: next.searchName,
      success: () => {
        // 找到它在 groups 中的位置标记 copied
        this.data.groups.forEach((g, gi) =>
          g.items.forEach((it, ii) => {
            if (it.name === next.name) {
              this.setData({ [`groups[${gi}].items[${ii}].copied`]: true });
            }
          })
        );
        this.recount();
        wx.showToast({
          title: `已复制「${next.searchName}」，去盒马/奥乐齐粘贴搜索`,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /** 复制全文清单（备忘/分享用，不用于搜索框粘贴） */
  onCopyList() {
    wx.setClipboardData({
      data: shopping.listToText(this.data.groups, this.data.dateLabel, this.data.memberCount),
      success: () => wx.showToast({ title: '备忘清单已复制', icon: 'success' })
    });
  },

  /** 去奥乐齐：跳转官方小程序，逐样粘贴 */
  onBuyAldi() {
    const tip =
      '奥乐齐搜索框一次搜一样：回到本页点「下一样」复制食材名，到奥乐齐粘贴搜索、加购，往返几次即可买齐。';
    if (!ALDI_APPID) {
      wx.showModal({
        title: '逐样采购',
        content: `请在微信搜索「奥乐齐ALDI」小程序。${tip}`,
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    wx.navigateToMiniProgram({
      appId: ALDI_APPID,
      fail: () => {
        wx.showModal({
          title: '逐样采购',
          content: `未能直接打开奥乐齐小程序，请在微信搜索「奥乐齐ALDI」。${tip}`,
          showCancel: false
        });
      }
    });
  },

  /** 去盒马：指引逐样粘贴 */
  onBuyHema() {
    wx.showModal({
      title: '盒马逐样采购',
      content:
        '盒马搜索框一次只能搜一样商品：点本页「下一样」复制食材名 → 切到盒马 App 粘贴搜索、加购 → 切回来点「下一样」，往返几次即可买齐（进度会自动记录）。',
      showCancel: false,
      confirmText: '开始，复制第一样',
      success: (res) => {
        if (res.confirm) this.onCopyNext();
      }
    });
  },

  onGoIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

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
 * 盒马目前没有微信小程序（属阿里生态），采用"复制清单 → 打开盒马 App 搜索下单"的方式。
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
    buyableCount: 0
  },

  onShow() {
    const current = wx.getStorageSync('currentMenu');
    if (!current || !current.ids) {
      this.setData({ hasMenu: false });
      return;
    }
    const menu = menuFromIds(current.ids);
    const groups = shopping.buildList(menu, current.factor || 1);
    this.setData({
      hasMenu: true,
      dateLabel: dateLabel(current.date),
      memberCount: current.memberCount || 0,
      groups,
      buyableCount: this.countBuyable(groups)
    });
    this.currentMeta = current;
  },

  countBuyable(groups) {
    let n = 0;
    groups.forEach((g) => g.items.forEach((it) => {
      if (!it.pantry && !it.checked) n += 1;
    }));
    return n;
  },

  /** 点击条目打勾（家里已有，不需要买） */
  onToggleItem(e) {
    const { gi, ii } = e.currentTarget.dataset;
    const key = `groups[${gi}].items[${ii}].checked`;
    const checked = !this.data.groups[gi].items[ii].checked;
    this.setData({ [key]: checked }, () => {
      this.setData({ buyableCount: this.countBuyable(this.data.groups) });
    });
  },

  buildText() {
    return shopping.listToText(this.data.groups, this.data.dateLabel, this.data.memberCount);
  },

  onCopyList() {
    wx.setClipboardData({
      data: this.buildText(),
      success: () => {
        wx.showToast({ title: '清单已复制', icon: 'success' });
      }
    });
  },

  /** 一键去奥乐齐：复制清单并跳转官方小程序 */
  onBuyAldi() {
    const jump = () => {
      if (!ALDI_APPID) {
        wx.showModal({
          title: '清单已复制',
          content: '请在微信搜索「奥乐齐ALDI」小程序，粘贴清单中的食材名称即可下单买齐。',
          showCancel: false,
          confirmText: '知道了'
        });
        return;
      }
      wx.navigateToMiniProgram({
        appId: ALDI_APPID,
        fail: () => {
          wx.showModal({
            title: '清单已复制',
            content: '未能直接打开奥乐齐小程序，请在微信搜索「奥乐齐ALDI」，粘贴食材名称下单。',
            showCancel: false
          });
        }
      });
    };
    wx.setClipboardData({ data: this.buildText(), success: jump, fail: jump });
  },

  /** 一键去盒马：复制清单并指引打开盒马 App */
  onBuyHema() {
    wx.setClipboardData({
      data: this.buildText(),
      success: () => {
        wx.showModal({
          title: '清单已复制 ✅',
          content: '打开「盒马」App，在搜索框长按粘贴食材名称，即可一键加购买齐（30 分钟送达区域内）。',
          showCancel: false,
          confirmText: '去打开盒马'
        });
      }
    });
  },

  onGoIndex() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

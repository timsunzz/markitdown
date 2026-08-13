/**
 * 分享适配
 *
 * 微信小程序用原生的 <button open-type="share">，配合页面的
 * onShareAppMessage / onShareTimeline 回调，转发卡片由微信渲染；
 * App 端没有这套机制，改为调起 iOS / Android 的系统分享面板，
 * 万一分享模块不可用（或用户取消），退回"复制到剪贴板"，保证按钮永远有反馈。
 */

export const SHARE_TITLE = '每天吃什么不用愁：营养菜单自动配好，买菜清单一键复制';
export const SHARE_TIMELINE_TITLE = '卡卡家常菜谱：按家里人口自动配每日营养菜单';

function copyFallback(text) {
  uni.setClipboardData({
    data: text,
    success: () => uni.showToast({ title: '已复制，可以粘贴发给家人', icon: 'none' })
  });
}

/**
 * App / H5 端的分享入口。
 * @param {string} summary 分享出去的文案
 */
export function shareBySystem(summary) {
  const text = summary || SHARE_TITLE;

  // #ifdef APP-PLUS
  uni.shareWithSystem({
    summary: text,
    fail: () => copyFallback(text)
  });
  // #endif

  // #ifndef APP-PLUS
  copyFallback(text);
  // #endif
}

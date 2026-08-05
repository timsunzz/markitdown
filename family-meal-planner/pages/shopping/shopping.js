const { menuFromIds } = require('../../utils/planner');
const shopping = require('../../utils/shopping');

/**
 * 采购交互说明：
 * 勾选 = 今天要买。生鲜食材默认全部勾上，家里已有的点一下去掉勾；
 * 常备调味品（料酒、生抽、八角等）默认不勾，需要补货时点一下勾进清单。
 * 「生成清单图片」和「复制」只输出勾选中的食材。
 * 各买菜平台（盒马、奥乐齐、美团买菜、多点等）的搜索框一次只认一样商品，
 * 所以每个条目另有「复制」按钮，只复制这一样的干净搜索词（去掉括号备注）。
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
    return { title: '卡卡家常菜谱：按家里人口自动配每日营养菜单' };
  },

  data: {
    hasMenu: false,
    dateLabel: '',
    memberCount: 0,
    groups: [],
    buyableCount: 0,
    copiedCount: 0,
    totalCost: 0,
    canvasH: 400
  },

  onShow() {
    const current = wx.getStorageSync('currentMenu');
    if (!current || !current.ids) {
      this.setData({ hasMenu: false });
      return;
    }
    const menu = menuFromIds(current.ids);
    const groups = shopping.buildList(menu, current.factor || 1, current.boost || 1);
    // 恢复当日勾选/已复制状态（没记录的条目保持默认：生鲜勾上、调味品不勾）
    const saved = wx.getStorageSync(`shoppingSel:${current.date}`) || {};
    groups.forEach((g) =>
      g.items.forEach((it) => {
        const s = saved[it.name];
        if (s) {
          it.checked = !!s.checked;
          it.copied = !!s.copied;
        }
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
        saved[it.name] = { checked: it.checked, copied: it.copied };
      })
    );
    wx.setStorageSync(`shoppingSel:${this.currentDate}`, saved);
  },

  /** 勾选中的食材（= 今天要买的） */
  selectedItems() {
    const list = [];
    this.data.groups.forEach((g) =>
      g.items.forEach((it) => {
        if (it.checked) list.push(it);
      })
    );
    return list;
  },

  recount() {
    const selected = this.selectedItems();
    this.setData({
      buyableCount: selected.length,
      copiedCount: selected.filter((it) => it.copied).length,
      totalCost: shopping.totalCost(this.data.groups)
    });
    this.saveState();
  },

  /** 点击条目切换勾选（勾上 = 要买；去掉勾 = 家里已有/不买） */
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

  /** 复制勾选清单：把勾选中的食材整单复制 */
  onCopySelected() {
    const selected = this.selectedItems();
    if (!selected.length) {
      wx.showToast({ title: '先勾选要买的食材', icon: 'none' });
      return;
    }
    const text = selected.map((it) => `${it.searchName} ${it.amountText}`).join('\n');
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({
          title: `已复制勾选的 ${selected.length} 样食材`,
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 生成购物清单图片：只画勾选中的食材，
   * 全屏预览后长按即可保存到相册或转发给家人（无需相册授权）。
   */
  onMakeImage() {
    const groups = this.data.groups
      .map((g) => ({
        category: g.category,
        items: g.items.filter((it) => it.checked)
      }))
      .filter((g) => g.items.length);
    const rows = groups.reduce((n, g) => n + g.items.length, 0);
    if (!rows) {
      wx.showToast({ title: '先勾选要买的食材', icon: 'none' });
      return;
    }

    const W = 640;
    const H = 150 + groups.length * 60 + rows * 54 + 100;
    wx.showLoading({ title: '正在生成…' });

    this.setData({ canvasH: H }, () => {
      wx.createSelectorQuery()
        .in(this)
        .select('#listCanvas')
        .fields({ node: true })
        .exec((res) => {
          if (!res || !res[0] || !res[0].node) {
            wx.hideLoading();
            wx.showToast({ title: '生成失败，请重试', icon: 'none' });
            return;
          }
          const canvas = res[0].node;
          const dpr = 2;
          canvas.width = W * dpr;
          canvas.height = H * dpr;
          const ctx = canvas.getContext('2d');
          ctx.scale(dpr, dpr);

          // 背景与顶部色条
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = '#f0592b';
          ctx.fillRect(0, 0, W, 10);

          // 标题与副标题
          ctx.fillStyle = '#33281f';
          ctx.font = 'bold 32px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`${this.data.dateLabel} 买菜清单`, 40, 66);
          ctx.fillStyle = '#9c9084';
          ctx.font = '22px sans-serif';
          ctx.fillText(
            `${this.data.memberCount} 口人 · 共 ${rows} 样 · 预估 ¥${this.data.totalCost}`,
            40,
            102
          );
          ctx.strokeStyle = '#f0e8dc';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(40, 124);
          ctx.lineTo(W - 40, 124);
          ctx.stroke();

          let y = 150;
          groups.forEach((g) => {
            // 分类标题
            ctx.fillStyle = '#f0592b';
            ctx.fillRect(40, y + 6, 6, 24);
            ctx.font = 'bold 24px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(g.category, 58, y + 26);
            y += 60;
            g.items.forEach((it) => {
              // 可打勾的方框
              ctx.strokeStyle = '#d3c7b8';
              ctx.lineWidth = 2.5;
              ctx.strokeRect(44, y - 2, 26, 26);
              // 名称
              ctx.fillStyle = '#33281f';
              ctx.font = '26px sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText(it.name, 88, y + 20);
              // 数量 + 价格（右对齐）
              ctx.fillStyle = '#7d7168';
              ctx.font = '22px sans-serif';
              ctx.textAlign = 'right';
              ctx.fillText(
                `${it.pantry ? '适量' : it.amountText}${it.priceText ? '  ' + it.priceText : ''}`,
                W - 40,
                y + 19
              );
              y += 54;
            });
          });

          // 页脚
          ctx.fillStyle = '#c2b6a9';
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('卡卡家常菜谱 · 价格为参考价', W / 2, H - 40);

          wx.canvasToTempFilePath({
            canvas,
            success: (r) => {
              wx.hideLoading();
              wx.previewImage({ urls: [r.tempFilePath] });
              wx.showToast({
                title: '长按图片可保存或发给家人',
                icon: 'none',
                duration: 2500
              });
            },
            fail: () => {
              wx.hideLoading();
              wx.showToast({ title: '生成失败，请重试', icon: 'none' });
            }
          });
        });
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

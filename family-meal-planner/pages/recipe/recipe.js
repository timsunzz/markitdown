const { byId } = require('../../data/recipes');
const nutrition = require('../../utils/nutrition');
const prices = require('../../data/prices');
const { drawWatermark } = require('../../utils/watermark');

function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') {
    return Math.max(5, Math.round(amount / 5) * 5);
  }
  return Math.max(1, Math.ceil(amount * 2) / 2); // 个/根/片允许半个
}

/** 按固定字数折行（高度预估与绘制使用同一规则，保证不错位） */
function chunkText(str, size) {
  const out = [];
  const s = String(str || '');
  for (let i = 0; i < s.length; i += size) out.push(s.substr(i, size));
  return out.length ? out : [''];
}

Page({
  onShareAppMessage() {
    const rec = this.data.recipe;
    if (!rec) return { title: '卡卡家常菜谱', path: '/pages/index/index' };
    return {
      title: rec.name + '的做法（食材已按人口换算）',
      path: '/pages/recipe/recipe?id=' + rec.id
    };
  },

  onShareTimeline() {
    const rec = this.data.recipe;
    return { title: rec ? rec.name + ' · 家常做法与营养' : '卡卡家常菜谱' };
  },

  data: {
    recipe: null,
    factor: 1,
    memberCount: 0,
    ingredientViews: [],
    familyNutrition: null,
    dishCost: 0,
    isFav: false,
    canvasH: 900
  },

  /**
   * 生成菜谱图片：菜名 + 按全家换算的食材 + 做法 + 营养 + 小贴士，
   * 画成一张竖版长图，全屏预览后长按可保存相册或转发（无需相册授权）。
   */
  onMakeImage() {
    const r = this.data.recipe;
    if (!r) return;
    const W = 640;
    const ings = this.data.ingredientViews;
    const nameLines = chunkText(r.name, 16);
    const stepLines = r.steps.map((s, i) => chunkText(`${i + 1}. ${s}`, 21));
    const tipLines = chunkText('小贴士：' + r.tip, 24);

    // 高度预估（与下方绘制使用相同的行高常数）
    let H = 60; // 顶部
    H += nameLines.length * 46 + 8; // 标题
    H += 36 + 20; // meta 行 + 间距
    H += 52 + ings.length * 40 + 20; // 食材区
    H += 52 + stepLines.reduce((n, ls) => n + ls.length * 34 + 12, 0) + 8; // 做法区
    H += 48; // 营养行
    H += tipLines.length * 32 + 26; // 小贴士
    H += 100; // 品牌水印页脚

    wx.showLoading({ title: '正在生成…' });
    this.setData({ canvasH: H }, () => {
      wx.createSelectorQuery()
        .in(this)
        .select('#recipeCanvas')
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

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = '#f0592b';
          ctx.fillRect(0, 0, W, 10);

          let y = 60;
          // 标题
          ctx.fillStyle = '#33281f';
          ctx.font = 'bold 34px sans-serif';
          ctx.textAlign = 'left';
          nameLines.forEach((ln) => {
            ctx.fillText(ln, 40, y);
            y += 46;
          });
          y += 8;
          // meta
          ctx.fillStyle = '#9c9084';
          ctx.font = '22px sans-serif';
          ctx.fillText(
            `约 ${r.time} 分钟 · 难度${r.difficulty} · 人均 ${r.nutrition.kcal} kcal · 已按 ${this.data.memberCount} 口人换算`,
            40,
            y
          );
          y += 36 + 20;

          const section = (title) => {
            ctx.fillStyle = '#f0592b';
            ctx.fillRect(40, y - 20, 6, 24);
            ctx.font = 'bold 26px sans-serif';
            ctx.fillText(title, 58, y);
            y += 52 - 20;
          };

          // 食材
          section('食材');
          ings.forEach((ing) => {
            ctx.fillStyle = '#33281f';
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(ing.name + (ing.pantry ? '（常备）' : ''), 44, y);
            ctx.fillStyle = '#f0592b';
            ctx.textAlign = 'right';
            ctx.fillText(ing.amountText, W - 40, y);
            ctx.textAlign = 'left';
            y += 40;
          });
          y += 20;

          // 做法
          section('做法');
          ctx.fillStyle = '#33281f';
          ctx.font = '24px sans-serif';
          stepLines.forEach((ls) => {
            ls.forEach((ln, i) => {
              ctx.fillText(ln, i === 0 ? 44 : 74, y);
              y += 34;
            });
            y += 12;
          });
          y += 8;

          // 营养（全家合计）
          const fn = this.data.familyNutrition;
          ctx.fillStyle = '#f0592b';
          ctx.font = '22px sans-serif';
          ctx.fillText(
            `全家合计：能量 ${fn.kcal} kcal · 蛋白质 ${fn.protein}g · 钙 ${fn.calcium}mg · 铁 ${fn.iron}mg`,
            40,
            y
          );
          y += 48;

          // 小贴士
          ctx.fillStyle = '#7d7168';
          ctx.font = '22px sans-serif';
          tipLines.forEach((ln) => {
            ctx.fillText(ln, 40, y);
            y += 32;
          });

          // 品牌水印
          drawWatermark(ctx, W, H - 85);

          wx.canvasToTempFilePath({
            canvas,
            success: (out) => {
              wx.hideLoading();
              wx.previewImage({ urls: [out.tempFilePath] });
              wx.showToast({ title: '长按图片可保存或转发', icon: 'none', duration: 2500 });
            },
            fail: () => {
              wx.hideLoading();
              wx.showToast({ title: '生成失败，请重试', icon: 'none' });
            }
          });
        });
    });
  },

  /** 收藏 / 取消收藏（存本地，无需登录） */
  onToggleFav() {
    const id = this.data.recipe.id;
    let ids = wx.getStorageSync('favorites') || [];
    const has = ids.indexOf(id) >= 0;
    ids = has ? ids.filter((x) => x !== id) : ids.concat(id);
    wx.setStorageSync('favorites', ids);
    this.setData({ isFav: !has });
    wx.showToast({ title: has ? '已取消收藏' : '已收藏，可在"我的家庭"里查看', icon: 'none' });
  },

  onLoad(options) {
    const recipe = byId(options.id);
    if (!recipe) {
      wx.showToast({ title: '菜谱不存在', icon: 'none' });
      wx.navigateBack();
      return;
    }

    const members = wx.getStorageSync('familyMembers') || [];
    const summary = nutrition.familySummary(members);
    // 小家庭模式下午晚餐每道菜份量加大（与今日菜单/购物清单保持一致）
    const current = wx.getStorageSync('currentMenu') || {};
    const boost = recipe.type === 'breakfast' ? 1 : current.boost || 1;
    const factor = (summary.factor || 1) * boost;

    this.setData({
      recipe,
      firstChar: recipe.name.charAt(0),
      isFav: (wx.getStorageSync('favorites') || []).indexOf(recipe.id) >= 0,
      factor: Math.round(factor * 10) / 10,
      memberCount: members.length,
      ingredientViews: recipe.ingredients.map((ing) => {
        const price = ing.pantry
          ? 0
          : Math.round(prices.priceFor(ing.name, ing.amount * factor) * 10) / 10;
        return {
          name: ing.name,
          note: ing.note || '',
          pantry: !!ing.pantry,
          priceText: price ? `约¥${price}` : '',
          amountText:
            ing.unit === '适量' ? '适量' : `${roundAmount(ing.amount * factor, ing.unit)}${ing.unit}`
        };
      }),
      dishCost: prices.dishCost(recipe, factor),
      familyNutrition: {
        kcal: Math.round(recipe.nutrition.kcal * factor),
        protein: Math.round(recipe.nutrition.protein * factor),
        calcium: Math.round(recipe.nutrition.calcium * factor),
        iron: Math.round(recipe.nutrition.iron * 10 * factor) / 10
      }
    });

    wx.setNavigationBarTitle({ title: recipe.name });
  }
});

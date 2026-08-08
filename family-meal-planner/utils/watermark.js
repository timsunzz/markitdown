/**
 * 品牌水印：在 Canvas 图片底部绘制「卡卡家常菜谱」标识，防止内容盗用。
 * 由购物清单图片和菜谱卡片图片共用。
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} W     画布宽度（用于居中）
 * @param {number} footY 水印区域顶部 y（建议 H - 85）
 * @param {string} [sub] 附加小字（如"价格为参考价"）
 */
function drawWatermark(ctx, W, footY, sub) {
  var cx = W / 2;
  var r = 16;
  var blockW = r * 2 + 8 + 132;
  var blockX = cx - blockW / 2;
  var iconCX = blockX + r;
  var textX = blockX + r * 2 + 8;
  var cy = footY + 38;

  // 两侧装饰线
  ctx.strokeStyle = '#e5d9cc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, cy);
  ctx.lineTo(blockX - 16, cy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(blockX + blockW + 16, cy);
  ctx.lineTo(W - 50, cy);
  ctx.stroke();

  // 蒸汽弧线（轻透明）
  ctx.save();
  ctx.strokeStyle = '#f0592b';
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.moveTo(iconCX - 5, cy - r - 4);
  ctx.quadraticCurveTo(iconCX - 9, cy - r - 11, iconCX - 4, cy - r - 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(iconCX + 4, cy - r - 3);
  ctx.quadraticCurveTo(iconCX + 8, cy - r - 10, iconCX + 3, cy - r - 17);
  ctx.stroke();
  ctx.restore();

  // 番茄橙圆形图标
  ctx.beginPath();
  ctx.arc(iconCX, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#f0592b';
  ctx.fill();

  // 圆内「卡」字
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('卡', iconCX, cy + 7);

  // 品牌名
  ctx.fillStyle = '#9c9084';
  ctx.font = '22px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('卡卡家常菜谱', textX, cy + 7);

  // 附加小字
  if (sub) {
    ctx.fillStyle = '#c2b6a9';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sub, cx, cy + 30);
  }

  ctx.textAlign = 'left';
}

module.exports = { drawWatermark };

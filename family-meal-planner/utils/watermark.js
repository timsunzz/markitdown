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
  var r = 17;
  var blockW = r * 2 + 10 + 132;
  var blockX = cx - blockW / 2;
  var iconCX = blockX + r;
  var textX = blockX + r * 2 + 10;
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

  // 番茄橙圆形底色
  ctx.beginPath();
  ctx.arc(iconCX, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#f0592b';
  ctx.fill();

  // 圆内白色碗形图案（U 形弧 + 碗沿）
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(iconCX - 9, cy + 1);
  ctx.quadraticCurveTo(iconCX - 9, cy + 11, iconCX, cy + 11);
  ctx.quadraticCurveTo(iconCX + 9, cy + 11, iconCX + 9, cy + 1);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(iconCX - 11, cy + 1);
  ctx.lineTo(iconCX + 11, cy + 1);
  ctx.stroke();

  // 碗上方三缕蒸汽
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(iconCX - 4, cy - 2);
  ctx.quadraticCurveTo(iconCX - 7, cy - 6, iconCX - 3, cy - 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(iconCX, cy - 3);
  ctx.quadraticCurveTo(iconCX + 3, cy - 7, iconCX - 1, cy - 11);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(iconCX + 4, cy - 2);
  ctx.quadraticCurveTo(iconCX + 7, cy - 6, iconCX + 3, cy - 10);
  ctx.stroke();

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

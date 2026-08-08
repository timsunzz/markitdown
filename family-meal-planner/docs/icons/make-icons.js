/**
 * 生成微信小程序头像候选方案（SVG → HTML，供 Chromium 截图成 PNG）
 * 品牌色：墨绿 #2e7d5b / 暖琥珀 #e08a00 / 奶油 #f6f0e4
 */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;

/** 方案 1：营养餐盘（墨绿底 + 白盘 + 营养分区） */
const design1 = `
<defs>
  <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#3a9a71"/>
    <stop offset="1" stop-color="#215a41"/>
  </linearGradient>
</defs>
<rect width="144" height="144" fill="url(#bg1)"/>
<!-- 盘子 -->
<circle cx="72" cy="72" r="47" fill="#ffffff" opacity="0.18"/>
<circle cx="72" cy="72" r="42" fill="#fffdf8"/>
<!-- 营养分区：上半绿叶菜、左下主食、右下蛋白质 -->
<g stroke="#fffdf8" stroke-width="3.5" stroke-linejoin="round">
  <path d="M72 72 L36 72 A36 36 0 0 1 108 72 Z" fill="#5cb98c"/>
  <path d="M72 72 L36 72 A36 36 0 0 0 72 108 Z" fill="#f4e3c0"/>
  <path d="M72 72 L72 108 A36 36 0 0 0 108 72 Z" fill="#e8a33c"/>
</g>
<circle cx="72" cy="72" r="6" fill="#fffdf8"/>
`;

/** 方案 2：治愈系暖碗（奶油底 + 墨绿碗 + 蒸汽） */
const design2 = `
<rect width="144" height="144" fill="#f7f1e5"/>
<!-- 蒸汽 -->
<g stroke="#2e7d5b" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.32">
  <path d="M55 48 q7 -9 0 -18 q-7 -9 0 -16"/>
  <path d="M72 42 q7 -9 0 -18 q-7 -9 0 -16"/>
  <path d="M89 48 q7 -9 0 -18 q-7 -9 0 -16"/>
</g>
<!-- 食物 -->
<path d="M40 84 Q72 54 104 84 Z" fill="#e8a33c"/>
<path d="M58 72 q9 -12 20 -5 q-8 11 -20 5 Z" fill="#5cb98c"/>
<!-- 碗 -->
<path d="M24 82 L120 82 Q118 120 72 123 Q26 120 24 82 Z" fill="#2e7d5b"/>
<rect x="22" y="78" width="100" height="8" rx="4" fill="#25664a"/>
`;

/** 方案 3：一碗一筷（墨绿底 + 白碗 + 琥珀筷） */
const design3 = `
<defs>
  <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#38966d"/>
    <stop offset="1" stop-color="#1f5540"/>
  </linearGradient>
</defs>
<rect width="144" height="144" fill="url(#bg3)"/>
<!-- 筷子 -->
<g stroke="#eda93f" stroke-width="6" stroke-linecap="round">
  <path d="M92 26 L118 60"/>
  <path d="M105 20 L128 52"/>
</g>
<!-- 食物 -->
<path d="M40 86 Q72 58 104 86 Z" fill="#eda93f"/>
<path d="M57 76 q9 -11 20 -4 q-8 10 -20 4 Z" fill="#7fd0a5"/>
<!-- 碗 -->
<path d="M24 84 L120 84 Q118 122 72 125 Q26 122 24 84 Z" fill="#fffdf8"/>
<rect x="22" y="80" width="100" height="8" rx="4" fill="#efe7d6"/>
`;

/** 方案 4：营养环（奶油底 + 三色营养环 + 中心碗） */
const design4 = `
<rect width="144" height="144" fill="#f7f1e5"/>
<g fill="none" stroke-width="11" stroke-linecap="round">
  <path d="M72 20 A52 52 0 0 1 116.8 98" stroke="#2e7d5b"/>
  <path d="M116.8 98 A52 52 0 0 1 27.2 98" stroke="#e8a33c"/>
  <path d="M27.2 98 A52 52 0 0 1 72 20" stroke="#8fcfae"/>
</g>
<!-- 中心碗 -->
<path d="M44 74 Q72 56 100 74 Z" fill="#e8a33c" opacity="0.9"/>
<path d="M40 72 L104 72 Q102 100 72 102 Q42 100 40 72 Z" fill="#2e7d5b"/>
<rect x="38" y="69" width="68" height="7" rx="3.5" fill="#25664a"/>
`;

const designs = [
  { name: 'icon-1-营养餐盘', svg: design1 },
  { name: 'icon-2-治愈暖碗', svg: design2 },
  { name: 'icon-3-一碗一筷', svg: design3 },
  { name: 'icon-4-营养环', svg: design4 }
];

designs.forEach((d) => {
  [144, 512].forEach((size) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden}
      svg{display:block}
    </style></head><body>
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 144 144">${d.svg}</svg>
    </body></html>`;
    fs.writeFileSync(path.join(DIR, `${d.name}-${size}.html`), html);
  });
});

console.log('已生成', designs.length * 2, '个渲染页');

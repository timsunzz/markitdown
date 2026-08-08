/**
 * 写实渲染感头像方案：真实光影、陶瓷材质、投影与景深
 * 光源统一来自左上方（与美食摄影的窗边侧光一致）
 */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;

/* ---------- 共用材质定义 ---------- */
const defs = `
<defs>
  <!-- 暖木桌面，左上受光 -->
  <radialGradient id="table" cx="0.3" cy="0.2" r="1.05">
    <stop offset="0"    stop-color="#f6e8d0"/>
    <stop offset="0.45" stop-color="#e5cdab"/>
    <stop offset="0.8"  stop-color="#c9a882"/>
    <stop offset="1"    stop-color="#a8855f"/>
  </radialGradient>
  <!-- 深色石板背景 -->
  <radialGradient id="slate" cx="0.32" cy="0.18" r="1.05">
    <stop offset="0"    stop-color="#4e6f5c"/>
    <stop offset="0.5"  stop-color="#31503f"/>
    <stop offset="1"    stop-color="#1a2f24"/>
  </radialGradient>
  <!-- 陶瓷碗身：左上高光 → 右下暗部 -->
  <linearGradient id="ceramic" x1="0.12" y1="0.05" x2="0.88" y2="1">
    <stop offset="0"    stop-color="#ffffff"/>
    <stop offset="0.28" stop-color="#faf6ee"/>
    <stop offset="0.62" stop-color="#e6dccc"/>
    <stop offset="0.85" stop-color="#c6b9a4"/>
    <stop offset="1"    stop-color="#a89a83"/>
  </linearGradient>
  <!-- 墨绿釉碗身 -->
  <linearGradient id="glaze" x1="0.12" y1="0.05" x2="0.88" y2="1">
    <stop offset="0"    stop-color="#5aa886"/>
    <stop offset="0.3"  stop-color="#3d8a67"/>
    <stop offset="0.7"  stop-color="#2a6a4d"/>
    <stop offset="1"    stop-color="#194533"/>
  </linearGradient>
  <!-- 碗内壁：口沿暗、底部亮（环境光反弹） -->
  <linearGradient id="inner" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0"   stop-color="#7d7263"/>
    <stop offset="0.5" stop-color="#a99c88"/>
    <stop offset="1"   stop-color="#d6cbb8"/>
  </linearGradient>
  <linearGradient id="innerGlaze" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0"   stop-color="#123527"/>
    <stop offset="1"   stop-color="#2c6b4f"/>
  </linearGradient>
  <!-- 米饭：颗粒感高光 -->
  <radialGradient id="rice" cx="0.34" cy="0.16" r="0.95">
    <stop offset="0"   stop-color="#fffefa"/>
    <stop offset="0.45" stop-color="#f8f2e4"/>
    <stop offset="0.8" stop-color="#e6dac2"/>
    <stop offset="1"   stop-color="#cbbb9c"/>
  </radialGradient>
  <!-- 西兰花 -->
  <radialGradient id="broc" cx="0.3" cy="0.2" r="0.9">
    <stop offset="0"   stop-color="#8fd6a4"/>
    <stop offset="0.5" stop-color="#57ab74"/>
    <stop offset="1"   stop-color="#2e7048"/>
  </radialGradient>
  <!-- 胡萝卜 / 红烧肉 -->
  <radialGradient id="carrot" cx="0.32" cy="0.22" r="0.9">
    <stop offset="0"   stop-color="#ffc978"/>
    <stop offset="0.5" stop-color="#ef9a3a"/>
    <stop offset="1"   stop-color="#c56d1c"/>
  </radialGradient>
  <radialGradient id="meat" cx="0.3" cy="0.2" r="0.9">
    <stop offset="0"   stop-color="#c98052"/>
    <stop offset="0.55" stop-color="#a35c31"/>
    <stop offset="1"   stop-color="#6f381a"/>
  </radialGradient>

  <filter id="shadow" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="5"/>
  </filter>
  <filter id="tight" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="1.6"/>
  </filter>
  <filter id="steam" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="3"/>
  </filter>
  <!-- 细微颗粒质感 -->
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
  </filter>
  <clipPath id="sq"><rect width="144" height="144"/></clipPath>
</defs>`;

/* 一碗饭菜：3/4 视角，写实光影
   bg: 背景 id, body: 碗身渐变 id, innerId: 内壁渐变 id */
function bowlScene(bg, body, innerId, steamColor) {
  return `
<rect width="144" height="144" fill="url(#${bg})"/>
<!-- 桌面颗粒 -->
<rect width="144" height="144" filter="url(#grain)" opacity="0.09" clip-path="url(#sq)"/>

<!-- 落在桌面的投影 -->
<ellipse cx="76" cy="121" rx="47" ry="10.5" fill="#4a2f18" opacity="0.34" filter="url(#shadow)"/>

<!-- 碗口：外沿 + 内壁 -->
<ellipse cx="72" cy="66" rx="45" ry="14.5" fill="url(#${body})"/>
<ellipse cx="72" cy="67.5" rx="39.5" ry="11.6" fill="url(#${innerId})"/>

<!-- 碗里的饭菜（堆出高度） -->
<path d="M34.5 66 C40 41, 104 41, 109.5 66 C100 76, 44 76, 34.5 66 Z" fill="url(#rice)"/>
<!-- 米饭颗粒：前坡可见，越靠下越密 -->
<g fill="#fffefa" opacity="0.85">
  <ellipse cx="46" cy="63" rx="3.4" ry="1.7" transform="rotate(24 46 63)"/>
  <ellipse cx="54" cy="66" rx="3.2" ry="1.6" transform="rotate(-12 54 66)"/>
  <ellipse cx="63" cy="64" rx="3.5" ry="1.7" transform="rotate(8 63 64)"/>
  <ellipse cx="73" cy="67" rx="3.3" ry="1.6" transform="rotate(-20 73 67)"/>
  <ellipse cx="82" cy="65" rx="3.4" ry="1.7" transform="rotate(16 82 65)"/>
  <ellipse cx="92" cy="62" rx="3.2" ry="1.6" transform="rotate(-8 92 62)"/>
  <ellipse cx="100" cy="59" rx="3" ry="1.5" transform="rotate(28 100 59)"/>
  <ellipse cx="40" cy="59" rx="3" ry="1.5" transform="rotate(-26 40 59)"/>
</g>
<g fill="#cdbb99" opacity="0.5">
  <ellipse cx="50" cy="66" rx="3" ry="1.4" transform="rotate(-16 50 66)"/>
  <ellipse cx="68" cy="63" rx="3" ry="1.4" transform="rotate(20 68 63)"/>
  <ellipse cx="87" cy="68" rx="2.8" ry="1.3" transform="rotate(-10 87 68)"/>
</g>
<!-- 配菜：西兰花（多朵小花） -->
<g>
  <ellipse cx="50" cy="50" rx="9" ry="7" fill="url(#broc)"/>
  <ellipse cx="44" cy="46" rx="5" ry="4.2" fill="url(#broc)"/>
  <ellipse cx="52" cy="43.5" rx="5.4" ry="4.4" fill="url(#broc)"/>
  <ellipse cx="58" cy="47" rx="4.4" ry="3.6" fill="url(#broc)"/>
  <ellipse cx="45" cy="44.5" rx="2.3" ry="1.6" fill="#b7ecc6" opacity="0.8"/>
  <ellipse cx="53" cy="42" rx="2" ry="1.4" fill="#b7ecc6" opacity="0.65"/>
  <path d="M50 55 q3 4 8 3" stroke="#2e7048" stroke-width="1.6" fill="none" opacity="0.5"/>
</g>
<!-- 配菜：红烧肉两块，带油亮反光 -->
<g>
  <ellipse cx="88" cy="49" rx="10" ry="7.6" fill="url(#meat)"/>
  <ellipse cx="84.5" cy="45.5" rx="3.8" ry="2.2" fill="#eab188" opacity="0.7"/>
  <ellipse cx="79" cy="53" rx="7.4" ry="5.6" fill="url(#meat)"/>
  <ellipse cx="76.5" cy="50.5" rx="2.8" ry="1.6" fill="#eab188" opacity="0.6"/>
</g>
<!-- 配菜：胡萝卜片 + 青豆 -->
<g>
  <ellipse cx="68" cy="52" rx="6.4" ry="4.6" fill="url(#carrot)"/>
  <ellipse cx="66" cy="50" rx="2.4" ry="1.4" fill="#ffdca8" opacity="0.8"/>
  <ellipse cx="97" cy="56" rx="5" ry="3.6" fill="url(#carrot)"/>
  <ellipse cx="96" cy="54.6" rx="1.9" ry="1.1" fill="#ffdca8" opacity="0.7"/>
  <circle cx="62" cy="58" r="3" fill="#6fbe86"/>
  <circle cx="61.2" cy="57" r="1.1" fill="#b7ecc6" opacity="0.8"/>
  <circle cx="90" cy="59" r="2.7" fill="#6fbe86"/>
  <circle cx="89.3" cy="58.1" r="1" fill="#b7ecc6" opacity="0.7"/>
</g>
<!-- 葱花点缀 -->
<g fill="#4f9e5f" opacity="0.9">
  <ellipse cx="72" cy="45" rx="2" ry="1.2" transform="rotate(30 72 45)"/>
  <ellipse cx="60" cy="53" rx="1.8" ry="1.1" transform="rotate(-25 60 53)"/>
  <ellipse cx="95" cy="49" rx="1.9" ry="1.1" transform="rotate(15 95 49)"/>
</g>

<!-- 碗前壁（遮住下半内壁） -->
<path d="M27 66
         A45 14.5 0 0 0 117 66
         C117 98, 101 124, 72 124
         C43 124, 27 98, 27 66 Z" fill="url(#${body})"/>
<!-- 碗前壁底部环境光 -->
<path d="M34 96 C44 118, 100 118, 110 96 C100 120, 44 120, 34 96 Z" fill="#ffffff" opacity="0.14"/>
<!-- 口沿高光（左上受光的一段） -->
<path d="M30 62 A45 14.5 0 0 1 74 52" stroke="#ffffff" stroke-width="2.6"
      fill="none" opacity="0.75" stroke-linecap="round" filter="url(#tight)"/>
<!-- 碗身左侧长高光 -->
<path d="M36 74 C34 92, 42 108, 54 116" stroke="#ffffff" stroke-width="4"
      fill="none" opacity="0.3" stroke-linecap="round" filter="url(#tight)"/>

<!-- 蒸汽 -->
<g stroke="${steamColor}" stroke-width="4.5" fill="none" stroke-linecap="round"
   opacity="0.5" filter="url(#steam)">
  <path d="M56 32 q7 -8 0 -15 q-7 -8 0 -14"/>
  <path d="M74 26 q7 -8 0 -15 q-7 -8 0 -13"/>
  <path d="M91 33 q6 -8 0 -14"/>
</g>`;
}

/* 俯视餐盘：写实陶瓷 + 三样菜 */
const platter = `
<rect width="144" height="144" fill="url(#table)"/>
<rect width="144" height="144" filter="url(#grain)" opacity="0.1" clip-path="url(#sq)"/>
<!-- 盘子投影 -->
<ellipse cx="74" cy="78" rx="52" ry="50" fill="#4a2f18" opacity="0.3" filter="url(#shadow)"/>
<!-- 盘子 -->
<circle cx="72" cy="72" r="52" fill="url(#ceramic)"/>
<circle cx="72" cy="72" r="43" fill="#fffdf8"/>
<circle cx="72" cy="72" r="43" fill="url(#inner)" opacity="0.18"/>
<!-- 盘沿高光 -->
<path d="M32 44 A52 52 0 0 1 96 25" stroke="#ffffff" stroke-width="3.5" fill="none"
      opacity="0.85" stroke-linecap="round" filter="url(#tight)"/>
<!-- 米饭（左下） -->
<ellipse cx="55" cy="90" rx="24" ry="18" fill="url(#rice)"/>
<g fill="#fffdf6" opacity="0.5">
  <ellipse cx="48" cy="84" rx="4" ry="2.3" transform="rotate(-15 48 84)"/>
  <ellipse cx="60" cy="88" rx="3.6" ry="2.1" transform="rotate(15 60 88)"/>
  <ellipse cx="52" cy="95" rx="3.8" ry="2.2"/>
</g>
<!-- 绿叶菜（上方） -->
<g>
  <ellipse cx="72" cy="48" rx="22" ry="15" fill="url(#broc)"/>
  <ellipse cx="60" cy="43" rx="8" ry="6.5" fill="url(#broc)"/>
  <ellipse cx="82" cy="42" rx="9" ry="7" fill="url(#broc)"/>
  <ellipse cx="62" cy="41" rx="3.4" ry="2.2" fill="#b3e8c2" opacity="0.7"/>
  <ellipse cx="80" cy="40" rx="3" ry="2" fill="#b3e8c2" opacity="0.6"/>
</g>
<!-- 红烧肉 + 胡萝卜（右下） -->
<g>
  <ellipse cx="95" cy="92" rx="15" ry="12" fill="url(#meat)"/>
  <ellipse cx="90" cy="87" rx="5" ry="3" fill="#e0a06f" opacity="0.55"/>
  <ellipse cx="84" cy="102" rx="8" ry="6" fill="url(#carrot)"/>
  <ellipse cx="82" cy="100" rx="3" ry="1.9" fill="#ffd79a" opacity="0.65"/>
</g>`;

const designs = [
  { name: 'r1-暖木一碗饭', svg: bowlScene('table', 'ceramic', 'inner', '#ffffff') },
  { name: 'r2-墨绿釉碗', svg: bowlScene('slate', 'glaze', 'innerGlaze', '#ffffff') },
  { name: 'r3-俯视餐盘', svg: platter }
];

designs.forEach((d) => {
  [144, 512].forEach((size) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      html,body{margin:0;padding:0;width:${size}px;height:${size}px;overflow:hidden;background:transparent}
      svg{display:block}</style></head><body>
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 144 144">${defs}${d.svg}</svg>
      </body></html>`;
    fs.writeFileSync(path.join(DIR, `${d.name}-${size}.html`), html);
  });
});
console.log('生成', designs.length * 2, '个渲染页');

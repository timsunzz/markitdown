/**
 * 卡卡家常菜谱 · PDF 生成器
 *
 * 输出：手机竖版（430×932px，iPhone 逻辑分辨率）一页一道菜的菜谱大全 PDF。
 * 食材用量按【2 人份】写好（营养值为人均，不乘）。
 * 配图位留白，日后把真实照片塞进 PHOTOS 映射即可原样重出。
 */
const fs = require('fs');
const path = require('path');

const APP = path.resolve(__dirname, '../..');
const SCRATCH = process.env.OUT_DIR || path.resolve(__dirname, 'out');
const FONTDIR = process.env.FONT_DIR ||
  path.resolve(__dirname, 'node_modules/@fontsource/noto-sans-sc/files');

const { RECIPES } = require(APP + '/data/recipes');
const { emojiFor } = require(APP + '/data/covers');

/** 日后填真实照片：{ 菜谱id: '图片文件绝对路径或 data URI' } */
const PHOTOS = (() => {
  const f = path.join(SCRATCH, 'photos.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
})();

const SERVINGS = 2; // 两口之家

// ---------- 分类定义（用户指定顺序：荤 素 汤 主食 早餐）----------
const SECTIONS = [
  { type: 'meat', label: '荤菜', sub: '有肉才叫吃饭', color: '#d4482a', tint: '#fdeeea', emoji: '🍖' },
  { type: 'veg', label: '素菜', sub: '清清爽爽配一口', color: '#6f8f36', tint: '#f0f5e6', emoji: '🥬' },
  { type: 'soup', label: '汤羹', sub: '一碗热汤暖全家', color: '#c8862f', tint: '#fdf3e2', emoji: '🍲' },
  { type: 'staple', label: '主食', sub: '扎扎实实吃饱', color: '#a9764a', tint: '#f7efe6', emoji: '🍚' },
  { type: 'breakfast', label: '早餐', sub: '一天从吃好开始', color: '#e8813c', tint: '#fdf0e6', emoji: '🥣' }
];

// ---------- 工具 ----------
const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 与小程序 recipe.js 同一套取整规则 */
function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') return Math.max(5, Math.round(amount / 5) * 5);
  return Math.max(1, Math.ceil(amount * 2) / 2);
}

function amountText(ing) {
  if (ing.unit === '适量' || !ing.amount) return '适量';
  return roundAmount(ing.amount * SERVINGS, ing.unit) + ing.unit;
}

// ---------- 字体（内联 base64，保证 PDF 不掉字）----------
function fontFace(family, file, weight) {
  const p = path.join(FONTDIR, file);
  const b64 = fs.readFileSync(p).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
}
const WEIGHTS = [400, 500, 700, 900];
const FONT_CSS =
  WEIGHTS.map((w) => fontFace('KKLatin', `noto-sans-sc-latin-${w}-normal.woff2`, w)).join('') +
  WEIGHTS.map((w) => fontFace('KKHans', `noto-sans-sc-chinese-simplified-${w}-normal.woff2`, w)).join('');

// ---------- 品牌 logo（碗 + 蒸汽，与小程序水印同款）----------
const LOGO = (cls) => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">
<circle cx="50" cy="50" r="50" fill="#f0592b"/>
<path d="M30 49c0 14 9 22 20 22s20-8 20-22z" fill="#fff"/>
<rect x="19" y="44" width="62" height="6.5" rx="3.25" fill="#fff"/>
<path d="M38 38c-4.5-5.5 2-9-1.5-14.5M50 36c-4.5-5.5 3.5-10 0-15.5M62 38c-4.5-5.5 2-9-1.5-14.5" stroke="#fff" stroke-width="4.2" stroke-linecap="round" fill="none"/>
</svg>`;

// ---------- 组织数据 ----------
const grouped = SECTIONS.map((s) => ({
  ...s,
  list: RECIPES.filter((r) => r.type === s.type)
}));

// 先排页码：封面1 说明2 总目录3 →（每章：扉页 + 目录页 + 菜谱页）→ 结尾页
const PER_INDEX_PAGE = 60; // 2 栏 × 30 行
let cursor = 3; // 封面/说明/总目录
grouped.forEach((g) => {
  g.dividerPage = ++cursor;
  g.indexPages = Math.ceil(g.list.length / PER_INDEX_PAGE);
  g.indexStart = cursor + 1;
  cursor += g.indexPages;
  g.firstRecipePage = cursor + 1;
  g.list.forEach((r) => {
    r._page = ++cursor;
  });
  g.lastRecipePage = cursor;
});
const OUTRO_PAGE = ++cursor;
const TOTAL_PAGES = cursor;

// ---------- 各页 HTML ----------
function coverPage() {
  const counts = grouped.map((g) => `<div class="cc"><b style="color:${g.color}">${g.list.length}</b><span>${g.label}</span></div>`).join('');
  return `<section class="page cover">
  <div class="cv-glow"></div>
  <div class="cv-top">${LOGO('cv-logo')}<div class="cv-brand">卡卡家常菜谱</div></div>
  <div class="cv-mid">
    <div class="cv-kicker">写给每天都要开火的普通家庭</div>
    <h1 class="cv-title">家常菜<br>全收录</h1>
    <div class="cv-num"><b>${RECIPES.length}</b><span>道</span></div>
    <div class="cv-line"></div>
    <p class="cv-desc">每道菜都标好了两人份的用量、做法步骤和营养数据<br>照着买、照着做就行</p>
  </div>
  <div class="cv-counts">${counts}</div>
  <div class="cv-foot">今天吃什么 · 不用再想了</div>
</section>`;
}

function howtoPage() {
  const rows = [
    ['🍲', '用量按 2 人份写好', '所有食材数量已经按两口之家换算完毕，直接照着买。三口之家在此基础上多加一半，四口翻倍。'],
    ['🔥', '营养数据是「人均」', '每道菜标的热量、蛋白质、钙、铁，都是<b>一个人吃到的量</b>，不是一锅的总量。'],
    ['⏰', '时间是实际操作时间', '不含腌制、泡发等待的时间，那些会写在步骤里。'],
    ['🌶️', '带辣椒图标的菜偏辣', '家里有小孩或不吃辣，把辣椒减半或直接去掉，不影响成菜。'],
    ['🥄', '标「常备」的调味品不用买', '生抽、料酒、盐、糖这些家里都有，清单里不重复列。'],
    ['💡', '每道菜末尾有小贴士', '都是真正会翻车的地方，做之前扫一眼能少踩坑。']
  ];
  return `<section class="page plain">
  <div class="pl-head"><span class="pl-eyebrow">开始之前</span><h2 class="pl-title">这本菜谱怎么用</h2></div>
  <div class="ht-list">
    ${rows.map((r) => `<div class="ht-row"><div class="ht-ic">${r[0]}</div><div class="ht-tx"><b>${r[1]}</b><p>${r[2]}</p></div></div>`).join('')}
  </div>
  <div class="ht-note">${LOGO('ht-logo')}<p>全部菜谱来自「卡卡家常菜谱」微信小程序<br>小程序能按你家人口自动配一日三餐、自动生成买菜清单</p></div>
</section>`;
}

function tocPage() {
  const rows = grouped
    .map(
      (g) => `<div class="toc-row">
      <div class="toc-em" style="background:${g.tint}">${g.emoji}</div>
      <div class="toc-mid"><b>${g.label}</b><span>${g.sub}</span></div>
      <div class="toc-rt"><b style="color:${g.color}">${g.list.length}</b><span>道</span><i>P${g.firstRecipePage}</i></div>
    </div>`
    )
    .join('');
  return `<section class="page plain">
  <div class="pl-head"><span class="pl-eyebrow">目录</span><h2 class="pl-title">全书分五章</h2></div>
  <div class="toc-list">${rows}</div>
  <div class="toc-sum"><b>${RECIPES.length}</b> 道菜 · 共 ${TOTAL_PAGES} 页<br><span>每章开头有本章完整菜单，可按菜名查页码</span></div>
</section>`;
}

function dividerPage(g, idx) {
  return `<section class="page divider" style="--c:${g.color};--t:${g.tint}">
  <div class="dv-no">${String(idx + 1).padStart(2, '0')}</div>
  <div class="dv-em">${g.emoji}</div>
  <h2 class="dv-title">${g.label}</h2>
  <div class="dv-sub">${g.sub}</div>
  <div class="dv-bar"></div>
  <div class="dv-count">共 <b>${g.list.length}</b> 道 · P${g.firstRecipePage}–${g.lastRecipePage}</div>
</section>`;
}

function indexPages(g) {
  const pages = [];
  for (let i = 0; i < g.indexPages; i++) {
    const slice = g.list.slice(i * PER_INDEX_PAGE, (i + 1) * PER_INDEX_PAGE);
    const half = Math.ceil(slice.length / 2);
    const col = (arr) =>
      `<ul class="ix-col">${arr
        .map(
          (r) =>
            `<li><span class="ix-nm">${esc(r.name)}${r.badge ? '<i class="ix-hb">♥</i>' : ''}${r.spicy ? '<i class="ix-sp">🌶</i>' : ''}</span><span class="ix-dot"></span><span class="ix-pg">${r._page}</span></li>`
        )
        .join('')}</ul>`;
    pages.push(`<section class="page plain ix" style="--c:${g.color}">
    <div class="pl-head"><span class="pl-eyebrow" style="color:${g.color}">${g.label}目录${g.indexPages > 1 ? ` ${i + 1}/${g.indexPages}` : ''}</span><h2 class="pl-title">本章 ${g.list.length} 道菜</h2></div>
    <div class="ix-wrap">${col(slice.slice(0, half))}${col(slice.slice(half))}</div>
    ${footer(g.indexStart + i)}
  </section>`);
  }
  return pages.join('');
}

function footer(pageNo) {
  return `<div class="ft">${LOGO('ft-logo')}<span class="ft-brand">卡卡家常菜谱</span><span class="ft-pg">${pageNo}</span></div>`;
}

function recipePage(r, g, indexInSection) {
  const ings = r.ingredients || [];
  const photo = PHOTOS[r.id];
  const tags = (r.tags || []).slice(0, 3);
  const n = r.nutrition || {};

  const photoBox = photo
    ? `<div class="ph has"><img src="${esc(photo)}" alt=""></div>`
    : `<div class="ph" data-id="${esc(r.id)}"><div class="ph-em">${emojiFor(r)}</div><div class="ph-tip">配图位</div></div>`;

  return `<section class="page recipe" style="--c:${g.color};--t:${g.tint}">
  <div class="rc-head">
    <span class="rc-pill">${g.label}</span>
    ${r.badge ? `<span class="rc-badge">♥ ${esc(r.badge)}</span>` : ''}
    ${r.spicy ? '<span class="rc-spicy"><i class="emo">🌶</i> 偏辣</span>' : ''}
    <span class="rc-no">No.${String(indexInSection + 1).padStart(3, '0')}</span>
  </div>

  <h3 class="rc-title">${esc(r.name)}</h3>
  ${tags.length ? `<div class="rc-tags">${tags.map((t) => `<span>#${esc(t)}</span>`).join('')}</div>` : ''}

  ${photoBox}

  <div class="rc-meta">
    <div><b>${r.time}</b><span>分钟</span></div><i></i>
    <div><b>${esc(r.difficulty)}</b><span>难度</span></div><i></i>
    <div><b>${n.kcal || 0}</b><span>千卡/人</span></div>
  </div>

  <div class="rc-sec"><span class="rc-bar"></span>食材<em>2 人份</em></div>
  <ul class="rc-ings${ings.length >= 9 ? ' two' : ''}">
    ${ings
      .map(
        (ing) =>
          `<li><span class="ig-n">${esc(ing.name)}${ing.pantry ? '<i>常备</i>' : ''}</span><span class="ig-d"></span><span class="ig-a">${esc(amountText(ing))}</span></li>`
      )
      .join('')}
  </ul>

  <div class="rc-sec"><span class="rc-bar"></span>做法</div>
  <ol class="rc-steps">
    ${(r.steps || []).map((s) => `<li><span class="st-n"></span><p>${esc(s)}</p></li>`).join('')}
  </ol>

  ${r.tip ? `<div class="rc-tip"><span>💡</span><p>${esc(r.tip)}</p></div>` : ''}

  <div class="rc-fill"></div>

  <div class="rc-nut">
    <div><b>${n.protein || 0}</b><span>蛋白 g</span></div>
    <div><b>${n.calcium || 0}</b><span>钙 mg</span></div>
    <div><b>${n.iron || 0}</b><span>铁 mg</span></div>
    <div><b>${n.carbs || 0}</b><span>碳水 g</span></div>
  </div>

  ${footer(r._page)}
</section>`;
}

function outroPage() {
  return `<section class="page outro">
  <div class="ou-glow"></div>
  ${LOGO('ou-logo')}
  <div class="ou-brand">卡卡家常菜谱</div>
  <div class="ou-rule"></div>
  <p class="ou-slogan">关注我，<br>每天帮你把「今天吃什么」<br>这道最难的菜给做了。</p>
  <div class="ou-rule"></div>
  <div class="ou-mini">
    <b>微信搜「卡卡家常菜谱」小程序</b>
    <p>按你家人口自动配一日三餐<br>营养自动算好 · 买菜清单一键生成<br>${RECIPES.length} 道家常菜随时查</p>
  </div>
  <div class="ou-foot">本菜谱由「卡卡家常菜谱」原创整理<br>欢迎转发给需要的家人朋友</div>
</section>`;
}

// ---------- 样式 ----------
const CSS = `
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --accent:#f0592b; --ink:#2f251c; --sub:#6f6357; --muted:#a29485;
  --line:#efe4d5; --ground:#faf5ee; --card:#fffdfa;
}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'KKLatin','KKHans','Noto Color Emoji',sans-serif;color:var(--ink);background:#fff;
  font-weight:400;-webkit-font-smoothing:antialiased}
.page{width:430px;height:932px;position:relative;overflow:hidden;background:var(--ground);
  page-break-after:always;break-after:page}
.page:last-child{page-break-after:auto;break-after:auto}

/* ============ 封面 ============ */
.cover{background:linear-gradient(165deg,#fff6ec 0%,#fdece0 42%,#fbe0d0 100%);
  padding:58px 42px 44px;display:flex;flex-direction:column}
.cv-glow{position:absolute;width:420px;height:420px;border-radius:50%;right:-190px;top:-160px;
  background:radial-gradient(circle,rgba(240,89,43,.16),rgba(240,89,43,0) 68%)}
.cv-top{display:flex;align-items:center;gap:11px;position:relative}
.cv-logo{width:36px;height:36px;display:block}
.cv-brand{font-size:17px;font-weight:700;letter-spacing:.06em;color:#7b5330}
.cv-mid{margin-top:auto;position:relative}
.cv-kicker{font-size:13px;color:#a87a58;letter-spacing:.12em;margin-bottom:16px}
.cv-title{font-size:62px;line-height:1.1;font-weight:900;letter-spacing:.02em;color:#33261c}
.cv-num{display:flex;align-items:baseline;gap:7px;margin-top:22px}
.cv-num b{font-size:58px;font-weight:900;color:var(--accent);letter-spacing:-.01em}
.cv-num span{font-size:20px;font-weight:700;color:#c0714a}
.cv-line{width:56px;height:4px;border-radius:2px;background:var(--accent);margin:22px 0 18px}
.cv-desc{font-size:14px;line-height:1.95;color:#7a6350}
.cv-counts{display:flex;gap:8px;margin:34px 0 22px;position:relative}
.cc{flex:1;background:rgba(255,255,255,.72);border-radius:13px;padding:11px 4px;text-align:center}
.cc b{display:block;font-size:19px;font-weight:900;line-height:1.2}
.cc span{font-size:11px;color:#8c7663}
.cv-foot{font-size:12px;color:#b3937c;letter-spacing:.16em;text-align:center;position:relative}

/* ============ 通用内页 ============ */
.plain{padding:54px 36px 36px}
.pl-head{margin-bottom:26px}
.pl-eyebrow{font-size:11.5px;letter-spacing:.2em;color:var(--accent);font-weight:700;display:block;margin-bottom:9px}
.pl-title{font-size:27px;font-weight:900;letter-spacing:.01em}

/* 使用说明 */
.ht-list{display:flex;flex-direction:column;gap:15px}
.ht-row{display:flex;gap:12px;background:var(--card);border-radius:15px;padding:14px 15px;
  border:1px solid var(--line)}
.ht-ic{width:26px;font-size:17px;flex:none;text-align:center;line-height:1.35;
  font-family:'Noto Color Emoji','KKHans',sans-serif}
.ht-tx b{font-size:14px;font-weight:700;display:block;margin-bottom:4px}
.ht-tx p{font-size:12.2px;line-height:1.75;color:var(--sub)}
.ht-tx p b{display:inline;font-size:12.2px;color:var(--accent)}
.ht-note{margin-top:auto;display:flex;align-items:center;gap:12px;background:#fdf3e9;
  border-radius:15px;padding:15px;position:absolute;left:36px;right:36px;bottom:36px}
.ht-logo{width:34px;height:34px;flex:none}
.ht-note p{font-size:11.5px;line-height:1.75;color:#8a7256}

/* 总目录 */
.toc-list{display:flex;flex-direction:column;gap:12px}
.toc-row{display:flex;align-items:center;gap:13px;background:var(--card);border:1px solid var(--line);
  border-radius:16px;padding:15px 16px}
.toc-em{width:44px;height:44px;border-radius:13px;display:flex;align-items:center;
  justify-content:center;font-size:22px;flex:none;font-family:'Noto Color Emoji','KKHans',sans-serif}
.toc-mid{flex:1}
.toc-mid b{font-size:17px;font-weight:800;display:block}
.toc-mid span{font-size:11.5px;color:var(--muted)}
.toc-rt{text-align:right;line-height:1.25}
.toc-rt b{font-size:20px;font-weight:900}
.toc-rt span{font-size:11px;color:var(--muted);margin-left:2px}
.toc-rt i{display:block;font-size:10.5px;color:var(--muted);font-style:normal;letter-spacing:.04em}
.toc-sum{margin-top:26px;text-align:center;font-size:12.5px;color:var(--sub);line-height:1.85}
.toc-sum b{font-size:17px;color:var(--accent);font-weight:900}
.toc-sum span{font-size:11px;color:var(--muted)}

/* 章节扉页 */
.divider{background:var(--t);padding:0 40px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center}
.dv-no{font-size:13px;font-weight:900;letter-spacing:.3em;color:var(--c);opacity:.55}
.dv-em{font-size:66px;margin:20px 0 14px;line-height:1;font-family:'Noto Color Emoji','KKHans',sans-serif}
.dv-title{font-size:44px;font-weight:900;letter-spacing:.1em;color:var(--c)}
.dv-sub{font-size:14px;color:#7c6a55;margin-top:12px;letter-spacing:.06em}
.dv-bar{width:44px;height:4px;border-radius:2px;background:var(--c);margin:24px 0 20px;opacity:.85}
.dv-count{font-size:12.5px;color:#8c7a64;letter-spacing:.05em}
.dv-count b{font-size:15px;color:var(--c);font-weight:900}

/* 章节目录 */
.ix-wrap{display:flex;gap:16px}
.ix-col{flex:1;list-style:none}
.ix-col li{display:flex;align-items:baseline;gap:4px;font-size:11.4px;line-height:1.5;
  padding:3.2px 0;color:var(--sub)}
.ix-nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:138px;color:var(--ink)}
.ix-hb{font-style:normal;color:#e0523f;font-size:9px;margin-left:2px}
.ix-sp{font-style:normal;font-size:8.5px;margin-left:2px;font-family:'Noto Color Emoji',sans-serif}
.ix-dot{flex:1;border-bottom:1px dotted #ddd0be;transform:translateY(-3px);min-width:8px}
.ix-pg{color:var(--c);font-weight:700;font-size:11px;flex:none}

/* ============ 菜谱页 ============ */
.recipe{--fs:1;--gp:1;--ph:186px;padding:28px 32px 50px;display:flex;flex-direction:column}
.recipe.dense{--ph:150px;--gp:.92}
.recipe.denser{--ph:116px;--gp:.8}
.recipe.densest{--ph:88px;--gp:.68;--fs:.97}
.recipe.densest2{--ph:64px;--gp:.56;--fs:.93}
.rc-fill{flex:1;min-height:0}
.rc-head{display:flex;align-items:center;gap:6px;margin-bottom:calc(11px*var(--gp))}
.rc-pill{background:var(--c);color:#fff;font-size:11px;font-weight:700;padding:3.5px 11px;
  border-radius:999px;letter-spacing:.06em}
.rc-badge{background:#fbe9c8;color:#8a5a1e;font-size:10.5px;font-weight:700;padding:3.5px 9px;border-radius:999px}
.rc-spicy{background:#fdeae6;color:#c9432a;font-size:10.5px;font-weight:700;padding:3.5px 9px;border-radius:999px}
.emo{font-style:normal;font-family:'Noto Color Emoji',sans-serif}
.rc-no{margin-left:auto;font-size:10.5px;color:#bcae9e;letter-spacing:.08em;font-weight:500}
.rc-title{font-size:calc(26px*var(--fs));font-weight:900;line-height:1.28;letter-spacing:.01em}
.rc-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:calc(9px*var(--gp))}
.rc-tags span{font-size:calc(10.8px*var(--fs));color:var(--c);background:var(--t);
  padding:3px 9px;border-radius:7px;font-weight:500}

.ph{height:var(--ph);margin:calc(14px*var(--gp)) 0 0;border-radius:17px;
  background:linear-gradient(150deg,#fffaf3,#fdf0e4);border:1.6px dashed #e3d3bf;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}
.ph-em{font-size:46px;line-height:1;opacity:.55;font-family:'Noto Color Emoji','KKHans',sans-serif}
.ph-tip{font-size:10.5px;color:#bfae9a;letter-spacing:.22em}
.ph.has{border:none;overflow:hidden;background:#f2ece4}
.ph.has img{width:100%;height:100%;object-fit:cover;display:block}

.rc-meta{display:flex;align-items:center;margin-top:calc(14px*var(--gp));
  background:var(--card);border:1px solid var(--line);border-radius:13px;padding:calc(9px*var(--gp)) 0}
.rc-meta>div{flex:1;text-align:center;line-height:1.3}
.rc-meta b{display:block;font-size:calc(15px*var(--fs));font-weight:800}
.rc-meta span{font-size:calc(10px*var(--fs));color:var(--muted)}
.rc-meta i{width:1px;height:22px;background:var(--line)}

.rc-sec{display:flex;align-items:center;gap:7px;font-size:calc(14.5px*var(--fs));font-weight:800;
  margin:calc(16px*var(--gp)) 0 calc(8px*var(--gp))}
.rc-bar{width:4px;height:15px;border-radius:2px;background:var(--c)}
.rc-sec em{font-style:normal;font-size:calc(10.5px*var(--fs));font-weight:600;color:#fff;
  background:var(--c);padding:2px 7px;border-radius:6px;margin-left:2px;opacity:.85}

.rc-ings{list-style:none}
.rc-ings.two{column-count:2;column-gap:20px}
.rc-ings.two li{break-inside:avoid;font-size:calc(11.9px*var(--fs))}
.rc-ings.two .ig-a{font-size:calc(11.7px*var(--fs))}
.rc-ings li{display:flex;align-items:baseline;gap:5px;font-size:calc(12.6px*var(--fs));
  line-height:1.5;padding:calc(3.4px*var(--gp)) 0}
.ig-n{white-space:nowrap;color:var(--ink)}
.ig-n i{font-style:normal;font-size:calc(9.5px*var(--fs));color:var(--muted);
  background:#f4ece1;padding:1px 5px;border-radius:5px;margin-left:5px}
.ig-d{flex:1;border-bottom:1px dotted #ded1bf;transform:translateY(-3px);min-width:10px}
.ig-a{color:var(--c);font-weight:700;font-size:calc(12.4px*var(--fs));flex:none}

.rc-steps{list-style:none;counter-reset:st}
.rc-steps li{display:flex;gap:9px;padding:calc(4.6px*var(--gp)) 0;counter-increment:st}
.st-n{flex:none;width:calc(19px*var(--fs));height:calc(19px*var(--fs));border-radius:50%;
  background:var(--c);color:#fff;font-size:calc(11px*var(--fs));font-weight:700;
  display:flex;align-items:center;justify-content:center;margin-top:2px}
.st-n::before{content:counter(st)}
.rc-steps p{font-size:calc(12.6px*var(--fs));line-height:1.72;color:#463a2e;flex:1}

.rc-tip{display:flex;gap:8px;background:#fdf4e8;border-radius:12px;
  padding:calc(10px*var(--gp)) 12px;margin-top:calc(12px*var(--gp))}
.rc-tip span{font-size:calc(12.5px*var(--fs));line-height:1.6;
  font-family:'Noto Color Emoji','KKHans',sans-serif}
.rc-tip p{font-size:calc(11.6px*var(--fs));line-height:1.72;color:#8a7256;flex:1}

.rc-nut{display:flex;gap:7px;margin-top:calc(12px*var(--gp))}
.rc-nut div{flex:1;background:var(--card);border:1px solid var(--line);border-radius:11px;
  padding:calc(7px*var(--gp)) 0;text-align:center;line-height:1.28}
.rc-nut b{display:block;font-size:calc(13.5px*var(--fs));font-weight:800;color:var(--c)}
.rc-nut span{font-size:calc(9.3px*var(--fs));color:var(--muted)}

/* 页脚水印 */
.ft{position:absolute;left:32px;right:32px;bottom:18px;display:flex;align-items:center;gap:6px;
  border-top:1px solid var(--line);padding-top:9px}
.ft-logo{width:15px;height:15px;flex:none}
.ft-brand{font-size:10px;color:#bcae9e;letter-spacing:.09em}
.ft-pg{margin-left:auto;font-size:11px;color:#b4a695;font-weight:700}
.ix .ft{left:36px;right:36px}

/* ============ 结尾页 ============ */
.outro{background:linear-gradient(200deg,#fff6ec,#fbe2d2);padding:64px 44px 76px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.ou-glow{position:absolute;width:360px;height:360px;border-radius:50%;left:-150px;bottom:-140px;
  background:radial-gradient(circle,rgba(240,89,43,.15),rgba(240,89,43,0) 70%)}
.ou-logo{width:64px;height:64px;position:relative}
.ou-brand{font-size:21px;font-weight:900;letter-spacing:.1em;margin-top:16px;color:#6f4a2b;position:relative}
.ou-rule{width:38px;height:3px;border-radius:2px;background:rgba(240,89,43,.35);margin:26px 0;position:relative}
.ou-slogan{font-size:21px;line-height:1.95;font-weight:800;color:#33261c;position:relative;letter-spacing:.01em}
.ou-mini{background:rgba(255,255,255,.78);border-radius:17px;padding:20px 24px;position:relative}
.ou-mini b{font-size:14px;font-weight:800;color:var(--accent);display:block;margin-bottom:9px}
.ou-mini p{font-size:12.2px;line-height:1.92;color:#7a6350}
.ou-foot{position:absolute;left:44px;right:44px;bottom:40px;font-size:10.5px;color:#b08d72;line-height:1.8;letter-spacing:.05em}
`;

// ---------- 组装 ----------
let body = coverPage() + howtoPage() + tocPage();
grouped.forEach((g, gi) => {
  body += dividerPage(g, gi);
  body += indexPages(g);
  g.list.forEach((r, i) => {
    body += recipePage(r, g, i);
  });
});
body += outroPage();

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>卡卡家常菜谱 · ${RECIPES.length} 道家常菜全收录</title>
<style>${CSS}</style></head><body>${body}</body></html>`;

if (!fs.existsSync(SCRATCH)) fs.mkdirSync(SCRATCH, { recursive: true });
fs.writeFileSync(path.join(SCRATCH, 'cookbook.html'), html);
console.log('HTML 已生成');
console.log('总页数:', TOTAL_PAGES, '| 菜谱页:', RECIPES.length, '| 目录页:', grouped.reduce((n, g) => n + g.indexPages, 0));
console.log('各章:', grouped.map((g) => `${g.label}${g.list.length}(P${g.firstRecipePage}-${g.lastRecipePage})`).join(' '));
console.log('体积:', (html.length / 1024 / 1024).toFixed(1), 'MB (含内嵌字体)');

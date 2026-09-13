/**
 * 卡卡家常菜谱 · PDF 生成器（书籍排版版）
 *
 * 排版原则：这是一本书，不是一个 App 界面。
 *   宋体做标题与数字，黑体做正文；只用细线分区，不用卡片和色块；
 *   步骤用中文数字；标签用间隔号连写；大留白，不对称页边距。
 *
 * 输出：430×932px 手机竖版，一页一道菜。
 * 食材用量按【2 人份】写好；营养值为人均，不乘。
 * 配图位留白，把照片写进 photos.json 即可原样重出。
 */
const fs = require('fs');
const path = require('path');

const APP = path.resolve(__dirname, '../..');
const SCRATCH = process.env.OUT_DIR || path.resolve(__dirname, 'out');
const FONTDIR = process.env.FONT_DIR || path.resolve(__dirname, 'node_modules/@fontsource');

const { RECIPES } = require(APP + '/data/recipes');

/** 日后填真实照片：{ 菜谱id: '图片路径或 data URI' } */
const PHOTOS = (() => {
  const f = path.join(SCRATCH, 'photos.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
})();

const SERVINGS = 2;

const SECTIONS = [
  { type: 'meat', label: '荤菜', cn: '壹', sub: '有肉才叫吃饭' },
  { type: 'veg', label: '素菜', cn: '贰', sub: '清清爽爽配一口' },
  { type: 'soup', label: '汤羹', cn: '叁', sub: '一碗热汤暖全家' },
  { type: 'staple', label: '主食', cn: '肆', sub: '扎扎实实吃饱' },
  { type: 'breakfast', label: '早餐', cn: '伍', sub: '一天从吃好开始' }
];

const CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 与小程序 recipe.js 同一套取整规则 */
function roundAmount(amount, unit) {
  if (unit === 'g' || unit === 'ml') return Math.max(5, Math.round(amount / 5) * 5);
  return Math.max(1, Math.ceil(amount * 2) / 2);
}
function amountText(ing) {
  if (ing.unit === '适量' || !ing.amount) return '适量';
  const v = roundAmount(ing.amount * SERVINGS, ing.unit);
  const u = ing.unit === 'g' || ing.unit === 'ml' ? ' ' + ing.unit : ' ' + ing.unit;
  return v + u;
}

// ---------- 字体 ----------
function face(family, pkg, file, weight) {
  const b64 = fs.readFileSync(path.join(FONTDIR, pkg, 'files', file)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
}
const FONT_CSS = [
  // 宋体：标题、数字、页码
  ...[400, 600, 900].flatMap((w) => [
    face('SrfL', 'noto-serif-sc', `noto-serif-sc-latin-${w}-normal.woff2`, w),
    face('SrfH', 'noto-serif-sc', `noto-serif-sc-chinese-simplified-${w}-normal.woff2`, w)
  ]),
  // 黑体：正文
  ...[400, 500].flatMap((w) => [
    face('SnsL', 'noto-sans-sc', `noto-sans-sc-latin-${w}-normal.woff2`, w),
    face('SnsH', 'noto-sans-sc', `noto-sans-sc-chinese-simplified-${w}-normal.woff2`, w)
  ])
].join('');

/** 品牌印记：碗 + 蒸汽 */
const MARK = (cls, fill) => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">
<path d="M30 49c0 14 9 22 20 22s20-8 20-22z" fill="${fill}"/>
<rect x="19" y="44" width="62" height="6.5" rx="3.25" fill="${fill}"/>
<path d="M38 38c-4.5-5.5 2-9-1.5-14.5M50 36c-4.5-5.5 3.5-10 0-15.5M62 38c-4.5-5.5 2-9-1.5-14.5" stroke="${fill}" stroke-width="4.2" stroke-linecap="round" fill="none"/>
</svg>`;

// ---------- 分组与页码 ----------
const grouped = SECTIONS.map((s) => ({ ...s, list: RECIPES.filter((r) => r.type === s.type) }));
const PER_INDEX_PAGE = 56;
let cur = 3;
grouped.forEach((g) => {
  g.dividerPage = ++cur;
  g.indexPages = Math.ceil(g.list.length / PER_INDEX_PAGE);
  g.indexStart = cur + 1;
  cur += g.indexPages;
  g.firstRecipePage = cur + 1;
  g.list.forEach((r) => { r._page = ++cur; });
  g.lastRecipePage = cur;
});
const TOTAL_PAGES = ++cur;

// ---------- 页面 ----------
function coverPage() {
  return `<section class="page cover">
  <div class="cv-mark">${MARK('cv-svg', '#c9452a')}<span>卡卡家常菜谱</span></div>
  <div class="cv-body">
    <h1 class="cv-h">家常菜</h1>
    <div class="cv-h2">全 收 录</div>
    <div class="cv-rule"></div>
    <div class="cv-meta"><b>354</b> 道 · 一页一道 · 两人份用量</div>
  </div>
  <div class="cv-foot">写给每天都要开火的普通家庭</div>
</section>`;
}

function howtoPage() {
  const rows = [
    ['用量按两人份写好', '所有食材数量已经按两口之家换算完毕，直接照着买。三口之家在此基础上多加一半，四口翻倍。'],
    ['营养数据是人均值', '每道菜标的热量、蛋白质、钙、铁，都是一个人吃到的量，不是一锅的总量。'],
    ['时间是实际操作时间', '不含腌制、泡发这些等待的时间，需要等的会写在步骤里。'],
    ['标注偏辣的菜可减辣', '家里有小孩或不吃辣，把辣椒减半或直接去掉，不影响这道菜成型。'],
    ['写着「常备」的不用买', '生抽、料酒、盐、糖这些家里都有，买菜时不必重复列。'],
    ['每道菜末尾有小贴士', '都是真正会翻车的地方，动手之前扫一眼，能少踩不少坑。']
  ];
  return `<section class="page plain">
  <div class="pg-head"><span class="pg-eyebrow">开始之前</span><h2 class="pg-h">这本菜谱怎么用</h2></div>
  <ol class="ht">
    ${rows.map((r, i) => `<li><i>${CN_NUM[i]}</i><div><b>${r[0]}</b><p>${r[1]}</p></div></li>`).join('')}
  </ol>
  <div class="ht-foot">
    <div class="ht-rule"></div>
    <p>全部菜谱整理自「卡卡家常菜谱」微信小程序<br>小程序可按你家人口自动配一日三餐、自动生成买菜清单</p>
  </div>
</section>`;
}

function tocPage() {
  return `<section class="page plain">
  <div class="pg-head"><span class="pg-eyebrow">目录</span><h2 class="pg-h">全书分五章</h2></div>
  <div class="toc">
    ${grouped
      .map(
        (g) => `<div class="toc-r">
      <i class="toc-cn">${g.cn}</i>
      <div class="toc-m"><b>${g.label}</b><span>${g.sub}</span></div>
      <div class="toc-e"><b>${g.list.length}</b><span> 道</span><i>${g.firstRecipePage} 页</i></div>
    </div>`
      )
      .join('')}
  </div>
  <div class="toc-sum">全书 ${RECIPES.length} 道菜 · 共 ${TOTAL_PAGES} 页<br>
    <span>每章开头附本章完整菜单，可按菜名查页码</span></div>
</section>`;
}

function dividerPage(g) {
  return `<section class="page divider">
  <div class="dv-cn">${g.cn}</div>
  <h2 class="dv-h">${g.label}</h2>
  <div class="dv-sub">${g.sub}</div>
  <div class="dv-rule"></div>
  <div class="dv-meta">共 ${g.list.length} 道 &nbsp;·&nbsp; 第 ${g.firstRecipePage} — ${g.lastRecipePage} 页</div>
</section>`;
}

function indexPages(g) {
  let out = '';
  for (let i = 0; i < g.indexPages; i++) {
    const slice = g.list.slice(i * PER_INDEX_PAGE, (i + 1) * PER_INDEX_PAGE);
    const half = Math.ceil(slice.length / 2);
    const col = (arr) =>
      `<ul class="ix-c">${arr
        .map(
          (r) =>
            `<li><span class="ix-n">${esc(r.name)}${r.badge ? '<i class="ix-b">·家传</i>' : ''}</span><span class="ix-d"></span><span class="ix-p">${r._page}</span></li>`
        )
        .join('')}</ul>`;
    out += `<section class="page plain ix">
    <div class="pg-head"><span class="pg-eyebrow">${g.label}${g.indexPages > 1 ? ` 目录 ${i + 1}／${g.indexPages}` : ' 目录'}</span><h2 class="pg-h">本章 ${g.list.length} 道</h2></div>
    <div class="ix-w">${col(slice.slice(0, half))}${col(slice.slice(half))}</div>
    <div class="pg-folio"><span>卡卡家常菜谱</span><i>${g.indexStart + i}</i></div>
  </section>`;
  }
  return out;
}

function recipePage(r, g, idx) {
  const ings = r.ingredients || [];
  const photo = PHOTOS[r.id];
  const n = r.nutrition || {};
  const notes = [];
  if (r.badge) notes.push(r.badge);
  (r.tags || []).slice(0, 3).forEach((t) => notes.push(t));
  if (r.spicy) notes.push('偏辣');

  return `<section class="page rp">
  <div class="rp-run"><span>${g.label}</span><i>${String(idx + 1).padStart(3, '0')}</i></div>

  <h3 class="rp-name">${esc(r.name)}</h3>
  ${notes.length ? `<div class="rp-note">${notes.map(esc).join(' · ')}</div>` : ''}

  <figure class="rp-fig${photo ? ' has' : ''}">${photo ? `<img src="${esc(photo)}" alt="">` : '<span>配 图</span>'}</figure>

  <div class="rp-facts">
    <div><dt>时间</dt><dd>${r.time} 分钟</dd></div>
    <div><dt>难度</dt><dd>${esc(r.difficulty)}</dd></div>
    <div><dt>热量</dt><dd>${n.kcal || 0} 千卡</dd></div>
  </div>

  <div class="rp-sec"><b>食材</b><em>两人份</em><span></span></div>
  <ul class="rp-ing${ings.length >= 9 ? ' two' : ''}">
    ${ings
      .map(
        (g2) =>
          `<li><span class="ig-n">${esc(g2.name)}${g2.pantry ? '<i>常备</i>' : ''}</span><span class="ig-a">${esc(amountText(g2))}</span></li>`
      )
      .join('')}
  </ul>

  <div class="rp-sec"><b>做法</b><span></span></div>
  <ol class="rp-step">
    ${(r.steps || []).map((s, i) => `<li><i>${CN_NUM[i] || i + 1}</i><p>${esc(s)}</p></li>`).join('')}
  </ol>

  ${r.tip ? `<div class="rp-tip"><i>小贴士</i><p>${esc(r.tip)}</p></div>` : ''}

  <div class="rp-fill"></div>

  <div class="rp-foot">
    <div class="rp-nut">蛋白 ${n.protein || 0} 克　钙 ${n.calcium || 0} 毫克　铁 ${n.iron || 0} 毫克　碳水 ${n.carbs || 0} 克</div>
    <div class="pg-folio"><span>卡卡家常菜谱</span><i>${r._page}</i></div>
  </div>
</section>`;
}

function outroPage() {
  return `<section class="page outro">
  ${MARK('ou-svg', '#c9452a')}
  <div class="ou-brand">卡卡家常菜谱</div>
  <div class="ou-rule"></div>
  <p class="ou-slogan">关注我<br>每天帮你把「今天吃什么」<br>这道最难的菜给做了</p>
  <div class="ou-rule"></div>
  <div class="ou-mini">
    <b>微信搜「卡卡家常菜谱」小程序</b>
    <p>按你家人口自动配一日三餐<br>营养自动算好，买菜清单一键生成<br>${RECIPES.length} 道家常菜随时查</p>
  </div>
  <div class="ou-foot">本菜谱由「卡卡家常菜谱」原创整理<br>欢迎转发给需要的家人朋友</div>
</section>`;
}

// ---------- 样式 ----------
const CSS = `
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --paper:#f7f3ec;
  --ink:#1e1811;
  --ink2:#584f44;
  --ink3:#97897a;
  --rule:#ddd4c4;
  --hair:#e9e2d6;
  --red:#c9452a;
  --srf:'SrfL','SrfH',serif;
  --sns:'SnsL','SnsH',sans-serif;
}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:var(--sns);color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased}
.page{width:430px;height:932px;position:relative;overflow:hidden;background:var(--paper);
  page-break-after:always;break-after:page}
.page:last-child{page-break-after:auto;break-after:auto}

/* 页脚 */
.pg-folio{display:flex;align-items:baseline;border-top:1px solid var(--hair);padding-top:8px}
.pg-folio span{font-size:9.5px;letter-spacing:.24em;color:#b3a695}
.pg-folio i{margin-left:auto;font-style:normal;font-family:var(--srf);font-size:12.5px;
  font-weight:600;color:var(--ink2)}

/* ===== 封面 ===== */
.cover{padding:52px 44px 46px;display:flex;flex-direction:column}
.cv-mark{display:flex;align-items:center;gap:9px}
.cv-svg{width:19px;height:19px;display:block}
.cv-mark span{font-family:var(--srf);font-size:12.5px;font-weight:600;letter-spacing:.3em;color:var(--red)}
.cv-body{margin-top:auto;padding-bottom:8px}
.cv-h{font-family:var(--srf);font-size:80px;font-weight:900;line-height:1.02;letter-spacing:.04em;color:var(--ink)}
.cv-h2{font-family:var(--srf);font-size:30px;font-weight:400;letter-spacing:.42em;
  color:var(--ink2);margin-top:16px;margin-right:-.42em}
.cv-rule{width:38px;height:2px;background:var(--red);margin:34px 0 20px}
.cv-meta{font-size:12px;letter-spacing:.1em;color:var(--ink2)}
.cv-meta b{font-family:var(--srf);font-size:16px;font-weight:600;color:var(--red)}
.cv-foot{margin-top:56px;font-size:11px;letter-spacing:.18em;color:var(--ink3)}

/* ===== 通用内页 ===== */
.plain{padding:52px 40px 40px 44px}
.pg-head{margin-bottom:32px}
.pg-eyebrow{display:block;font-size:9.5px;letter-spacing:.3em;color:var(--red);margin-bottom:14px}
.pg-h{font-family:var(--srf);font-size:29px;font-weight:900;letter-spacing:.05em}

/* 使用说明 */
.ht{list-style:none}
.ht li{display:flex;gap:14px;padding:15px 0;border-bottom:1px solid var(--hair)}
.ht li:first-child{border-top:1px solid var(--hair)}
.ht i{font-style:normal;font-family:var(--srf);font-size:14px;font-weight:600;
  color:var(--red);flex:none;width:16px;padding-top:1px}
.ht b{display:block;font-size:13.5px;font-weight:500;letter-spacing:.04em;margin-bottom:6px}
.ht p{font-size:11.8px;line-height:1.85;color:var(--ink2)}
.ht-foot{position:absolute;left:44px;right:40px;bottom:44px}
.ht-rule{width:28px;height:1px;background:var(--rule);margin-bottom:12px}
.ht-foot p{font-size:10.5px;line-height:1.9;color:var(--ink3);letter-spacing:.04em}

/* 目录 */
.toc-r{display:flex;align-items:baseline;gap:16px;padding:19px 0;border-bottom:1px solid var(--hair)}
.toc-r:first-child{border-top:1px solid var(--hair)}
.toc-cn{font-style:normal;font-family:var(--srf);font-size:19px;font-weight:400;
  color:var(--red);flex:none;width:22px}
.toc-m{flex:1}
.toc-m b{font-family:var(--srf);font-size:19px;font-weight:600;letter-spacing:.14em;display:block}
.toc-m span{font-size:10.5px;color:var(--ink3);letter-spacing:.06em}
.toc-e{text-align:right;white-space:nowrap}
.toc-e b{font-family:var(--srf);font-size:16px;font-weight:600}
.toc-e span{font-size:10px;color:var(--ink3)}
.toc-e i{display:block;font-style:normal;font-family:var(--srf);font-size:11.5px;
  color:var(--ink3);margin-top:3px}
.toc-sum{margin-top:34px;font-size:11px;line-height:1.9;color:var(--ink2);letter-spacing:.05em}
.toc-sum span{color:var(--ink3);font-size:10.2px}

/* ===== 章节扉页 ===== */
.divider{padding:0 44px;display:flex;flex-direction:column;justify-content:center}
.dv-cn{font-family:var(--srf);font-size:104px;font-weight:400;line-height:1;
  color:var(--red);opacity:.15;margin-bottom:-6px;margin-left:-5px}
.dv-h{font-family:var(--srf);font-size:52px;font-weight:900;letter-spacing:.16em;
  margin-right:-.16em}
.dv-sub{font-size:12px;letter-spacing:.16em;color:var(--ink2);margin-top:18px}
.dv-rule{width:34px;height:2px;background:var(--red);margin:32px 0 18px}
.dv-meta{font-size:10.5px;letter-spacing:.1em;color:var(--ink3)}

/* 章节菜单 */
.ix-w{display:flex;gap:20px}
.ix-c{flex:1;list-style:none}
.ix-c li{display:flex;align-items:baseline;gap:4px;padding:3.6px 0;font-size:11px}
.ix-n{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:137px;color:var(--ink2)}
.ix-b{font-style:normal;font-size:8.5px;color:var(--red);letter-spacing:.05em}
.ix-d{flex:1;border-bottom:1px dotted #d8cdbb;transform:translateY(-3px);min-width:6px}
.ix-p{flex:none;font-family:var(--srf);font-size:11px;font-weight:600;color:var(--ink2)}
.ix .pg-folio{position:absolute;left:44px;right:40px;bottom:34px}

/* ===== 菜谱页 ===== */
.rp{--fs:1;--gp:1;--ph:190px;padding:44px 40px 34px 44px;display:flex;flex-direction:column}
.rp.d1{--ph:158px;--gp:.88}
.rp.d2{--ph:126px;--gp:.74}
.rp.d3{--ph:96px;--gp:.62;--fs:.97}
.rp.d4{--ph:70px;--gp:.5;--fs:.93}

.rp-run{display:flex;align-items:baseline;border-bottom:1px solid var(--rule);padding-bottom:9px}
.rp-run span{font-size:9.5px;letter-spacing:.34em;color:var(--red);margin-right:-.34em}
.rp-run i{margin-left:auto;font-style:normal;font-family:var(--srf);font-size:11.5px;
  font-weight:400;color:var(--ink3);letter-spacing:.1em}

.rp-name{font-family:var(--srf);font-size:calc(30px*var(--fs));font-weight:900;
  line-height:1.32;letter-spacing:.03em;margin-top:calc(26px*var(--gp))}
.rp-note{font-size:calc(11px*var(--fs));letter-spacing:.1em;color:var(--ink3);
  margin-top:calc(11px*var(--gp))}

.rp-fig{height:var(--ph);margin-top:calc(22px*var(--gp));background:#ece4d6;
  display:flex;align-items:center;justify-content:center;overflow:hidden}
.rp-fig span{font-family:var(--srf);font-size:11px;letter-spacing:.5em;
  color:#b8ab99;margin-right:-.5em}
.rp-fig.has{background:#e8e0d4}
.rp-fig img{width:100%;height:100%;object-fit:cover;display:block}

.rp-facts{display:flex;gap:30px;margin-top:calc(20px*var(--gp));
  border-top:1px solid var(--hair);border-bottom:1px solid var(--hair);
  padding:calc(11px*var(--gp)) 0}
.rp-facts dt{font-size:calc(9px*var(--fs));letter-spacing:.22em;color:var(--ink3);
  margin-bottom:5px}
.rp-facts dd{font-family:var(--srf);font-size:calc(14px*var(--fs));font-weight:600;
  letter-spacing:.03em}

.rp-sec{display:flex;align-items:center;gap:9px;margin:calc(22px*var(--gp)) 0 calc(11px*var(--gp))}
.rp-sec b{font-family:var(--srf);font-size:calc(14.5px*var(--fs));font-weight:600;
  letter-spacing:.4em;margin-right:-.4em;flex:none}
.rp-sec em{font-style:normal;font-size:calc(9.5px*var(--fs));letter-spacing:.16em;
  color:var(--ink3);flex:none}
.rp-sec span{flex:1;border-top:1px solid var(--hair)}

.rp-ing{list-style:none}
.rp-ing li{display:flex;align-items:baseline;justify-content:space-between;gap:12px;
  padding:calc(4.4px*var(--gp)) 0}
.ig-n{font-size:calc(12.6px*var(--fs));color:var(--ink);letter-spacing:.02em}
.ig-n i{font-style:normal;font-size:calc(9px*var(--fs));color:var(--ink3);
  letter-spacing:.1em;margin-left:6px}
.ig-a{font-family:var(--srf);font-size:calc(12.8px*var(--fs));font-weight:400;
  color:var(--ink2);white-space:nowrap;flex:none}
.rp-ing.two{column-count:2;column-gap:26px}
.rp-ing.two li{break-inside:avoid;padding:calc(3.6px*var(--gp)) 0}
.rp-ing.two .ig-n{font-size:calc(11.8px*var(--fs))}
.rp-ing.two .ig-a{font-size:calc(11.8px*var(--fs))}

.rp-step{list-style:none}
.rp-step li{display:flex;gap:13px;padding:calc(5.2px*var(--gp)) 0}
.rp-step i{font-style:normal;font-family:var(--srf);font-size:calc(13px*var(--fs));
  font-weight:600;color:var(--red);flex:none;width:calc(14px*var(--fs));padding-top:2px}
.rp-step p{font-size:calc(12.5px*var(--fs));line-height:1.88;color:var(--ink2);flex:1}

.rp-tip{display:flex;gap:12px;margin-top:calc(17px*var(--gp));
  padding-top:calc(13px*var(--gp));border-top:1px solid var(--hair)}
.rp-tip i{font-style:normal;font-size:calc(9px*var(--fs));letter-spacing:.2em;
  color:var(--red);flex:none;padding-top:3px}
.rp-tip p{font-size:calc(11.4px*var(--fs));line-height:1.85;color:var(--ink3);flex:1}

.rp-fill{flex:1;min-height:calc(16px*var(--gp))}
.rp-nut{font-size:calc(9.6px*var(--fs));letter-spacing:.06em;color:var(--ink3);
  padding-bottom:9px}

/* ===== 结尾 ===== */
.outro{padding:0 46px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;text-align:center}
.ou-svg{width:38px;height:38px}
.ou-brand{font-family:var(--srf);font-size:14px;font-weight:600;letter-spacing:.34em;
  color:var(--red);margin-top:16px;margin-right:-.34em}
.ou-rule{width:26px;height:1px;background:var(--rule);margin:34px 0}
.ou-slogan{font-family:var(--srf);font-size:22px;font-weight:600;line-height:2.05;
  letter-spacing:.06em;color:var(--ink)}
.ou-mini{margin-top:2px}
.ou-mini b{font-size:11.5px;font-weight:500;letter-spacing:.1em;color:var(--ink);
  display:block;margin-bottom:11px}
.ou-mini p{font-size:11px;line-height:2;color:var(--ink3);letter-spacing:.04em}
.ou-foot{position:absolute;left:46px;right:46px;bottom:44px;font-size:9.8px;
  line-height:1.95;color:#b3a695;letter-spacing:.08em}
`;

// ---------- 组装 ----------
let body = coverPage() + howtoPage() + tocPage();
grouped.forEach((g) => {
  body += dividerPage(g);
  body += indexPages(g);
  g.list.forEach((r, i) => { body += recipePage(r, g, i); });
});
body += outroPage();

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<title>卡卡家常菜谱 · ${RECIPES.length} 道家常菜全收录</title>
<style>${CSS}</style></head><body>${body}</body></html>`;

if (!fs.existsSync(SCRATCH)) fs.mkdirSync(SCRATCH, { recursive: true });
fs.writeFileSync(path.join(SCRATCH, 'cookbook.html'), html);
console.log('HTML 已生成 | 总页数', TOTAL_PAGES, '| 菜谱', RECIPES.length, '| 体积', (html.length / 1048576).toFixed(1), 'MB');
console.log(grouped.map((g) => `${g.label}${g.list.length}(P${g.firstRecipePage}-${g.lastRecipePage})`).join(' '));

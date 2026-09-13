/**
 * 把 cookbook.html 渲染成 PDF。
 * 渲染前逐页量高度，内容装不下的按 d1→d4 四档自动收紧
 * （优先压配图高度与行距，尽量不动字号），保证每页完整放下。
 */
const { chromium } = require('playwright');
const path = require('path');
const SCRATCH = process.env.OUT_DIR || path.resolve(__dirname, 'out');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none']
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 932 } });
  page.on('console', (m) => { if (m.type() === 'error') console.log('页面错误:', m.text()); });

  await page.goto('file://' + path.join(SCRATCH, 'cookbook.html'), { waitUntil: 'load', timeout: 240000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2000);
  console.log('字体加载完成');

  const stats = await page.evaluate(() => {
    const out = { total: 0, d1: 0, d2: 0, d3: 0, d4: 0, overflow: [] };
    const pages = [...document.querySelectorAll('.page.rp')];
    out.total = pages.length;
    const fits = (p) => {
      const f = p.querySelector('.rp-foot');
      return f.getBoundingClientRect().bottom <= p.getBoundingClientRect().bottom - 28;
    };
    for (const p of pages) {
      if (fits(p)) continue;
      for (const c of ['d1', 'd2', 'd3', 'd4']) {
        p.className = 'page rp ' + c;
        if (fits(p)) { out[c]++; break; }
      }
      if (!fits(p)) out.overflow.push(p.querySelector('.rp-name').textContent);
    }
    return out;
  });
  console.log(`排版: 共 ${stats.total} 页 | 基准 ${stats.total - stats.d1 - stats.d2 - stats.d3 - stats.d4} | 收紧 d1 ${stats.d1} d2 ${stats.d2} d3 ${stats.d3} d4 ${stats.d4}`);
  if (stats.overflow.length) console.log('!! 仍溢出:', stats.overflow.join(', '));
  else console.log('全部页面内容完整放下');

  await page.pdf({
    path: path.join(SCRATCH, '卡卡家常菜谱-354道全收录.pdf'),
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });
  console.log('PDF 已导出');

  const samples = { cover: 1, howto: 2, toc: 3, divider: 4, index: 5, recipe: 8, outro: 372 };
  for (const [name, no] of Object.entries(samples)) {
    const el = await page.$(`.page:nth-of-type(${no})`);
    if (el) await el.screenshot({ path: path.join(SCRATCH, `pv-${name}.png`) });
  }
  // 指定菜名抽查
  for (const nm of ['家庭版锡纸烤鱼', '外婆缸豆牛肉丝']) {
    const h = await page.evaluateHandle(
      (n) => [...document.querySelectorAll('.page.rp')].find((x) => x.querySelector('.rp-name').textContent === n), nm);
    const el = h.asElement();
    if (el) await el.screenshot({ path: path.join(SCRATCH, 'pv-' + nm + '.png') });
  }
  console.log('样张截图完成');

  await browser.close();
  process.exit(0);
})();

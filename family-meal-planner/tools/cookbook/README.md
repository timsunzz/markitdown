# 菜谱大全 PDF 生成器

把 `data/recipes.js` 里的全部菜谱排成一本手机竖版 PDF（一页一道菜）。

- 页面尺寸：430 × 932 px（iPhone 逻辑分辨率，适合手机翻阅与转发）
- 食材用量：按 **2 人份** 写好（`build.js` 里的 `SERVINGS` 可改）
- 营养数值：**人均**，不随份数放大
- 分章顺序：荤菜 → 素菜 → 汤羹 → 主食 → 早餐
- 每章有扉页 + 本章菜单（带页码），书末有关注引导页
- 每页页脚带品牌水印，防止内容被随意盗用

## 用法

```bash
cd family-meal-planner/tools/cookbook
npm install @fontsource/noto-sans-sc playwright   # 字体与渲染器
node build.js     # 生成 out/cookbook.html
node render.js    # 生成 out/卡卡家常菜谱-354道全收录.pdf
```

环境变量（都可不设）：

| 变量 | 作用 | 默认 |
|------|------|------|
| `OUT_DIR` | 输出目录 | `./out` |
| `FONT_DIR` | Noto Sans SC woff2 目录 | `./node_modules/@fontsource/noto-sans-sc/files` |
| `CHROME_PATH` | Chromium 可执行文件 | Playwright 自带 |

## 加真实菜品照片

在输出目录放一个 `photos.json`，键是菜谱 id，值是图片路径或 data URI：

```json
{
  "m01": "/abs/path/番茄炒蛋.jpg",
  "v03": "data:image/jpeg;base64,...."
}
```

有照片的菜自动用照片填满配图位，没照片的继续显示留白占位框。改完重跑
`node build.js && node render.js` 即可。

## 排版自适应

`render.js` 渲染前会逐页量一次高度，内容装不下的页面按
`dense → denser → densest` 三档自动收紧（优先压缩配图高度和间距，
尽量不动字号），保证每一页都完整放下、不截断。食材超过 9 样的菜
自动改双栏排列。

当前 354 道菜的结果：279 页保持基准版式，62 页轻度收紧，13 页中度收紧，0 页溢出。

# 卡卡家常菜谱 · uni-app 版

原生微信小程序（`../family-meal-planner`）的 uni-app 移植版：**一套代码同时发布微信小程序和 iOS App（上 App Store）**。

菜谱数据、营养计算、菜单生成引擎、购物清单聚合逻辑与原版**完全一致**，只改了模块语法（CommonJS → ESM），没有改任何算法。同一天、同样的家庭配置，两个版本生成的菜单一模一样。

- Vue 3 + Vite + uni-app（`vueVersion: 3`）
- 纯前端，无服务器、无云开发、不收集任何用户数据
- 微信小程序 AppID：`wx55c5be5bea5fa632`（已写入 `src/manifest.json`）

## 目录结构

```
family-meal-planner-uniapp/
├── package.json / vite.config.js / index.html
└── src/
    ├── main.js                  # 应用入口
    ├── App.vue                  # 原 app.js 的 onLaunch + 原 app.wxss 的全局样式
    ├── pages.json               # 原 app.json 的 pages / window / tabBar
    ├── manifest.json            # 各端配置（微信 AppID、iOS 隐私声明等）
    ├── static/
    │   ├── sitemap.json         # 原 sitemap.json
    │   └── app-icon-1024.png    # App 图标源图（1024×1024，可用它自动生成全套尺寸）
    ├── data/                    # 菜谱库 / 价目表（逻辑与原版一致）
    │   ├── recipes.js  recipes-extra.js  prices.js  covers.js
    ├── utils/
    │   ├── nutrition.js         # 营养目标计算（与原版一致）
    │   ├── planner.js           # 每日菜单生成引擎（与原版一致）
    │   ├── shopping.js          # 购物清单聚合（与原版一致）
    │   ├── watermark.js         # 品牌水印绘制（与原版一致）
    │   ├── canvas.js            # 【新增】跨端 Canvas 适配
    │   └── share.js             # 【新增】跨端分享适配
    └── pages/                   # 6 个页面，每页一个 .vue（原 wxml + js + wxss 合并）
        ├── index/  shopping/  family/  recipe/  favorites/  search/
```

## 本地运行

```bash
npm install
```

**微信小程序**

```bash
npm run dev:mp-weixin      # 开发（产物在 dist/dev/mp-weixin，会持续监听改动）
npm run build:mp-weixin    # 发布构建（产物在 dist/build/mp-weixin）
```

用微信开发者工具「导入项目」，目录选 `dist/dev/mp-weixin`（或 `dist/build/mp-weixin`）。AppID 已在构建产物的 `project.config.json` 里，不用手填。

**iOS App**

```bash
npm run build:app          # 产物在 dist/build/app
```

用 HBuilderX 打开 `dist/build/app` 目录，再走下面的「上架 iOS App Store」。

## 从原生小程序改了什么

| 原生小程序 | uni-app | 说明 |
| --- | --- | --- |
| `app.js` | `src/App.vue` 的 `onLaunch` | 默认家庭配置的初始化逻辑不变 |
| `app.json` | `src/pages.json` | pages / window / tabBar 原样搬过去 |
| `app.wxss` | `src/App.vue` 的 `<style>` | 全局样式，一行没改 |
| `project.config.json` | `src/manifest.json` 的 `mp-weixin` | AppID、编译 setting |
| `pages/x/x.wxml + .js + .wxss + .json` | `src/pages/x/x.vue` + `pages.json` 里一条 style | 页面样式加了 `scoped`，避免多端下跨页面串样式 |
| `wx.*` | `uni.*` | 全量替换 |
| `this.setData({...})` | 直接给 `this.xxx` 赋值 | 需要等渲染的地方改用 `await this.$nextTick()` |
| `data-id` + `e.currentTarget.dataset` | 事件里直接传参 `@click="onOpen(dish.id)"` | |
| `bindtap` / `catchtap` | `@click` / `@click.stop` | |
| `wx:if` / `wx:for` / `wx:key` | `v-if` / `v-for` / `:key` | |
| `<block>` | `<template>` | |
| `require` / `module.exports` | `import` / `export` | Vite 只吃 ESM；`planner.js` 里原本延迟 require 的 `dishCost` 提到了顶层 import |

移植时修掉的一处真实问题：WXML 里 `{{summary.count}}` 遇到 `summary` 为 `null` 会渲染成空字符串，Vue 模板则会直接抛错。今日菜单页首屏（`onShow` 执行前）正是这个状态，所以那一行的判断条件从 `!noMembers` 换成了 `summary` 本身。

## 两端能力差异

小程序和 App 有几个能力不通用，用条件编译（`#ifdef MP-WEIXIN` / `#ifndef MP-WEIXIN`）分开处理，页面逻辑本身是同一份：

| 能力 | 微信小程序 | iOS App |
| --- | --- | --- |
| 分享 | `<button open-type="share">` 原生转发 + `onShareAppMessage` / `onShareTimeline` | 系统分享面板（`uni.shareWithSystem`），调不起时退回复制到剪贴板 |
| 生成图片 | `<canvas type="2d">` 标准 Canvas 2D | 旧版 `canvas-id` 接口，由 `utils/canvas.js` 抹平差异 |
| 保存图片 | 预览后长按保存或转发 | 预览后长按 →「保存到相册」（已声明相册权限用途） |
| 本地存储 | `uni.setStorageSync` | 同一套 API，存在 App 沙盒里 |

`utils/canvas.js` 把两端统一成 `{ ctx, toTempFilePath }`，所以画菜谱图、画购物清单图、画水印的绘制代码是**同一份标准 Canvas 2D 写法**，不用各写一遍。

## 上架微信小程序

1. `npm run build:mp-weixin`
2. 微信开发者工具导入 `dist/build/mp-weixin` → 上传
3. 在 [mp.weixin.qq.com](https://mp.weixin.qq.com) 版本管理里提交审核

新小程序需要先完成 ICP 备案才能上架；服务类目选「生活服务 > 菜谱」。本程序无采集用户信息、无支付、无 UGC，页面内已带"营养建议仅供参考"声明。

## 上架 iOS App Store

前置条件：一个 **Apple Developer Program** 账号（个人 99 美元/年）和 **HBuilderX**（uni-app 官方 IDE，打原生包必须用它）。

1. **拿 DCloud 应用标识**：HBuilderX 里打开本项目 → `manifest.json` → 基础配置 → 「重新获取」，会自动填上 `appid`（形如 `__UNI__XXXXXXX`）。这个 ID 只用于 App 打包，和微信 AppID 无关。
2. **准备 App 图标**：`manifest.json` → 图标配置 → 选 `src/static/app-icon-1024.png` → 「自动生成所有图标并替换」。HBuilderX 会生成 iOS 需要的全套尺寸。
3. **在 Apple 后台建好三样东西**：
   - Bundle ID（如 `com.yourname.kakarecipes`），在 [developer.apple.com](https://developer.apple.com) → Identifiers 创建
   - 发布证书（`.p12`）
   - App Store 类型的描述文件（`.mobileprovision`）
4. **打包**：`npm run build:app`，用 HBuilderX 打开 `dist/build/app` → 发行 → 原生App-云打包 → 选 iOS、填上第 3 步的 Bundle ID / 证书 / 描述文件 → 打包，等待生成 `.ipa`。
5. **上传**：用 Transporter（Mac App Store 免费下载）把 `.ipa` 传到 App Store Connect。
6. **填审核信息并提交**：
   - 分类建议选「美食佳饮」（Food & Drink）
   - 隐私问卷：本 App 不联网、不注册、不收集任何数据，如实勾选「**不收集数据**」即可（`manifest.json` 里已关掉 uni 统计、关掉 IDFA）
   - 权限说明：只用到相册写入（保存生成的菜谱图/购物清单图），用途文案已写在 `manifest.json` 的 `NSPhotoLibraryAddUsageDescription`
   - 审核备注里建议说明「营养数据为本地内置，建议仅供参考，非医疗用途」

关于审核：这类工具 App 主要看 Guideline 4.2（最低功能要求）。本项目内置 354 道菜谱、有完整的菜单生成 / 营养核算 / 购物清单功能，功能量是够的。营养相关文案已在页面内声明"不能替代医生或临床营养师的个体化建议"，避免踩医疗健康类的红线。

## 二次开发

- **加菜谱 / 调价格**：改 `src/data/recipes.js`、`src/data/prices.js`，规则与原版 README 一致（1 份 = 1 个标准成人份）。
- **和原版同步**：`src/data/` 与 `src/utils/` 里的文件跟 `../family-meal-planner` 下的同名文件只差 `import`/`export` 那几行，两边改动可以直接对拷。
- **换图标**：替换 `src/static/app-icon-1024.png` 后，在 HBuilderX 里重新「自动生成所有图标」。

## 免责声明

营养目标为按轻体力活动水平的家庭配餐估算，不能替代医生或临床营养师的个体化建议。

/**
 * 跨端 Canvas 适配层
 *
 * 微信小程序支持 <canvas type="2d">，取到的是标准 Canvas 节点，
 * 上下文就是浏览器里那套 Canvas 2D API；
 * App（iOS / Android）与 H5 只支持旧版 canvas-id 接口，上下文是 uni 封装的
 * CanvasContext：部分属性要用 setXxx() 方法设置，而且所有绘制指令是攒着的，
 * 必须调用 draw() 才真正上屏。
 *
 * 这里把两端统一成同一个 { ctx, toTempFilePath } 结构：
 * 页面里的绘制代码（各页的画图函数与 watermark.js）一律用标准 Canvas 2D 写法，
 * 两端通用，不需要各写一份。
 */

/** 导出图按 2 倍像素密度绘制，保证在手机上不发虚 */
const DPR = 2;

/** 直接透传给原生上下文的方法（两端同名同参） */
const PASSTHROUGH = [
  'fillRect',
  'strokeRect',
  'clearRect',
  'fillText',
  'strokeText',
  'beginPath',
  'closePath',
  'moveTo',
  'lineTo',
  'arc',
  'arcTo',
  'rect',
  'quadraticCurveTo',
  'bezierCurveTo',
  'fill',
  'stroke',
  'clip',
  'save',
  'restore',
  'scale',
  'rotate',
  'translate',
  'drawImage'
];

/**
 * 设置字体。标准写法是 ctx.font = 'bold 34px sans-serif'；
 * 旧版 CanvasContext 只保证有 setFontSize(px)（不支持字重），
 * 所以先试标准属性，没生效再退回 setFontSize，至少保证字号正确。
 */
function applyFont(raw, spec) {
  let applied = false;
  try {
    raw.font = spec;
    applied = raw.font === spec;
  } catch (e) {
    applied = false;
  }
  if (applied) return;
  const matched = /(\d+(?:\.\d+)?)px/.exec(spec);
  const size = matched ? parseFloat(matched[1]) : 16;
  if (typeof raw.setFontSize === 'function') raw.setFontSize(size);
}

/** 把旧版 CanvasContext 包装成"标准 Canvas 2D 写法"可用的壳 */
function legacyShim(raw) {
  const assign = (setter, prop, value) => {
    if (typeof raw[setter] === 'function') raw[setter](value);
    else raw[prop] = value;
  };

  const shim = {
    set fillStyle(v) {
      assign('setFillStyle', 'fillStyle', v);
    },
    set strokeStyle(v) {
      assign('setStrokeStyle', 'strokeStyle', v);
    },
    set lineWidth(v) {
      assign('setLineWidth', 'lineWidth', v);
    },
    set lineCap(v) {
      assign('setLineCap', 'lineCap', v);
    },
    set lineJoin(v) {
      assign('setLineJoin', 'lineJoin', v);
    },
    set globalAlpha(v) {
      assign('setGlobalAlpha', 'globalAlpha', v);
    },
    set textAlign(v) {
      assign('setTextAlign', 'textAlign', v);
    },
    set textBaseline(v) {
      assign('setTextBaseline', 'textBaseline', v);
    },
    set font(v) {
      applyFont(raw, v);
    }
  };

  PASSTHROUGH.forEach((name) => {
    shim[name] = function () {
      if (typeof raw[name] === 'function') return raw[name].apply(raw, arguments);
      return undefined;
    };
  });

  return shim;
}

/** 微信小程序：<canvas type="2d">，标准 Canvas 节点 */
function prepareCanvas2d(id, width, height, component) {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(component)
      .select('#' + id)
      .fields({ node: true })
      .exec((res) => {
        const node = res && res[0] && res[0].node;
        if (!node) {
          reject(new Error('canvas node not found: ' + id));
          return;
        }
        node.width = width * DPR;
        node.height = height * DPR;
        const ctx = node.getContext('2d');
        ctx.scale(DPR, DPR);
        ctx.clearRect(0, 0, width, height);
        resolve({
          ctx,
          toTempFilePath() {
            return new Promise((ok, fail) => {
              uni.canvasToTempFilePath({
                canvas: node,
                success: (r) => ok(r.tempFilePath),
                fail
              });
            });
          }
        });
      });
  });
}

/** App / H5：旧版 canvas-id 接口 */
function prepareLegacyCanvas(id, width, height, component) {
  const raw = uni.createCanvasContext(id, component);
  return Promise.resolve({
    ctx: legacyShim(raw),
    toTempFilePath() {
      return new Promise((ok, fail) => {
        // 旧版接口攒着指令，draw() 之后画面才真正提交
        raw.draw(false, () => {
          // 个别机型 draw 回调时画面还没完全落到画布上，等一帧再导出
          setTimeout(() => {
            uni.canvasToTempFilePath(
              {
                canvasId: id,
                x: 0,
                y: 0,
                width,
                height,
                destWidth: width * DPR,
                destHeight: height * DPR,
                success: (r) => ok(r.tempFilePath),
                fail
              },
              component
            );
          }, 100);
        });
      });
    }
  });
}

/**
 * 准备一块可绘制的画布。
 * @param {object}  options
 * @param {string}  options.id        canvas 的 id（App/H5 同时用作 canvas-id）
 * @param {number}  options.width     逻辑宽度（绘制代码里用的坐标系）
 * @param {number}  options.height    逻辑高度
 * @param {object}  options.component 当前页面实例（this）
 * @returns {Promise<{ctx: object, toTempFilePath: function(): Promise<string>}>}
 */
export function prepareCanvas(options) {
  const { id, width, height, component } = options;
  // #ifdef MP-WEIXIN
  return prepareCanvas2d(id, width, height, component);
  // #endif
  // #ifndef MP-WEIXIN
  return prepareLegacyCanvas(id, width, height, component);
  // #endif
}

/**
 * 预览生成好的图片。
 * 小程序里长按图片即可保存或转发；App 端长按走 longPressActions，
 * 直接提供"保存到相册"（需要相册写入权限，已在 manifest.json 里声明用途）。
 */
export function previewGeneratedImage(tempFilePath) {
  const options = { urls: [tempFilePath], current: tempFilePath };

  // #ifdef APP-PLUS
  options.longPressActions = {
    itemList: ['保存到相册'],
    success: () => {
      uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: () => uni.showToast({ title: '已保存到相册', icon: 'success' }),
        fail: () => uni.showToast({ title: '保存失败，请检查相册权限', icon: 'none' })
      });
    }
  };
  // #endif

  uni.previewImage(options);
}

/** 生成图片后统一的引导文案（两端保存方式不同） */
export function saveHintText() {
  // #ifdef MP-WEIXIN
  return '长按图片可保存或转发';
  // #endif
  // #ifndef MP-WEIXIN
  return '长按图片可保存到相册';
  // #endif
}

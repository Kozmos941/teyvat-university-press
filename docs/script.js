/** 插件
 * 给所有 <element> <reaction> 标签添加对应类  
 */
function 元素命名法(hook) {
  hook.doneEach(function () {
    // 遍历所有 element 标签
    addClass('element')
    // 遍历所有 reaction 标签
    addClass('reaction')
  });
}

/** 添加类 
 * 输入: 标签名
 * 功能: 遍历标签集合, 根据属性和反应判断添加什么类
 * @param {string} tagName 
 */
function addClass(tagName) {
  for (const tag of document.getElementsByTagName(tagName)) {
    const result = KEYWORD_REG_EXP[tagName].exec(tag.innerHTML)
    if (result && CLASS_NAME[result[0]])
      tag.classList.add(CLASS_NAME[result[0]])
  }
}

/** 正则表达式
 * 属性和反应的正则
 */
const KEYWORD_REG_EXP = {
  // const RegExp = /(\[\d+\.\d+\]|强|弱)(水|火|冰|雷|风|岩|草)(\d+\.\d+)/
  element: /[水火冰雷风岩冻草]/,
  reaction: /冻结|蒸发|感电|超载|超导|扩散|融化|结晶|潮湿/
}

/** 类名
 * 中英文对照表
 */
const CLASS_NAME = {
  水: 'hydro',
  火: 'pyro',
  冰: 'cyro',
  雷: 'electro',
  风: 'anemo',
  岩: 'geo',
  冻: 'cyro',
  草: 'dendro',
  冻结: 'Frozen',
  蒸发: 'Vaporize',
  感电: 'ElectroCharged',
  超载: 'Overloaded',
  超导: 'Superconduct',
  扩散: 'Swirl',
  融化: 'Melt',
  结晶: 'Crystalize',
  潮湿: 'Wet',
}

/** 插件示例
 * 如何编写自定义插件
 * https://docsify.js.org/#/write-a-plugin
 */
function plugin(hook, vm) {
  hook.init(function () {
    // 初始化完成后调用，只调用一次，没有参数。
  });

  hook.beforeEach(function (content) {
    // 每次开始解析 Markdown 内容时调用
    // ...
    return content;
  });

  hook.afterEach(function (html, next) {
    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    next(html);
  });

  hook.doneEach(function () {
    // 每次路由切换时数据全部加载完成后调用，没有参数。
    // ...
  });

  hook.mounted(function () {
    // 初始化并第一次加载完成数据后调用，只触发一次，没有参数。
  });

  hook.ready(function () {
    // 初始化并第一次加载完成数据后调用，没有参数。
  });
}

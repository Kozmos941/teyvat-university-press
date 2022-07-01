/** 插件示例
 * 如何编写自定义插件
 * https://docsify.js.org/#/write-a-plugin
 */

function 元素命名法(hook, vm) {
  hook.init(function () {
    // Called when the script starts running, only trigger once, no arguments,
  });

  hook.beforeEach(function (content) {
    // Invoked each time before parsing the Markdown file.
    return content;
  });

  hook.afterEach(function (html, next) {
    // Invoked each time after the Markdown file is parsed.
    // beforeEach and afterEach support asynchronous。
    // call `next(html)` when task is done.
    html = html.replace(/ (<term>)/g,'$1')
    html = html.replace(/(<\/term>) /g,'$1')
    // console.log(html);
    next(html);
  });

  hook.doneEach(function () {
    // Invoked each time after the data is fully loaded, no arguments,

    for (const term of document.querySelectorAll('term')) {
      TAG_REGEXP.map(i => {
        const keywords = term.innerHTML.match(i.regexp)
        if (keywords) {
          const tag = document.createElement(i.tag)
          tag.innerHTML = term.innerHTML
          keywords.map(k => {
            const result = KEYWORD_CLASS.filter(i => i.keyword === k)[0]
            tag.classList.add(result ? result.class : null)
          })
          term.replaceWith(tag)
        }
      })
    }

    hook.mounted(function () {
      // Called after initial completion. Only trigger once, no arguments.
    });

    hook.ready(function () {
      // Called after initial completion, no arguments.
    })
  })
}

/** 正则表达式
 * 查找关键字的正则
 */
const TAG_REGEXP = [
  // const RegExp = /(\[\d+\.\d+\]|强|弱)(水|火|冰|雷|风|岩|草)(\d+\.\d+)/
  { tag: 'reaction', regexp: /冻结|蒸发|感电|超载|超导|扩散|融化|结晶|潮湿|碎冰/ },
  { tag: 'element', regexp: /[水火冰雷风岩草冻藏]/g },
]

/** 关键字_类名
 * tag 中关键字对应添加的 CSS 类
 */
const KEYWORD_CLASS = [
  { keyword: '水', class: 'hydro' },
  { keyword: '火', class: 'pyro' },
  { keyword: '冰', class: 'cryo' },
  { keyword: '冻', class: 'cryo' },
  { keyword: '雷', class: 'electro' },
  { keyword: '风', class: 'anemo' },
  { keyword: '岩', class: 'geo' },
  { keyword: '草', class: 'dendro' },
  { keyword: '冻结', class: 'Frozen' },
  { keyword: '蒸发', class: 'Vaporize' },
  { keyword: '感电', class: 'ElectroCharged' },
  { keyword: '超载', class: 'Overloaded' },
  { keyword: '超导', class: 'Superconduct' },
  { keyword: '扩散', class: 'Swirl' },
  { keyword: '融化', class: 'Melt' },
  { keyword: '结晶', class: 'Crystallize' },
  { keyword: '潮湿', class: 'Wet' },
]

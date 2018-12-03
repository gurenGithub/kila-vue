import { addCss, addScript } from './utils'

/*
 *让 IE 也能执行 console.log
 */
const w = window
if (!w['console']) {
  let newConsole = {}
  w.console = {}
  let forObj = function (obj) {
    let forHtml = ''
    if (typeof obj === 'object') {
      for (let i in obj) {
        forHtml += '{' + i + ':' + forObj(obj[i]) + '}'
      }
    } else {
      forHtml = obj
    }
    return forHtml
  }
  newConsole.log = function (msg) {
    let body = document.getElementsByTagName('body')[0]
    let newChild = document.createElement('consoleNode')
    let newMsg = 'error'
    if (typeof msg === 'string') {
      newMsg = msg
    } else if (typeof msg === 'object') {
      newMsg = ''
      newMsg = forObj(msg)
    }
    newChild.style.display = 'none'
    newChild.innerText = newMsg
    body.appendChild(newChild)
  }
  w.console = newConsole
}


export const device = (() => {
  let ua = navigator.userAgent
  let isAndroid = /Android\s+([\d.]+)/.test(ua)
  let isIos = /(?:iPad|iPhone).*OS\s([\d_]+)/.test(ua) && !isAndroid
  let isMobile = isAndroid || isIos
  let isWeixin = /micromessenger/.test(ua.toLowerCase())
  let isQQ = /QQBrowser/.test(ua)
  let isChrome = ua.toLowerCase().indexOf('chrome') > -1
  return {
    isAndroid,
    isIos,
    isMobile: isAndroid || isIos,
    isWeixin,
    isQQ,
    isChrome
  }
})()

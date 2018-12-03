import $script from '@/plugins/script'
/**
 * 加载css
 * @param { String } url css链接
 */
export const addCss = (url) => {
  return new Promise((resolve, reject) => {
    const node = document.createElement('link')
    node.rel = 'stylesheet'
    node.type = 'text/css'
    node.href = url
    node.onload = function () {
      resolve()
    }
    document.getElementsByTagName('head')[0].appendChild(node)
  })
}
/**
 * 加载script
 * 依赖$script
 * https://github.com/ded/script.js/
 * @param { String, Array } url script的url
 * @param { Function } cb 加载成功回调
 */
export const addScript = (url, cb) => {
  $script(url, cb)
  return $script
}

export const dateFormat = (date, format) => {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  if (typeof date === 'number') {
    if (date.toString().length === 10) {
      date *= 1000
    }
  }
  date = new Date(date)
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,
    (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

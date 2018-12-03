import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'
import Vue from 'vue'

const CancelToken = axios.CancelToken

/**
 * 消息过滤
 */
const msgFiltering = (datas) => {
  let errors = datas.errors
  let messages = []
  // errors有返回对应信息
  if (typeof errors === 'object' && !Array.isArray(errors) && errors !== null) {
    for (let name in errors) {
      messages.push(errors[name])
      // for (let i = 0, l = errors[name].length; i < l; i++) {
      //   messages.push(errors[name][i])
      // }
    }
    return messages
  } else {
    return datas.message
  }
}
/**
 * 提示
 */
const tips = (message, type) => {
  Vue.prototype.$tips({
    message,
    type
  })
}

const myAxios = axios.create({
  withCredentials: true
})
// myAxios['headers']={
//   'x-app-id': 'IJQcExfgdCru0A6D',
//   'x-version':'1.0.0'
// }
/**
 * 异步请求方法封装
 */
export const fetch = ({ headers, type, params, data, url, success, fail, error, callback, showError, useJson }) => {
  params = params || ''
  headers= headers||''
  showError = typeof showError === 'undefined' ? true : showError
  if (type === 'jsonp') {
    let datas = []
    if (params && typeof params === 'object') {
      for (let key in params) {
        datas.push(key + '=' + params[key])
      }
      datas = datas.join('&')
    }
    jsonp(url + '?' + datas, {
      // param: params,
      param: 'jsonpCallback'
    }, (err, response) => {
      callback && callback(response)
      if (err) {
        error && error()
        tips(response.message || response.msg || '请求错误', 'error')
        return false
      }
      if (response.status_code !== 200) {
        fail && fail(response)
        if (showError) {
          tips(response.message || response.msg || '请求错误', 'error')
        }
        return false
      }
      success && success(response)
    })
  } else {
    // if (type === 'get') {
    //   params = {
    //     params
    //   }
    // } else {
    //   params = qs.stringify(params)
    // }
    // myAxios[type](url, params)
    if (!useJson) {
      data = qs.stringify(data)
    }
    const source = CancelToken.source()
    const promise = myAxios({
      method: type,
      url,
      params,
      headers,
      data,
      cancelToken: source.token
    })
    .then((response) => {
      response = response.data
      callback && callback(response)
      if (response.status_code && response.status_code !== 200) {
        let msg = msgFiltering(response)
        msg = Array.isArray(msg) ? msg.join('，') : msg
        if (fail) {
          fail(response, msg)
        }
        if (showError) {
          tips(msg || response.message || response.msg || '请求错误', 'error')
        }
        return false
      }
      success && success(response)
    }).catch((e) => {
      let message = e && e.message ? e.message : '请求错误'
      console.log(message)
      error && error()
    })
    promise.$cancel = source.cancel
    return promise
  }
}

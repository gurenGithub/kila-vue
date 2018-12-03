import * as types from './mutation-types'
import { fetch } from '@/commons/fetch'
/**
 * 获取用户数据
 */
export const getUser = ({ commit }) => {
  return new Promise((resolve, reject) => {
    fetch({
      type: 'jsonp',
      //url: requestUrl.ucenterInfo,
      showError: false,
      success (response) {
        commit(types.UPDATE_USER, response.data)
        resolve(response)
      },
      fail (response) {
        reject(response)
      }
    })
  })
}

/**
 * 显示登录框
 * @param {String} type 默认是login，还有register，bindmobile
 */
let isShowLogin = false
export const showLogin = ({ commit }, type) => {
  // 防止快速点击时造成的问题
  if (isShowLogin) {
    return false
  }
  isShowLogin = true
  setTimeout(() => {
    isShowLogin = false
  }, 1000)
  type = type || 'login'
  return new Promise((resolve) => {
    
  })
}

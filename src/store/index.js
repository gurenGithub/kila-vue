import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

import common from './modules/common'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}
/**
 * 全局公用的state放这里
 * 如果是部分页面或模块独有的state放modules里
 */
const state = {
  // 用户数据
  user: {}
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    common
  }
})

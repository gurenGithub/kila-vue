import * as types from './mutation-types'
export default {
  // 用户数据
  [types.UPDATE_USER] (state, datas) {
    state.user = datas
  }
}

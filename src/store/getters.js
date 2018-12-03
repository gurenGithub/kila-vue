/**
 * 获取用户数据
 */
export const user = state => {
  return state.user
}
/**
 * 获取配置数据
 */
export const options = state => {
  return state.options
}

/**
 * 获取用户登录状态
 */
export const isLogin = state => {
  return !!Object.keys(state.user).length
}


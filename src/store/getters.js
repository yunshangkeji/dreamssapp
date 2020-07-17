const getters = {
  apiLoading: (state) => {
    return (state.api.iLoading > 0)
  },
  apiDisabled: (state) => {
    return (state.api.iDisabled > 0)
  },
  wechatCode: (state) => {
    return state.api.wechat_code
  }
}
export default getters

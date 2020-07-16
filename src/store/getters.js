const getters = {
  apiLoading: (state) => {
    return (state.api.iLoading > 0)
  },
  wechatCode: (state) => {
    return state.api.wechat_code
  }
}
export default getters

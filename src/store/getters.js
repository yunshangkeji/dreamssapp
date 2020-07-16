const getters = {
  apiLoading: (state) => {
    return (state.api.iLoading > 0)
  }
}
export default getters

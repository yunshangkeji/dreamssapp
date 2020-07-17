const state = {
  iLoading: 0,
  iDisabled: 0,
  wechat_code: ""
};

const mutations = {
  BEGIN: (state) => {
    state.iLoading++
    state.iDisabled++
  },
  END: (state, type) => {
    switch (type) {
      case ('unlock'):
        state.iDisabled--
        break;
      default:
        state.iLoading--
    }
  },
  SET: (state, oData) => {
    for (var key in oData) {
      state[key] = oData[key]
    }
  }
};

const actions = {
  begin({ commit }) {
    commit("BEGIN");
  },
  end({ commit }) {
    commit("END");
    setTimeout(function () {
      commit("END", 'unlock');
    }, 1000)
  },
  set({ commit }, oData) {
    commit("SET", oData);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

const state = {
  iLoading: 0,
  wechat_code: ""
};

const mutations = {
  BEGIN: (state) => {
    state.iLoading++
  },
  END: (state) => {
    state.iLoading--
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
    setTimeout(function () {
      commit("END");
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

import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http';
import createPersistedState from "vuex-persistedstate";  // 状态持久化插件

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ // 配置需要持久化的
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // state 公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemas: [],
    isShowTabbar: true
  },
  // 统一管理状态， 被devtools 记录状态的修改
  // mutations 第一个形参是 stata
  mutations: {
    changeCityInfo(state, data) {
      state.cityId = data.cityId
      state.cityName = data.name
    },
    saveCinemas (state,data) {
      state.cinemas = data
    },
    clearCinemas (state) {
      state.cinemas = []
    },
    isShowTabbar (state, data = true) {
      state.isShowTabbar = data
    }
  },
  // 支持异步和同步
  // actions 第一个形参是store
  actions: {
    getCinemaData (store) {
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=3666576`,
        headers: {
            'X-Host': 'mall.film-ticket.cinema.list'
        }
    }).then(res => {
        store.commit('saveCinemas', res.data.data.cinemas)
    })
    }
  }
})

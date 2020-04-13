import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import { getSession, getWXUrl, userAgent } from '../plugins/utils'

Vue.use(Vuex)

const state = {
  userInfo: getSession('userInfo') || {}, // 用户信息
  userAgent: userAgent() || {}, // 浏览器设备信息
  wxIndexUrl: getWXUrl('#/home'),
  wxLoginUrl: getWXUrl('#/login'),
  netWorkType: '' // 网络类型
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

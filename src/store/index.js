
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

import authModule from './modules/auth'
import checkoutModule from './modules/checkout'
import usertModule from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// Create a new store
const store = new Vuex.Store({
  modules: {
    auth: authModule,
    checkout: checkoutModule,
    user: usertModule
  },
  actions,
  getters,
  mutations,
  state,
  plugins: debug ? [] : []
})

export default store

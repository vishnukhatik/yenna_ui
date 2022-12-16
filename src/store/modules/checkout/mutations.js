import * as types from './types'

const mutations = {
  [types.SET_CHECKOUT_DETAILS] (state, payload) {
    state.checkoutObj = payload
  }
}
export default mutations

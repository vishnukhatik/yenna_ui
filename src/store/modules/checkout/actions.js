import * as types from './types'
export default {
  setCheckoutDetails (context, payload) {
    context.commit(types.SET_CHECKOUT_DETAILS, payload)
  },
  resetCheckoutDetails ({ commit }) {
    commit(types.SET_CHECKOUT_DETAILS, null)
  }
}

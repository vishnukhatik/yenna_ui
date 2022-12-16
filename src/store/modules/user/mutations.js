import * as types from './types'

const mutations = {
  [types.SET_BOOK_MARK] (state, payload) {
    state.bookMarkArr = payload
  }
}
export default mutations

import * as types from './types'
import store from 'src/store'
export default {
  setUser (context, payload) {
    localStorage.setItem('yenna:access_token', payload.token)
    localStorage.setItem('yenna:userType', payload.loginDetails.type)
    context.commit(types.SET_LOGIN_STATUS, true)
    context.commit(types.SET_LOGGEDIN_USER, payload.loginDetails)
    context.commit(types.SET_LOGGEDIN_USER_TYPE, payload.loginDetails.type)
  },
  resetUser ({ commit }) {
    localStorage.removeItem('yenna:access_token')
    localStorage.removeItem('yenna:userType')
    localStorage.removeItem('tempHotelSignUpInfo')
    localStorage.removeItem('yenna:LoggedInUser')
    commit(types.SET_LOGIN_STATUS, false)
    store.dispatch('user/SET_BOOK_MARK', [])
    commit(types.SET_LOGGEDIN_USER, null)
    commit(types.SET_LOGGEDIN_USER_TYPE, null)
  }
}

const initState = {
  isLoggedIn: !!localStorage.getItem('yenna:access_token'),
  LoggedInUser: JSON.parse(localStorage.getItem('yenna:LoggedInUser')),
  userType: localStorage.getItem('yenna:userType')
}

export default initState

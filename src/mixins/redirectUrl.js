export const redirectUrl = (event) => {
  let urlName = ''
  if (event === 'CUSTOMER') {
    urlName = 'USER_DASHBOARD'
  } else if (event === 'HOTEL') {
    urlName = 'AGENT_DASHBOARD'
  } else if (event === 'ADMIN') {
    urlName = 'ADMIN_DASHBOARD'
  } else {
    urlName = 'PUBLIC_HOME'
  }
  return urlName
}

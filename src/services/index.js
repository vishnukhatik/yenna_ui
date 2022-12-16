import Axios from 'axios'
import store from '../store'
import Vue from 'vue'
// import Router from '../router/index'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export function isValidResponse (resp) {
  return resp && resp.status === 200 && resp.data.status === 1
}
const config = Axios
export const WSI = config.create({
  baseURL:
    process.env.VUE_APP_API_LOCATION !== undefined
      ? Vue.prototype.$API_BASE_URL
      : Vue.prototype.$API_BASE_URL
})

WSI.interceptors.request.use(config => {
  const token = localStorage.getItem('yenna:access_token')

  config.headers.authorization = `${token}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

export class APIError {
  message;

  constructor (msg) {
    this.message = msg
  }

  get getMessage () {
    return this.message
  }
}

export const serviceMaker = async (url, method, data = {}) => {
  try {
    let result
    const APIInstance = WSI

    switch (method) {
      case 'GET': {
        result = await APIInstance.get(url)
        break
      }
      case 'POST': {
        result = await APIInstance.post(url, data)
        break
      }
      case 'PUT': {
        result = await await APIInstance.put(url, data)
        break
      }
      case 'PATCH': {
        result = await await APIInstance.patch(url, data)
        break
      }
      case 'DELETE': {
        result = await APIInstance.delete(url)
        break
      }
      default: {
        // eslint-disable-next-line no-throw-literal
        throw 'InvalidMethod'
      }
    }
    if (!isValidResponse) {
      // eslint-disable-next-line no-throw-literal
      throw 'InvalidResponse'
    }
    return result.data
  } catch (err) {
    if (err.response.status === 401) {
      store.dispatch('auth/resetUser')
      Vue.notify({
        group: 'eb-notification',
        title: 'Unauthorized Access.',
        text: 'Your Authorization Token Has Expired!',
        type: 'error',
        duration: 7000
      })
      setTimeout(() => {
        location.reload()
      }, 1500)
    }
    // tslint:disable-next-line:no-console
    throw new APIError(
      err.response.data ? err.response.data : 'Something went wrong'
    )
  }
}

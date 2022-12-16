import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'
// import { redirectUrl } from '../mixins/redirectUrl'

Vue.use(VueRouter)

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (to.meta.auth && store.state.auth.isLoggedIn) {
        if (to.meta.roles.includes(store.state.auth.userType)) {
          next()
        } else {
          Vue.notify({
            group: 'eb-notification',
            title: 'Forbidden 403',
            text: 'FAILED! Unauthorized Access. ',
            type: 'error',
            duration: 7000
          })
          // next({ name: redirectUrl(store.state.auth.userType) })
          next({ name: 'Unauthorized' })
        }
      } else {
        Vue.notify({
          group: 'eb-notification',
          title: 'FAILED! Unauthorized Access.',
          type: 'error',
          duration: 7000
        })
        next({ name: 'PUBLIC_HOME' })
      }
    } else {
      next()
    }
  })

  return Router
}

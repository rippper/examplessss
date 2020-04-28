import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'
import { setStore, userAgent, changeTitle, getSession, setSession, getWXUrl, getQueryString } from '../plugins/utils'
import { isBindWechat } from '../service/config'
import { Login } from '../service/getData'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const agent = userAgent()
router.beforeEach((to, from, next) => {
  let title = to.meta.title
  changeTitle(title)
  let code = getQueryString().code
  if (!to.meta.isSkip) {
    if (!getSession('userInfo')) {
      if (agent.weixin && isBindWechat) {
        if (!code) {
          window.location.href = getWXUrl(`#${to.fullPath}`)
        } else {
          code = code.split('#/')[0]
          Login({ Code: code })
            .then(res => {
              if (res.IsSuccess) {
                setSession('userInfo', res.Data)
                next()
              } else {
                Toast(res.Message)
                window.location.href = getWXUrl(`#/login`)
              }
            })
        }
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
  // 存入当前url
  let currentUrl = to.fullPath
  window.localStorage.setItem('currentUrl', currentUrl)
  setStore('userAgent', agent)
  store.commit('GET_USERAGENT', agent)
})

export default router

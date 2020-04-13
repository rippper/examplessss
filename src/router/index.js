import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { setStore, userAgent, changeTitle } from '../plugins/utils'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title
  changeTitle(title)
  next()
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
  // 存入当前url
  let currentUrl = to.fullPath
  window.localStorage.setItem('currentUrl', currentUrl)
  // 判断mobile weixin
  let agent = userAgent()
  setStore('userAgent', agent)
})

export default router

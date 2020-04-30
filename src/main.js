import Vue from 'vue'
import eruda from 'eruda'
import App from './App'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './service/filter'
import './style/base.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  eruda.init()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

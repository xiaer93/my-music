import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'

import 'common/less/index.less'
Vue.config.productionTip = false

// fastclick解决移动端300ms延迟
fastclick.attach(document.body)

// 图片懒加载
Vue.use(lazyload, {
  loading: require('common/image/lazy-pic.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import 'common/less/index.less'
Vue.config.productionTip = false

// fastclick解决移动端300ms延迟
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

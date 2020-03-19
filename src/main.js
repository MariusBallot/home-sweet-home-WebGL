import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Browser from 'browser-detect'

Vue.config.productionTip = false
window.browser = Browser()
console.log(window.browser)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

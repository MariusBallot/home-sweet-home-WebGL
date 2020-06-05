import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Browser from 'browser-detect'
import EventEmitter from 'EventEmitter';

Vue.config.productionTip = false
window.browser = Browser()
window.EM = new EventEmitter();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

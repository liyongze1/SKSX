import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/rest.css"
import api from "./api/index.js"
Vue.config.productionTip = false
const bus=new Vue();
Vue.prototype.$bus=bus
Vue.prototype.$api=api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

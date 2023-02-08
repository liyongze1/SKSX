import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/rest.css"
Vue.config.productionTip = false
const bus=new Vue();
Vue.prototype.$bus=bus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

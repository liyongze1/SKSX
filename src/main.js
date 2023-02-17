import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/rest.css"
import api from "./api/index.js"
import moment from "moment"
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel',JsonExcel)
Vue.config.productionTip = false
const bus=new Vue();
Vue.prototype.$bus=bus
//路由
Vue.prototype.$api=api
//时间处理
Vue.prototype.$moment=moment;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

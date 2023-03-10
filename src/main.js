import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/rest.css"
import "./permission"
import api from "./api/index.js"
import moment from "moment"
import com from "./utils/component/component"
import i18n from "./assets/language/index.js"
import 'nprogress/nprogress.css'
// import Element from 'element-ui'
Vue.use(com)
Vue.config.productionTip = false
const bus=new Vue();
Vue.prototype.$bus=bus
//路由
Vue.prototype.$api=api
//时间处理
Vue.prototype.$moment=moment;
// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// })
new Vue({
  router,
  store,
  i18n,//挂载国际化插件
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import rowData from './modules/rowData';
import login from './modules/login';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
import menu from './modules/menu';
const ROWSTATE=["rowData.rowState"]
const USERINFO=["login.userinfo"]
export default new Vuex.Store({
  modules: {
    //存储表格行数据模块
    rowData,
    //存储登陆模块
    login,
    //动态导航模块
    menu
  },
  //数据持久化
  plugins: [
    createPersistedState({
      key:"info",
      paths:{
        ROWSTATE,
        USERINFO
      }
    })
  ]
})

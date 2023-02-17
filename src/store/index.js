import Vue from 'vue'
import Vuex from 'vuex'
import rowData from './modules/rowData';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
const ROWSTATE=["rowData.rowState"]
export default new Vuex.Store({
  modules: {
    //存储表格行数据模块
    rowData,
  },
  //数据持久化
  plugins: [
    createPersistedState({
      paths:ROWSTATE
    })
  ]
})

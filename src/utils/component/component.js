// import Vue from 'vue'
//面包屑 注册全局组件
import  Breadcrumb  from '../../components/Breadcrumb/Breadcrumb.vue'
//表格
import JsonExcel from 'vue-json-excel'
export default{
    install(Vue){
        Vue.component("breadcrumb",Breadcrumb),
        Vue.component('downloadExcel',JsonExcel) 
    }
}
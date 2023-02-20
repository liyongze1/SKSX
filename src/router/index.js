import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/layout/Layout.vue"
import Login from "@/views/login/Login.vue"
import Home from '../views/layout/content/tworoute/Home.vue'
const routerPush=VueRouter.prototype.push;
VueRouter.prototype.push=function(location){
  return routerPush.call(this,location).catch(err=>{})
}
//
Vue.use(VueRouter)
export const pg=[{
  path: '/',
  component: Layout,
  redirect:"/home",
  meta:{
    title:"首页",
    isLogin:true
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta:{
        title:"首页",
        isLogin:true
      }
    }
  ]
},]
export const routes = [
  {
    path: '/login',
    name: "login",
    component: Login
  }
]
//解决 退出登录在登陆后 控制台路由命名重复警告问题
// 发现自己的name 并没有重名 ，那么一般是后台动态路由导致报错警告
//动态路由一般来说是通过后端接口返回拿到数据 ，然后在路由守卫router。beforeEach 中进行添加
//addRoutes方法仅仅是帮你注入新路由，并没有提出其他路由
const createRouter = ()=>new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const router=createRouter()
export function resetRouter(){
  const newRouter=createRouter()
  router.matcher=newRouter.matcher
}
export default router

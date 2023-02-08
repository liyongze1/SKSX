import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/layout/Layout.vue"
import Login from "@/views/login/Login.vue"
import Product from "../views/layout/content/Product.vue"
const Home=()=>import('../views/layout/content/Home.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component:Layout,
    children:[{
      path:"/product",
      name:"product",
      component:Product
    },
    {
      path:"/home",
      name:"home",
      component:Home
    },
    // {
    //   path:"/order ",
    //   name:"order ",
    //   component:""
    // },
    // {
    //   path:"/classify ",
    //   name:"classify ",
    //   component:""
    // },
    // {
    //   path:"/count ",
    //   name:"count ",
    //   component:""
    // },
    // {
    //   path:"/system ",
    //   name:"system",
    //   component:""
    // },
  
  ]
  },
  {
    path:'/login',
    name:"login",
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

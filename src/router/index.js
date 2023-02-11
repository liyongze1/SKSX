import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../views/layout/Layout.vue"
import Login from "@/views/login/Login.vue"
import Product from "../views/layout/content/product/Product.vue"
import Home from '../views/layout/content/tworoute/Home.vue'
import index from '../views/layout/content/product/propsAdd/Index.vue'
//产品管理
const Chanpin = () => import("../views/layout/content/product/product_list/Chanpin.vue")
const Chanpin_two = () => import("../views/layout/content/product/product_list/Chanpin_two.vue")
//订单管理
const Order=()=>import("../views/layout/content/order/Order.vue")
const Order_two=()=>import("../views/layout/content/order/order_list/Order_two.vue")
const Order_three=()=>import("../views/layout/content/order/order_list/Order_three.vue")
//广告分类
import Advertisement from "../views/layout/content/advertisement/Advertisement.vue"
// const Advertisement=()=>import("../views/layout/content/advertisement/Advertisement.vue")
import Advertisement_two from "../views/layout/content/advertisement/advertisement_list/Advertisement_two.vue"
import Advertisement_three from "../views/layout/content/advertisement/advertisement_list/Advertisement_three.vue"
// const Advertisement_two=()=>import("../views/layout/content/advertisement/Advertisement_two.vue")
//系统管理
const System=()=>import("../views/layout/content/system/System.vue")
const System_two=()=>import("../views/layout/content/system/system_list/System_two.vue")
const System_three=()=>import("../views/layout/content/system/system_list/System_three.vue")
//
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect:"/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: Home
      }
      , {
        path: "/product",
        name: "product",
        redirect: '/product/chanpin',
        component: Product,
        children:[{
          path: "chanpin",
          name: "chanpin",
          component: Chanpin,
        },
        {
          path:"addgoods",
          name:"addgoods",
          component:index,
          meta:{//配置高亮标识
            activeMenu:"/product/chanpin"
          }
        },
        {
          path: "chanpin_two",
          name: "chanpin_two",
          component: Chanpin_two,
        },
      ]
      },
      
      {
        path: "/order",
        name: "order",
        component: Order,
        children:[
          {
            path:"order_two",
            name:"order_two",
            component:Order_two
          },
          {
            path:"Order_three",
            name:"Order_three",
            component:Order_three
          },
        ]
      },
      {
        path:"/advertisement",
        name:"advertisement",
        component:Advertisement,
        children:[
          {
            path:"advertisement_two",
            name:"advertisement_two",
            component:Advertisement_two
          },{
            path:"advertisement_three",
            name:"advertisement_three",
            component:Advertisement_three
          },
        ]
      },
      
      {
        path:"/system",
        name:"system",
        component:System,
        children:[
          {
            path:"system_two",
            name:"system_two",
            component:System_two
          },
          {
            path:"system_three",
            name:"system_three",
            component:System_three
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: "login",
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

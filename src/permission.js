import store from "@/store"
import router ,{resetRouter}from "@/router/index"
import NProgress from "nprogress"
//配置路由全局前置守卫导航
router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log("导航守卫--------", to)
    //判断进入的路由界面是否需要登陆 不需要登陆直接进入
    //some 遍历为true直接返回true
    //判断 
    if (to.matched.length == 0 || to.matched.some(val => val.meta.isLogin)) 
    {//true需要登陆
        // 需要登陆   1.判断是否已经登陆了
        if (store.state.login.userinfo.userToken) {
            //继续判断存储的vuex里面是否有动态导航，如果没有动态导航获取动态导航
            // console.log(store.state.menu.dyMenuList.length)
            if (store.state.menu.dyMenuList.length!=0) {
                //有导航直接进入
                next()
            } else {
                //action 里面都是异步操作 premise 需要then 操作拿到return的数据
                store.dispatch("menu/getMenuList").then(res => {
                    console.log(res);
                    resetRouter()//添加路由之前 清空路由实例内容
                    res.map(item => {
                        //把导航菜单追加到路由实例上
                        router.addRoute(item)
                    })
                })
                //登陆进去获取动态导航
                next()
            }
        } else {//token为空说明没有登陆过跳转到登陆页面
            next("/login")
        }
    } else {
        next()
    }
})
//路由后置钩子
router.afterEach(()=>{
    //在即将进入新的页面前，关闭进度条
    NProgress.done()
})
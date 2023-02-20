//动态路由导航
import {userPermissionn} from "@/api/login/login"
//导入前端定义好的完整的路由信息
import { menu } from "@/router/menu"
//导入路由和基本路由信息
import router,{pg} from "@/router/index"
//导入处理菜单导航的方法
import { rules } from "@/utils/index"
import "lodash"
export default{
    namespaced:true,
    state:{
        //定义动态导航容器--存储动态导航信息
        dyMenuList:[]
    },
    mutations:{
        //设置菜单导航
        setDyMenuList(state,payload){
            state.dyMenuList=payload
        },
        //清空菜单导航
        removeDyMenuList(state){
            state.dyMenuList=[]
        }
    },
    actions:{
        //定义请求动态路由信息的接口方法
        async getMenuList({ commit, rootState}){
            console.log("rootState",rootState)
            let res=await userPermissionn({token:rootState.login.userinfo.userToken})
            console.log("后端返回的导航内容",res)
            console.log("登陆成功返回前端拆分的数据",menu)
            //处理前后端菜单导航数组  根据后端返回的导航标识匹配对应的真实的路由菜单标识
            //定义方法 进行处理数组返回一个匹配好的菜单导航
            let myMenu=rules(menu,res.data.data)
            console.log("处理好的菜单导航",myMenu)
            //存储动态菜单导航
            commit("setDyMenuList",myMenu)
            //需要把匹配好的路由数据加到首页pg里
            //还有深拷贝的问题
            //原数据去深拷贝 传给新的 新的去添加处理好的菜单
            let base=_.cloneDeep(pg) 
            base[0].children.push(...myMenu)
            console.log(base);
            //[{path:"",layout,children:}]
            //添加到路由界面
            return base
        }
    }
}
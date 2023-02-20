
import axios from "@/utils/axios"
//定义登陆接口
const login={
    //登陆
    userLogin:"/api/login",//登陆接口
    userPermissionn:"/api/permission"
}
//定义登陆方法
export function userLogin(params){
    return axios.post(login.userLogin,params);
}
export function userPermissionn(params){
    return axios.get(login.userPermissionn,{params});
}
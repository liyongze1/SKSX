import base from "./base.js"
import axios from "../utils/axios.js"
import {userLogin,userPermissionn} from "./login/login.js"
import {orderTable,orderGather,orderList,orderCancel,orderDetails} from "./order/order.js"
const api={
    //主页总销售的数据
    homeResult(){
        return axios.get(base.homeResult)
    },
    //月销售的数据
    monthData(){
        return axios.get(base.monthData)
    },
    //商品列表表格的数据
    projectList(params){
        return axios.get(base.projectList,{params})
    },
    //删除商品接口
    delProjectList(params){
        return axios.get(base.delProjectList,{params})
    },
    //搜索商品的接口
    searchGoods(params){
        return axios.get(base.searchGoods,{params})
    },
    //类目接口
    classList(params){
        return axios.get(base.classList,{params})
    },
    //上传图片接口
    image(image){
        return axios.post(base.images,image)
    },
    addGoods(params){
        console.log(params);
        return axios.get(base.addGoods,{params})
    },
    //修改图片接口
    alertData(params){
        return axios.get(base.alterData,{params})
    },
    //所有类目的接口
    allClass(){
        return axios.get(base.allClass);
    },
    //增加子类接口 cid name
    sonClass(params){
        return axios.get(base.sonClass,{params});
    },
    //删除类目接口 接收id
    delClass(params){
        return axios.get(base.delClass,{params});
    },
    //增加一级类目接口 接收一个name
    newOneClass(params){
        return axios.get(base.newOneClass,{params});
    },
    //修改类目接口 接收id和name
    alterClass(params){
        return axios.get(base.alterClass,{params});
    },
    //订单列表
    orderTable,
    orderGather,
    orderList,
    orderCancel,
    orderDetails,
    //订单汇总 id标识  
    userLogin,
    userPermissionn,
}
export default api
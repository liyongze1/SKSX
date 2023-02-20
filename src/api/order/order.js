import axios from "@/utils/axios"
const order={
    //订单列表数据获取  page
    orderTable:"/api/order/list",
    //订单汇总 id标识
    orederGather:"/api/order/changeStatus",
    //汇总清单列表 page
    orderList:"/api/order/collect",
    //撤销汇总 id
    orderCancel:"/api/order/cancel",
    //订单详情
    orderDetails:"/api/order/list/detail",
}
 //订单管理 page
export function orderTable(params){
    return axios.get(order.orderTable,{params});
}
//批量汇总  id标识 
export function orderGather(params){
    return axios.get(order.orederGather,{params});
}
//汇总清单列表 page页码
export function orderList(params){
    return axios.get(order.orderList,{params});
}
//撤销汇总 id
export function orderCancel(params){
    return axios.get(order.orderCancel,{params});
}
// 订单详情
export function orderDetails(){
    return axios.get(order.orderDetails);
}
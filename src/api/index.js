import base from "./base.js"
import axios from "../utils/axios.js"
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
    // image(image){
    //     return axios.post(base.images,image)
    // }
    addGoods(params){
        console.log(params);
        return axios.get(base.addGoods,{params})
    }
}
export default api
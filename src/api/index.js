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
    }
}
export default api
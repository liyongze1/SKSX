const base={
    //首页-销量额等数据统计/home/dataCount
    homeResult:"/api/home/dataCount",//首页统计数据
    monthData:"/api/home/format",//折线数据
    projectList:"/api/goods/projectList",//产品列表数据
    delProjectList:"/api/goods/deleteItemById",//删除数据
    searchGoods:"/api/goods/search",//搜索接口
    classList:"/api/goods/itemCategory/selectItemCategoryByParentId",//类目接口
    //图片上传接口
    images:"/api/upload",
    //商品添加
    addGoods:"/api/goods/item/insertTbItem"
}
//单一导出 图片上传
export const images="/api/upload"
export default base
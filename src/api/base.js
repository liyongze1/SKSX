const base={
    //首页-销量额等数据统计/home/dataCount
    //首页统计数据
    homeResult:"/api/home/dataCount",
    //折线数据
    monthData:"/api/home/format",
    //产品列表数据
    projectList:"/api/goods/projectList",
    //删除数据
    delProjectList:"/api/goods/deleteItemById",
    //搜索接口
    searchGoods:"/api/goods/search",
    //类目接口
    classList:"/api/goods/itemCategory/selectItemCategoryByParentId",
    //图片上传接口
    images:"/api/upload",
    //商品添加
    addGoods:"/api/goods/item/insertTbItem",
    //商品修改
    alterData:"/api/goods/item/updateTbItem",
    //所有类目
    allClass:"/api/itemCategory",
    //修改类目接口 接收id 和name
    alterClass:"/api/itemCategory/updateCategory",
    //增加子类接口 cid name
    sonClass:"/api/itemCategory/insertItemCategory",
    //删除类目接口 接收id
    delClass:"/api/content/deleteContentCategoryById",
    //新增一级类目接口 接收一个name
    newOneClass:"/api/itemCategory/insertCategory",
}
//单一导出 图片上传
export const images="/api/upload"
export default base
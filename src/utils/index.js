

//处理数据html标签显示界面
export function removeHTMLTag(htmlStr){
    let html=htmlStr
    .replace(/<img.*?>/g,"[图片]")
    .replaceAll(/<[^>]+>/g,"")
    .replace(/&nbsp;/gi,"");
    return html
}

//定义菜单匹配规则
// menu:前端定义的路由文件
// hdMenu:后端定义的路由文件
import "lodash"
export function rules (menu,hdMenu){
    let menArr=[];
    let mu=_.cloneDeep(menu)
    //遍历前端路由 判断menu里面的每一项的meta.title是不是后端里的
    //json.parse(json.stringfly()) 不能深拷贝函数
    //这里用
    mu.map(item=>{
        hdMenu.map(it=>{
            if(item.meta.title==it.name){
                // menArr.push(item)
                //继续判断下级菜单有没有
                if(item.children&&item.children.length>0){
                    item.children=rules(item.children,it.children) 
                }
                menArr.push(item)
            }
        })
    })
    return menArr
}
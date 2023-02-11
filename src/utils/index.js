import { Switch } from "element-ui";

//处理数据html标签显示界面
export function removeHTMLTag(htmlStr){
    let html=htmlStr
    .replace(/<img.*?>/g,"[图片]")
    .replaceAll(/<[^>]+>/g,"")
    .replace(/&nbsp;/gi,"");
    return html
}
//处理颜色
// export function color(path){
//     switch (path) {
//         case "chanpin":
//             return 1
//         default:
//             break;
//     }
// }
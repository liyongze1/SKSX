export default {
    state:{
        userinfo:{
            userName:"",
            userToken:""
        }
    },
    mutations: {
        //设置仓库数据
        setUserinfo(state, payload) {
            state.userinfo.userName = payload.user,
            state.userinfo.userToken=payload.token
        },
        //清空仓库数据
        delUserinfo(state, payload) {
            state.userinfo.userName = ""
            state.userinfo.userToken = ""
        }
    },
    //命名空间
    namespaced: true,
}
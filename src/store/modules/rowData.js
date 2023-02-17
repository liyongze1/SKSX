export default {
    state: {
        rowState: {},
    },
    mutations: {
        //设置仓库数据
        alterState(state, payload) {
            state.rowState = payload
            console.log(state.rowState)
        },
        //清空仓库数据
        delData(state, payload) {
            state.rowState = {}
        }
    },
    //命名空间
    namespaced: true,
}
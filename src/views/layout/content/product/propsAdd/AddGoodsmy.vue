<template>
  <div class="add_goods_page">
    <div class="add_goods_list">
      <div class="goods_list-title">
        <h3>产品类型列表</h3>
      </div>
      <el-tree :props="props" lazy :load="loadNode" @node-click="clickTree" accordion> </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        // children: "zone",
        isLeaf: "leaf",
      },
    };
  },
  created() {
    
  },
  methods: {
    clickTree(data,node,tree){
      if(!node.parent.data){
        //没有上一级打印自己的名字
        // console.log(node.data.name)
      }else{
        let className=node.parent.data.name+"/"+node.data.name
        this.$bus.$emit("className",{
          className,
          nod:node
        })
      }
    },
    //懒加载一开始就自动执行
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.classList().then((res) => {
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1){
          this.$api.classList({type:node.data.cid}).then((res) => {
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.add_goods_page {
  .add_goods_list {
    .el-tree {
      padding-left: 30px;
    }
    .goods_list-title {
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      background-color: #1e78bf;
    }
    width: 200px;
    height: 600px;
    background-color: #ffffff;
  }
}
</style>
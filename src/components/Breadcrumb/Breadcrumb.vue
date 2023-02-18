<template>
  <div>
    <el-breadcrumb separator="/" class="breadcrumb">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item,index) in navs" :key="index" :to="{path:item.path}">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    computed:{
        navs(){
            console.log("路由信息",this.$route.matched);
            //处理第一个路由信息
            let router=this.$route.matched
            router[0].path="/"
            return this.$route.matched
        }
    },
    created(){
        console.log("路由信息",this.$route.matched);
    }
};
</script>
<style>
.breadcrumb{
    padding-left: 10px;
}
</style>
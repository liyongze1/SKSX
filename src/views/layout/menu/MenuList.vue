<template>
  <div>
    <template v-for="item in data">
       <!-- 多级菜单 -->
       <el-submenu :index="item.name" :key="item.path" v-if="item.children&&item.children.length>0">
        <template slot="title">
          <i class="iconfont icon-chanpinguanli"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <!-- 判断二级导航里有没有二级导航 如果有在判断有没有二级 重复了递归-->
          <menuList :data="item.children"></menuList>
        </el-menu-item-group>
      </el-submenu>
      <!-- 一级菜单 展开的那个操作是多级菜单里面的属于一级菜单 --> 
      <!-- 两种方法 一种直接给路由配置加上前面的路径 第二种通过name编程式导航去跳 -->
      <el-menu-item :index="item.name" :key="item.path" v-else @click="upRoute(item.name)">
        <i class="iconfont icon-zhuye"></i>
        <span class="home">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  //调这个name等于调这个组件
  name:"menuList",
  props:["data"],
  methods:{
    upRoute(name){
      // console.log(this.data)
      this.$router.push({
        name
      })
    }
  }

};
</script>


<style>
</style>
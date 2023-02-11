<template>
  <div class="content" :class="{small}">
    <div class="right_header">
      <div class="right_header_icon">
        <div class="el-icon-s-fold" style="font-size:30px; line-height: 50px;" v-if="isShow" @click="showChange">
        </div>
        <div class="el-icon-s-unfold" style="font-size:30px;line-height: 50px;" v-else @click="blockChange"></div>
      </div>
      <div class="right_header_info">
        <ul class="right_header_content">
          <li class="info_item">2023年0207日 14:31:54 | </li>
          <li class="info_item">下拉菜单<i class="iconfont icon-arrow-down"></i> | </li>
          <li class="info_item">用户名 | </li>
          <li class="info_item">退出</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShow:true,
      small:false
    }
  },
  created(){
  },
  methods:{
    showChange(){
      this.isShow=!(this.isShow);
      this.small=true
      this.$bus.$emit("isShow",this.isShow)
    },
    blockChange(){
      this.isShow=!(this.isShow);
      this.small=false
      this.$bus.$emit("isShow",this.isShow)
    },
  }
}
</script>

<style lang="less">
.content{
  height: 100%;
  padding-left: 200px;
  // transform:translatey(200px) 1s;
  transition:0.2s ease-in;
  background-color: #999;
}
.right_header{
  height: 100%;
  background-color: #1e78bf;
}
.small{
  padding-left: 64px;
  transition:0.2s ease-in
  }
.right_header_icon{
  float: left;
  .el-icon-s-fold,.el-icon-s-unfold{
    color: #fff;
    font-size: 16px;
  }
}
.right_header_info{
  float: right;
  .right_header_content{
  .info_item{
    float: left;
    line-height: 50px;
    padding: 0 5px;
    color: #fff;
  }
  .info_item:last-child{
    padding: 0 10px;
  }
}
}
</style>
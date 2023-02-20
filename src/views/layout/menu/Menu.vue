<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          background-color="#112f50"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isShow"
        >
          <el-menu-item class="sk_bkcolor">
            <span class="sk_title">首客生鲜管理系统</span>
          </el-menu-item>
          <MenuList :data="dyMenuList"></MenuList>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuList from './MenuList.vue';
import { mapState } from 'vuex';
export default {
  components:{
    MenuList
  },
  data() {
    return {
      active: "",
      isShow: false,
      data: "",
    };
  },
  computed:{
    ...mapState("menu",["dyMenuList"])
  },
  //监听路由变化添加高亮色
  watch: {
    $route(to, from) {
      let { meta, name } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = name;
      }
    },
  },
  //控制收缩和回放
  created() {
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu;
    } else {
      this.active = this.$route.path;
    }
    console.log(this.$route);
    this.$bus.$on("isShow", (e) => {
      this.isShow = !e;
    });
  },
  //组件删除清空bus
  beforeDestroy() {
    this.$bus.$off("isShow");
  },
};
</script>

<style lang="less" scoped>
.home {
  font-size: 16px;
  color: #fff;
}
.sk_bkcolor {
  background-color: #0f5c94 !important;
}

.sk_title {
  font-size: 16px;
}
.iconfont {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
.el-menu {
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

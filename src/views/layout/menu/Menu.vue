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
          router
          :collapse="isShow"
        >
          <el-menu-item class="sk_bkcolor">
            <span class="sk_title">首客生鲜管理系统</span>
          </el-menu-item>

          <el-menu-item index="/home">
            <i class="iconfont icon-zhuye"></i>
            <span class="home">首页</span>
          </el-menu-item>

          <el-submenu index="/product">
            <template slot="title">
              <i class="iconfont icon-chanpinguanli"></i>
              <span>产品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/product/chanpin">产品列表</el-menu-item>
              <el-menu-item index="/product/chanpin_two">产品分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/order">
            <template slot="title">
              <i class="iconfont icon-qian4"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/order/order_one">订单列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item index="/order/order_two">订单汇总</el-menu-item>
            <el-menu-item index="/order/order_three">订单审核</el-menu-item>
          </el-submenu>
          <el-submenu index="/advertisement">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">广告分类</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/advertisement/advertisement_two"
                >选项1</el-menu-item
              >
              <el-menu-item index="/advertisement/advertisement_three"
                >选项2</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/system">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/system/system_two">选项1</el-menu-item>
              <el-menu-item index="/system/system_three">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      isShow: false,
    };
  },

  //监听路由变化添加高亮色
  watch: {
    $route(to, from) {
      let { meta, path } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = path;
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

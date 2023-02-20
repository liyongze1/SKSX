<template>
  <div class="content" :class="{ small }">
    <div class="right_header">
      <div class="right_header_icon">
        <div
          class="el-icon-s-fold"
          style="font-size: 30px; line-height: 50px"
          v-if="isShow"
          @click="showChange"
        ></div>
        <div
          class="el-icon-s-unfold"
          style="font-size: 30px; line-height: 50px"
          v-else
          @click="showChange"
        ></div>
      </div>
      <div class="right_header_info">
        <ul class="right_header_content">
          <li class="info_item">
            <span style="display: inline-block; width: 200px">{{ time }}</span>
            <span style="display: inline-block; margin: 0 5px">|</span>
          </li>
          <li class="info_item">
            <Dropdown></Dropdown>
          </li>
          <li class="info_item">
            <span >欢迎{{userinfo.userName}}</span> |
          </li>
          <li class="info_item el-icon-switch-button" style="cursor: pointer;">
            <span style="color:#fff; font-size: 16px; font-weight: 700;" @click="tuichu">退出</span></li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Dropdown from './component/Dropdown.vue';
import { mapMutations, mapState } from 'vuex';
// import { mapState,mapMutations} from "vuex";
export default {
  components: { Dropdown },
  computed:{
    ...mapState("login",["userinfo"])
    // ...mapState
  },
  data() {
    return {
      loginShow:"",
      time: "",
      isShow: true,
      small: false,
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
        },
      ],
    };
  },
  created() {

  },
  mounted() {
   
    let setTime = setInterval(
      function () {
        this.time = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
      }.bind(this),
      1000
    );
    //第二种清除定时器方法
    this.$once("hook:beforeDestroy", () => {
      clearInterval(setTime);
      this.setTime = null;
    });
  },
  //第一种清除定时器方法
  // beforeDestroy(){
  //   clearInterval(this.setTime)
  //   this.setTime=null
  // },
  methods: {
    ...mapMutations("menu",["removeDyMenuList"]),
    ...mapMutations("login",["delUserinfo"]),
    //清楚菜单导航
     //退出返回登陆页
     tuichu(){
      //删除仓库数据 仓库名
      this.removeDyMenuList()
      this.delUserinfo()
      localStorage.removeItem("info");
      //清除用户名
      // this.$store.commit("menu/removeDyMenuList")
      this.$router.push("/login")
    },
    showChange() {
      this.isShow = !this.isShow;
      this.small = !this.small;
      this.$bus.$emit("isShow", this.isShow);
    },
  },
};
</script>

<style lang="less">
.content {
  height: 100%;
  padding-left: 200px;
  // transform:translatey(200px) 1s;
  transition: 0.2s ease-in;
  background-color: #999;
}
.right_header {
  height: 100%;
  background-color: #1e78bf;
}
.small {
  padding-left: 64px;
  transition: 0.2s ease-in;
}
.right_header_icon {
  float: left;
  .el-icon-s-fold,
  .el-icon-s-unfold {
    color: #fff;
    font-size: 16px;
  }
}
.right_header_info {
  float: right;
  .right_header_content {
    .info_item {
      float: left;
      line-height: 50px;
      padding: 0 5px;
      color: #fff;
    }
    .info_item:last-child {
      padding: 0 10px;
    }
  }
}
</style>
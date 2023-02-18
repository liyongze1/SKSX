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
            <span style="display: inline-block; width: 190px">{{ time }}</span>
            <span style="display: inline-block; margin: 0 5px">|</span>
          </li>
          <li class="info_item">
            <Dropdown></Dropdown>
          </li>
          <li class="info_item">用户名 |</li>
          <li class="info_item el-icon-switch-button">退出</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Dropdown from './component/Dropdown.vue';
export default {
  components: { Dropdown },
  // computed:{
  //   time(){
  //     return dayjs().format("YYYY年MM月DD日 HH:mm:ss")
  //   }
  // },
  data() {
    return {
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
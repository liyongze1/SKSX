<template>
  <div class="layout">
    <div class="left_nav">
      <Menu></Menu>
    </div>
    <div class="right_content">
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Content from "./content/Content.vue";
import Menu from "./menu/Menu.vue";

export default {
  components: { Menu, Content },
};
</script>

<style lang="less">
.layout {
  .left_nav {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #112f50;
  }
  .right_content{
    height: 50px;
    background-color: #1e78bf;
  }
}
</style>
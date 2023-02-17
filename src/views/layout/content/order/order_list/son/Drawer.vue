<template>
  <div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="false"
      :size="drawerSize"
    >
    </el-drawer>
  </div>
</template>

<script>
export default {
  props:["drawerSize"],
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
            this.$parent.dt=false
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>
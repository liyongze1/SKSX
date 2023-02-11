<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[pageSize]"
      :page-size="100"
      layout="total, sizes,prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 100,
    },
  },
  mounted() {
    this.$on("handData", (val) => {
      if (val) {
        console.log("值传过去了", val);
      }
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(this.projectSize);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("handData", val);
      console.log(`当前页: ${val}`);
    },
  },
  data() {
    return {
      currentPage1: 1,
    };
  },
};
</script>

<style>
</style>
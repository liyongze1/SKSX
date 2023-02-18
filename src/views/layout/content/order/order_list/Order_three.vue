<template>
  <div class="shenhe">
    <breadcrumb></breadcrumb>
    <div class="orderContract">
      订单合同: <el-button type="success" @click="dialogVisible=true">查看合同</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="100%"
        :before-close="handleClose"
      >
       <Vuepdf ref="dev"></Vuepdf>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="derive"
            >导出</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vuepdf from "./vuepdf/Vuepdf.vue"
export default {
  components:{
    Vuepdf,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    derive(){
      this.$refs.dev.handleExport()
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
.orderContract {
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
</style>
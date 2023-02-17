<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="diaLogData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      dialogVisible: false,
      input: "",
    };
  },
  computed: {
    
  },
  methods: {
    //确定事件
    diaLogData() {
      console.log(this.info);
      //新增
      if (this.info.type == 1) {
        console.log(this.info);
        this.sonClass({ cid: this.info.cid, name: this.input });
        this.$parent.Chanpin_wto();
      } else if (this.info.type == 2) {
        //修改
        this.alterClass({ id: this.info.id, name: this.input });
        this.$parent.Chanpin_wto();
      } else {
        //添加一级类目
        this.newOneClass({ name: this.input });
      }
      this.dialogVisible = false;
    },
    //提示
    prompt(data, success, error) {
      if (data == 200) {
        this.$message({
          message: success,
          type: "success",
        });
      } else {
        this.$message.error(error);
      }
      console.log("计算属性");
    },
    //添加的网络请求
    async sonClass(params) {
      let sonClass = await this.$api.sonClass(params);
      console.log("新增------------", sonClass);
      this.prompt(sonClass.status,"添加成功","添加失败")
    },
    //修改的网络请求
    async alterClass(params) {
      let alterClass = await this.$api.alterClass(params);
      this.prompt(alterClass.data.status, "修改成功", "修改失败");
      console.log("修改---------", alterClass);
    },
    //添加一级类目
    async newOneClass(params) {
      let newOneClass = await this.$api.newOneClass(params);
      this.prompt(newOneClass.data.status, "修改成功", "修改失败");
      console.log("添加一级类目---------", newOneClass);
    },
  },
};
</script>

<style>
</style>
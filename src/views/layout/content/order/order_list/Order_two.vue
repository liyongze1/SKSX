<template>
  <div class="order">
    <div class="order_top_box">
      <div class="order_id_box">
        <div class="order_id">
          <span class="aaa">订单编号:</span>
          <el-input
            v-model="input"
            placeholder="输入品牌名称"
            class="oreder_id_input inp"
          ></el-input>
        </div>
        <div class="appointment_box">
          <span></span>
          <span class="demonstration">汇总时间:</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"
            class="oreder_id_input"
          >
          </el-date-picker
          >至
          <el-time-select
            v-model="time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </div>
        <div class="down_list order_id">
          <div class="down_list_user" style="margin-right: 10px">
            <span class="aaa">下单人:</span>
            <el-input
              v-model="userInput"
              placeholder="输入下单人"
              class="oreder_id_input inp"
              style="margin-left: 25px"
            ></el-input>
          </div>
          <div class="order_id">
            <span class="aaa">所属单位:</span>
            <el-input
              placeholder="输入单位名称"
              class="oreder_id_input inp"
            ></el-input>
          </div>
        </div>
        <div class="result_data">
          <div class="block">
            汇总状态：<el-cascader
              v-model="value"
              :options="options"
            ></el-cascader>
          </div>
        </div>
      </div>
      <div class="order_btn">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="oreder_midst">
      <el-button type="primary" class="aaaa">导出</el-button>
      <el-button type="danger" class="bbbb" @click="batches">批量撤销</el-button>
    </div>
    <div class="order_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="isCenter"
        ref="sel"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column
          prop="orderNum"
          label="汇总单编号"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="operator"
          label="汇总人"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话">
        </el-table-column>
        <el-table-column prop="time" align="center" label="汇总时间">
          <template slot-scope="scope">
            {{ $moment(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" align="center" label="汇总单总价格">
        </el-table-column>
        <el-table-column prop="" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="revoke(scope)">
              撤销汇总
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pangination :total="total" :pageSize="pageSize" @handData="orderList"></Pangination>
  </div>
</template>

<script>
import Pangination from "@/components/Pangination.vue";
export default {
  components: {
    Pangination,
  },
  data() {
    return {
      pageSize: 1,
      total: 10,
      //输入框
      input: "",
      userInput: "",
      //时间
      time: "",
      //日期
      value1: "",
      value: [],
      //级联
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
            },
          ],
        },
      ],
      //表格数据显示
      tableData: [],
      //点击按钮前判断
      btn: 1,
      //批量撤销
      batchesRevoke:[],
      //当前页
      page:1,
    };
  },
  created() {
    this.orderList(1);
  },
  beforeDestroy() {
    this.$bus.$off("handData");
  },
  watch:{
    tableData(val){
      if(!val){
        if(this.page>1){
          let a=this.page-1
          this.orderList(a)
        }else{
          this.orderList(1)
        }
      }
    }
  },
  methods: {
    //获取汇总清单的列表
    async orderList(page=1) {
      this.page=page
      let res = await this.$api.orderList({ page });
      console.log(res);
      if (res.status == 200) {
        (this.tableData = res.data.data),
          (this.pageSize = res.data.pageSize),
          (this.total = res.data.total);
      } else {
        (this.tableData = []), (this.pageSize = 1), (this.total = 0);
      }
    },
    //撤销汇总
    revoke(scope) {
      console.log(this.batchesRevoke);
      if(this.batchesRevoke.length>=2){
        this.$notify({
          title: '当前选择多条数据建议批量撤销',
          dangerouslyUseHTMLString: true,
          customClass:"tishi",
          message: '<input type="checkbox" name="rido" id:"show"/>不再提示',
          onClose(){
            // let a=document.querySelector("#show")
            // if(a.checked){
            //   let b=document.querySelector("tishi")
            //   b.style.display="none"
            // }
          }
        });
      }
      this.orderCancel(scope.row.id)
      console.log("当前行的id-------------",scope.row.id)
    },
    selectionChange(selection) {
      //批量撤销
      let sele=[]
      selection.map(item=>{
        sele.push(item.id);
      })
      this.batchesRevoke=sele
    },
    //批量撤销
    batches(){
      this.batchesRevoke.map(item=>{
        this.orderCancel(item)
      })
      this.orderList(this.page)
    },
    async orderCancel(id){
      let res= await this.$api.orderCancel({id})
      if(res.data.status==200){
        this.$message({
          message:"撤销成功",
          type:"success"
        })
        this.orderList(this.page)
      }else{
        this.$message.error("撤销失败")
      }
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  padding: 10px;
  background-color: #fff;
  .order_top_box {
    margin-bottom: 15px;
    height: 200px;
  }
  .order_btn {
    text-align: right;
    transform: translate(-200px, -100px);
  }
  /deep/.inp {
    width: 200px;
  }
  .oreder_id_input {
    width: 200px;
    margin-left: 10px;
  }
  .order_id {
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    .aaa {
      display: block;
      height: 100%;
      float: left;
    }
    .oreder_id_input {
      float: left;
    }
  }
  .oreder_midst {
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    .aaaa {
      width: 100px;
      background-color: orange;
      margin-right: 10px;
      border: none;
    }
  }
  .order_table {
    .isCenter {
      text-align: center;
    }
  }
}
</style>
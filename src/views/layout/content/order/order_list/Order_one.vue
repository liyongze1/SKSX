<template>
  <div class="order" ref="order">
    <breadcrumb></breadcrumb>
    <div class="order_top_box">
      <el-row>
        <el-col :span="14"><div class="order_id_box">
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
          <span class="demonstration">预定时间:</span>
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
      </div></el-col>
        <el-col :span="10"
           class="abc"><el-button type="primary">查询</el-button></el-col>
      </el-row>
    </div>
    <div class="oreder_midst">
      <el-button type="primary" class="aaaa" @click="orderGther"
        >订单汇总</el-button
      >
      <download-excel
        class="export-excel-wrapper"
        :data="DetailsForm"
        :fields="json_fields"
        :header="title"
        name="商品信息.xls"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="success" @click="derive">导出</el-button>
      </download-excel>
    </div>
    <div class="order_table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="isCenter"
        ref="sel"
        @selection-change="change"
      >
        <el-table-column type="selection" ref="one" :selectable="selectable" />
        <el-table-column
          prop="code"
          label="订单编号"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span
              @click="orderDecs(scope.row)"
              style="color: blue; cursor: pointer"
            >
              {{ scope.row.code }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ordername"
          label="下单人"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="company" align="center" label="所属单位">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话">
        </el-table-column>
        <el-table-column prop="yudingTime" align="center" label="预定时间">
          <template slot-scope="scope">
            {{ $moment(scope.row.yudingTime).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="price" align="center" label="订单总价格">
        </el-table-column>
        <el-table-column prop="huizongStatus" align="center" label="汇总状态">
          <template slot-scope="scope">
            {{ scope.row.huizongStatus == 1 ? "未汇总" : "已汇总" }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pangination
      :total="total"
      :pageSize="pageSize"
      @handData="orderTable"
    ></Pangination>
    <Drawer ref="drawer" :drawerSize="drawerSize"></Drawer>
  </div>
</template>

<script>
import "lodash";
import Pangination from "@/components/Pangination.vue";
import Drawer from "./son/Drawer.vue";
export default {
  components: {
    Pangination,
    Drawer,
  },
  watch: {
    dt(val) {
      if (val) {
        this.drawerSize = this.$refs.order.clientWidth - 10;
      }
    },
  },
  data() {
    return {
      //vue导出excel
      DetailsForm: [{}], //导出的数据
      json_fields: {
        订单编号: {
          field: "code",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        下单人: "ordername",
        所属单位: "company",
        联系电话: {
          field: "phone",
          callback: (value) => {
            return "&nbsp;" + value;
          },
        },
        预定时间: "yudingTime",
        订单总价格: "price",
        汇总状态: "huizongStatus",
      }, //映射字段
      title: "商品信息", //表格标题
      //抽屉大小
      dt: false,
      drawerSize: 0,
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
      //表格
      tableData: [{}],
      //汇总数据
      getherDataID: [],
      page: 1,
    };
  },
  created() {
    this.orderTable();
  },
  mounted() {
    //传递抽屉大小
    this.drawerSize = this.$refs.order.clientWidth - 10;
  },
  methods: {
    //导出提示
    derive() {
      this.$message({
        type: "success",
        message: "导出成功",
      });
    },
    //点击打开抽屉
    orderDecs() {
      this.dt = true;
      this.$refs.drawer.drawer = true;
    },
    //点击汇总ids
    /*
    参数：
    1. 汇总的id号 字符串
    2. 操作人--登录者
    3. 手机号 
    4. 编号随机生成
    */
    orderGther() {
      this.DetailsForm.map((row) => {
        console.log();
        this.$refs.sel.toggleRowSelection(row, true);
      });
      if (this.getherDataID.length >= 2) {
        //获取当前选中的订单 提交汇总订单  修改视图
        this.orderGatherData(this.getherDataID.join());
      } else {
        this.$alert("汇总订单至少需要2条订单信息", "汇总订单", {
          confirmButtonText: "确定",
        });
      }
    },
    //点击多选框
    change(selection) {
      //导出Excel
      this.DetailsForm = _.cloneDeep(selection);
      this.DetailsForm.map((item) => {
        item.yudingTime = this.$moment(item.yudingTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        if (item.huizongStatus == 1) {
          item.huizongStatus = "未汇总";
        } else {
          item.huizongStatus = "汇总";
        }
      });
      let arr = [];
      selection.map((item) => {
        arr.push(item.id);
      });
      this.getherDataID = arr;
    },
    //禁用按钮
    selectable(row, index) {
      if (row.huizongStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    ide(a) {
      console.log(a);
    },
    //订单列表的数据
    async orderTable(page = 1) {
      this.page = page;
      let res = await this.$api.orderTable({ page });
      if (res.data.status == 200) {
        (this.tableData = res.data.data),
          (this.total = res.data.total),
          (this.pageSize = res.data.pageSize);
      } else {
        this.tableData = [];
      }
      console.log("订单列表的数据", res);
    },
    //订单汇总网络请求
    async orderGatherData(ids) {
      let res = await this.$api.orderGather({ ids });
      if (res.data.status == 200) {
        this.orderTable(this.page);
        this.$message({
          message: "汇总成功",
          type: "success",
        });
      } else {
        this.$message.error("汇总失败");
      }
    },
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
.abc{
  position: absolute;
    top: 50px;
    left: 600px;
}
.export-excel-wrapper {
  display: inline-block;
}

</style>
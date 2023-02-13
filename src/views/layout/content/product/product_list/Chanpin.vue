<template>
  <div class="product_list">
    <div class="product_pilot">
      <router-link to="/home" class="pilot">首页</router-link>
      <router-link to="/product" class="pilot">产品管理</router-link>
      <router-link to="/chanpin" class="pilot color">产品列表</router-link>
    </div>
    <div class="product_info">
      <div class="product_info_top">
        <div class="product_name">
          <span class="name">产品名称:</span>
          <input
            type="text"
            placeholder="产品名称"
            style="border: 1px solid #dcdfe6"
            class="inp"
            @focus="a"
            @keyup.enter="change"
          />
        </div>
        <div class="product_time">
          <div class="block">
            <span class="demonstration">添加时间 </span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              size="small"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="btn">
          <button class="product_search" @click="change">查询</button>
        </div>
      </div>
      <div class="product_ac">
        <el-button type="warning el-icon-plus" @click="addGoods">添加商品</el-button>
        <el-button type="danger el-icon-delete">批量删除</el-button>
      </div>
    </div>
    <div class="product_tab">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="select"
        @select-all="select_all"
        border
        stripe
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品编号" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width=""
          align="center"
        >
          <template slot-scope="scope">
            {{ $moment(scope.row.create_time).format("YYYY-MM-DD-HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品卖点"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="num" label="商品描述" align="center">
          <template slot-scope="scope">
            {{ removeHTMLTag(scope.row.num) }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              class="el-icon-delete"
              @click="open(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pangination
        @handData="projectList"
        :total="total"
        :pageSize="pagesize"
      ></Pangination>
    </div>
  </div>
</template>

<script>
import Pangination from "@/components/Pangination.vue";
import { removeHTMLTag,color } from "@/utils/index.js";
export default {
  components: { Pangination },
  // computed:{
  //   isShow1:function(){
  //     return {
  //       color:color(this.$route.path)
  //     }
  //   }
  // },
  data() {
    return {
      isShow2:"",
      isShow3:"",
      //用户输入的数据
      searchData: "",
      total: 0,
      pagesize: 1,
      value1: "",
      //网络请求数据
      tableData: [],
      multipleSelection: [],
      //page
      page: "",
    };
  },
  //侦听器监听页面数据变化
  watch: {
    tableData(ne) {
      if (!ne) {
        console.log("跳转啦");
        let page = this.page - 1;
        if(this.total>1){
          //不渲染页面停在当前页面
          this.pagesize=1
        }else{
          this.projectList(page);
        }
      }
    },
  },
  created() {
    this.projectList();
    console.log(this.page,this.total)
  },
  methods: {
    select_all(selection){
      console.log("全选的数据",selection)
    },
    select(selection, row){
    console.log("当前行的数据",row)
  },
    addGoods(){
      this.$router.push("/product/addgoods")
    },
    //点击添加class
    // addColor(e){
    //   e.target.className=e.target.className+(" "+color)
    // },
    removeHTMLTag,
    open(id, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.id);
          //删除数据请求后台接口
          this.delProjectList(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //搜索
    change() {
      this.searchGoods(this.searchData);
    },
    a(e) {
      e.target.oninput = (e) => {
        this.searchData = e.target.value;
        if (!e.target.value) {
          let page = 1;
          this.projectList(page);
          console.log("跳转第一页啦");
        }
      };
    },
    /*网络请求 分页器的方法
    删除表格数据的方法*/
    async delProjectList(id) {
      console.log(id);
      //删除当前页
      let delProjectList = await this.$api.delProjectList({ id });
      console.log("删除数据", delProjectList.data);
      if (delProjectList.data.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功！",
        });
      }
      this.projectList(this.page);
    },
    //获取表格数据的方法
    async projectList(page = 1) {
      //设置当前页数
      this.page = page;
      let project = await this.$api.projectList({ page });
      this.tableData = project.data.data;
      //总数据和每页显示的数量
      this.pagesize = project.data.pageSize;
      this.total = project.data.total;
      console.log(project);
    },
    //搜索的接口   前端给后端传参数是按后台给的名称传递
    async searchGoods(sh) {
      let search = await this.$api.searchGoods({ search: sh });
      this.tableData = search.data.result;
      console.log(search);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="less" scoped>
.product_pilot{
  padding-left: 10px;
  font-weight: 700px;
  .color{
    color: #999;
  }
  .pilot{
    &::after{
    content: "/";
    width: 1px;
    height: 3px;
    color: #999;
    margin: 0 2px;
  }
  }
  .pilot:last-child{
    &::after{
    content: "";
  }
  }
  
}
.product_info {
  margin: 10px;
  padding: 10px;
  background: #fff;
  .product_ac {
    border: 1px solid #eee;
    padding: 10px;
  }
}
.product_info_top {
  margin-bottom: 25px;
  .btn {
    line-height: 30px;
  }
  .product_search {
    padding: 6px 10px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
  }
}
.product_name {
  float: left;
  margin-right: 10px;
  height: 30px;
  line-height: 30px;
  .name {
    margin-right: 5px;
  }
  .inp {
    width: 200px;
    height: 100%;
    border-radius: 5px;
    padding-left: 5px;
  }
}
.product_time {
  float: left;
  margin-right: 10px;
}
.product_tab {
  margin: 10px;
  background-color: #fff;
}
</style>
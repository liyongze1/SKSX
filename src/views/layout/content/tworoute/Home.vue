<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ homeResult_data.saleTotal }}</div>
        <div class="bottom">今日销售额：{{homeResult_data.sale}}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{homeResult_data.viewsTotal}}</div>
        <div class="bottom">今日访问量：{{homeResult_data.views}}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{homeResult_data.collectTotal
}}</div>
        <div class="bottom">今日销售额：{{ homeResult_data.collect }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{homeResult_data.payTotal
}}</div>
        <div class="bottom">今日支付量：{{homeResult_data.pay}}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">比例分配</div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div>111</div>
            </el-col>
            <el-col :span="8">
              <div>222</div>
            </el-col>
            <el-col :span="8">
              <div>333</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div>111</div>
            </el-col>
            <el-col :span="8">
              <div>222</div>
            </el-col>
            <el-col :span="8">
              <div>333</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data(){
    return {
      //主页顶层数据
      homeResult_data:{},
      //月销售额
      monthData:{}
    }
  },
  created(){
    this.homeResult()
  },
  methods:{
     //网络请求 ：首页的总数据
    async homeResult(){
      let homeResultData= await this.$api.homeResult();
      this.homeResult_data=homeResultData.data.data.list
      console.log(homeResultData)
      //月销售额
      let monthData=await this.$api.monthData();
      this.monthData=monthData.data.result.data
      let data={}
      data.month=[];
      data.num=[];
      data.numResult=[];
      let dataArr=[]
      this.monthData.sale_money.map(item=>{
        data.month.push(item.name)
        data.num.push(item.total_amount)
        data.numResult.push(item.num)
        //饼状图
        dataArr.push({value:item.total_amount,name:item.name})
        // data.push(item.name);
      });
      console.log(data,dataArr)
      this.monthShape(data);
      this.monthCake(dataArr);
      console.log(monthData)
    },
    //柱状图和折线图的数据
    monthShape(data){
      // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("charts"));
    // 绘制图表
    myChart.setOption({
      tooltip: {},
      xAxis: {
        data: data.month,
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: data.numResult,
        },
        {
          name: "销售额",
          type: "line",
          data: data.num,
        },
      ],
    });
    },
    monthCake(data){
      //绘制饼图
    var chartDom = document.getElementById("box1");
    var myChart = echarts.init(chartDom);
    var option
    option = {
      //鼠标放上出来的提示框里面的数据
      tooltip: {//提示框
        trigger: "item",
        formatter:'{a}-{b}</br>{d}%'
      },
      legend: {
        orient: "vertical",
        left: "left",
        // bottom:0
      },
      series: [
        {
          name: "销售额",
          type: "pie",
          radius: "50%",
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
    }
  },
  mounted() {
    
    
  },
};
</script>

<!-- 局部样式 scoaped -->
<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  padding-left: 0;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
</style>
<template>
  <div class="Chanpin_classify">
    <div class="category">
      <div class="wrapper">
        <div class="title">产品类目管理</div>
        <div class="tree">
          <!-- 一级按钮 -->
          <el-button type="warning" style="margin-bottom: 20px" @click="newOne"
            >新增一级导航类目</el-button
          >
          <!-- tree内容结构 -->
          <el-tree
            :data="data"
            :default-expand-all="true"
            :renderContent="renderContent"
            node-key="id"
            :props="defaultProps"
          >
            <span class="custom-tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
              <el-button type="text" @click="remove"></el-button>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <Dialog ref="isShow" :info="info"> </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      //title
      info: {
        title: "",
        type: 1,
      },
      //一级
      data: [],
      //二级
      defaultProps: {
        label: "name",
      },
      type: 1, //1.新增，//2 修改
    };
  },
  watch:{
    
  },
  created() {
    this.Chanpin_wto();
  },
  methods: {
    //删除网络请求
    async delClass(params){
      let delClass=await this.$api.delClass(params);
      console.log("删除提示----------",delClass)
    },
    //添加的方法
    append(data) {
      this.info.type = 1;
      this.info.title = "新增" + data.name + "分类";
      this.$refs.isShow.dialogVisible = true;
      this.info.cid = data.cid;
      console.log("添加的子节点---------", data);
    },
    //删除的方法
    remove(node, data) {
      console.log("删除的操作-------",data)
      if(data.type==1){
        this.$confirm("此操作将永久删除该目录下的所有目录是否继续",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.delClass({id:data.id})
            this.Chanpin_wto();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
          });
      }else{
        this.$confirm("此操作将删除当前目录是否继续",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.delClass({id:data.id})
            // this.Chanpin_wto();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
          });
      }
    },
    //修改
    upData(data) {
      this.info.type = 2;
      //修改弹窗
      this.info.id = data.id;
      this.$refs.isShow.input = data.name;
      this.info.title = "修改" + data.name + "分类";
      this.$refs.isShow.dialogVisible = true;
      console.log("修改的按钮", data);
    },
    //新增一级类目导航
    newOne() {
      this.info.type = 3;
      this.info.title = "请添加一级类目";
      this.$refs.isShow.dialogVisible = true;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {node.level == 1 ? (
            <span class="box">
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
                class="btn_add"
              >
                新增
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.upData(data)}
                class="btn_add"
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
                class="btn_add"
              >
                删除
              </el-button>
            </span>
          ) : (
            <span class="box box1">
              <el-button
                size="mini"
                type="text"
                on-click={() => this.upData(data)}
                class="btn_add"
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
                class="btn_add"
              >
                删除
              </el-button>
            </span>
          )}
        </span>
      );
    },
    //产品类目管理 后台接受type
    async Chanpin_wto() {
      let data = await this.$api.allClass();
      //存储一级tree
      let chanpinData = data.data.result;
      //获取一级目录
      let oneArr = [],
        twoArr = [];
      chanpinData.map((item) => {
        //type==1说明是一级
        if (item.type == 1) {
          item.children = [];
          oneArr.push(item);
        } else {
          twoArr.push(item);
        }
      });
      console.log(oneArr, twoArr);
      //继续遍历数组 拿到一级的标识与二级标识比较一样就是对应一级的二级
      oneArr.map((item) => {
        twoArr.map((ele) => {
          if (item.cid === ele.type) {
            item.children.push(ele);
          }
        });
      });
      this.data = oneArr;
      console.log(this.data)
    },
  },
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    padding: 10px;
    width: 500px;

    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }
}
/deep/.btn_add {
  color: #fff;
  padding: 5px;
  background-color: #36a0f0;
  border-radius: 5px;
}
/deep/.box {
  position: absolute;
  right: 0;
}
/deep/.box button:nth-child(3) {
  background-color: red;
}
/deep/.box > button:nth-child(1) {
  background-color: green;
}

/deep/.box1 button:nth-child(2) {
  background-color: red;
}
/deep/.box1 button:nth-child(1) {
  background-color: #36a0f0;
}
</style>
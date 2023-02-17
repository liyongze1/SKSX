<template>
  <div class="add_right">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属分类" prop="category">
        <!-- {{ 123 }} -->
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input type="text" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input type="text" v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input type="text" v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input type="text" v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="上传图片" prop="image">
        <el-upload
          :action="images"
          list-type="picture-card"
          :auto-upload="true"
          :on-success="upload"
          ref="upload"
          :file-list="imgInfo"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述" prop="descs">
        <WangEldor @sendWangEldor="sendWangEldor" ref="clear"></WangEldor>
      </el-form-item>
      <el-form-item label="首页轮播推送" style="padding-left: 10px">
        <el-switch
          v-model="ruleForm.delivery1"
          active-color="#13ce66"
          inactive-color="#999"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否推送商品" style="padding-left: 10px">
        <el-switch
          v-model="ruleForm.delivery2"
          active-color="#13ce66"
          inactive-color="#999"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否上架商品" style="padding-left: 10px">
        <el-switch
          v-model="ruleForm.delivery3"
          active-color="#13ce66"
          inactive-color="#999"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="upRooter">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { images } from "@/api/base.js";
import WangEldor from "./WangEldor.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    WangEldor,
  },
  computed: {
    ...mapState("rowData",["rowState"]),
  },
  data() {
    
    return {
      //上传图片
      images,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        cid: "",
        price: "",
        num: "",
        sellPoint: "",
        image: [],
        title: "",
        descs: "",
        category: "",
        // delivery1:false,
        // delivery2:false,
        // delivery3:false
      },
      rules: {
        category: [{ required: true, message: "请输入商品类目", trigger: "" }],
        title: [{ required: true, message: "请输入商品名称", trigger: "" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        sellpoint: [
          { required: true, message: "请输入商品卖点", trigger: "blur" },
        ],
        descs: [{ required: true, message: "请输入商品描述", trigger: "blur" }],
      },
      imgInfo: [],
      //仓库有无数据的值
      boolean: false,
    };
  },
  created() {
    console.log(this.rowState);
    //获取编辑点进来的数据Object.keys(this.rowState).length 获取对象名组成的一维数组 然后在获取长度
    if (Object.keys(this.rowState).length > 0) {
      this.boolean = true;
      let { id, title,cid ,category,sellPoint,price,num,descs,image } =
        this.rowState;
      this.ruleForm = {
        id, title,cid ,category,sellPoint,price,num,descs,image:JSON.parse(image)
      };
      console.log(this.ruleForm);
      let image_list = this.ruleForm.image;
      image_list.map((item,index) => {
        this.imgInfo.push({ name:index,url: item });
      });
      console.log("image", this.ruleForm);
    }
    //获取tree点击的数据
    this.$bus.$on("className", (data) => {
      this.ruleForm.category = data.className;
      this.ruleForm.cid = data.nod.data.cid;
    });
  },
  beforeDestroy() {
    this.$bus.$off("className");
  },
  methods: {
    //仓库方法
    ...mapMutations("rowData",["alterState","delData"]),
    //富文本编译内容
    sendWangEldor(value) {
      this.ruleForm.descs = value;
    },
    //上传图片
    //删除图片
    handleRemove(file) {
      console.log(file);
    },
    //放大查看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //下载
    handleDownload(file) {
      console.log(file);
    },
    //文件上传成功的钩子
    upload(response, file, fileList) {
      console.log(response);
      let url = response.url.slice(7),
        host = "http://localhost:8888/";
      let imgUrl = host + url;
      this.ruleForm.image.push(imgUrl);
      //blob转码
      // const base64=new Promise(resolve=>{
      //     const file=new FileReader();
      //     let str=response.url.slice(7)
      //     let blob=new Blob([str],{
      //         type:"text/plain"
      //     })
      //     // blob.text().then(res=>console.log(res));
      //     console.log(URL.createObjectURL(blob))
      //     file.onload=()=>{
      //         resolve(file.result);
      //         console.log("转码后的文件地址",file.result)
      //     }
      //     file.readAsDataURL(URL.createObjectURL(blob));
      // })
      console.log(imgUrl);
    },
    //表单 提交事件
    submitForm(formName) {
      this.$refs.ruleForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加商品 * 参数： title, image, sellPoint, price, cid, category, num, descs, paramsInfo
          console.log(this.boolean)
          //是否是修改商品和添加商品
          if (this.boolean) {
            let {
              id, title,cid ,category,sellPoint,price,num,descs,image
            } = this.ruleForm;
            console.log('image------',image);
            this.alertData({
              id, title,cid ,category,sellPoint,price,num,descs,image:JSON.stringify(image)
            });
          } else {
            let { title, image, sellPoint, price, cid, category, num, descs } =
            this.ruleForm;
            //image数组类型转换为字符串
            this.addGoods({
              title,
              image: JSON.stringify(image),
              sellPoint,
              price,
              cid,
              category,
              num,
              descs,
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加商品
    async addGoods(params) {
      this.boolean=false;
      let add = await this.$api.addGoods(params);
      console.log("添加商品", params);
    },
    //保存商品
    async alertData(params) {
      this.boolean=false;
      let alter = await this.$api.alertData(params);
      console.log("保存修改后的商品", alter);
    },
    //重置事件
    resetForm(formName) {
      console.log(formName);
      this.boolean=false;
      this.delData();
      this.$refs.upload.clearFiles();
      this.$refs[formName].resetFields();
      this.$refs.clear.html = "";
      this.ruleForm = {};
    },
    //取消
    upRooter() {
      this.boolean=false;
      //跳转上一页
      this.$router.push({ path: "/product/chanpin" });
      this.delData();
      // this.delData();
    },
  },
};
</script>
<style lang="less" scoped>
.add_right {
  width: 100%;
  float: left;
  .el-form {
    padding-right: 20px;
  }
  .el-textarea__inner {
    min-height: 50px;
    height: 100px;
  }
}
</style>
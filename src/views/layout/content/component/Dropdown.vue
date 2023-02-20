<template>
  <div>
    <el-dropdown trigger="click" @command="lang_chenge">
  <span class="el-dropdown-link" style="color:#fff">
    切换语言<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="1">中文</el-dropdown-item>
    <el-dropdown-item command="2">English</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>|
  </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        lang_chenge(command){
            if(command==1){
                //切换对应语言
                this.$i18n.locale="zh"
                console.log(this.$t("massage.userName"))
            }else{
                this.$i18n.locale="en"
            }
        }
    }
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-popper{
    margin: 0 !important;
  }
</style>
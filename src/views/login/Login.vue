<template>
  <div class="login_page">
    <div class="login_box">
      <div class="login_tit">
        <h2>欢迎登陆</h2>
      </div>
      <div class="login_userinfo">
        <div class="login_userNumber">
          <span>用户名:</span>
          <input type="text" placeholder="请输入账号" v-model.trim="num"/>
        </div>
        <div class="login_userNumber">
          密&nbsp;&nbsp;&nbsp;码:<input type="password" v-model.trim="pwd" placeholder="请输入密码" @keyup.enter="login"/>
        </div>
      </div>
      <div class="login_btn">
        <button @click="login">登陆</button>
        <button>注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data(){
    return {
      //用户名
      num:"",
      //密码
      pwd:"",
    }
  },
  created(){
    console.log(this.$store);
  },
  methods:{
    //存储登陆数据
    ...mapMutations("login",["setUserinfo"]),
    //token 正常30位左右
    //登陆 1.获取用户输入的内容 2.获取请求 3.请求成功存储信息 4.跳转页面
    login(){
      this.$api.userLogin({
        user:this.num,
        pwd:this.pwd
      }).then(res=>{
        console.log("登陆接口请求",res.data)
        this.setUserinfo({
          user:this.num,
          token:res.data.token
        })
        if(res.data.status==200){
          this.$router.push("/home")
        }
      })
      console.log("用户名",this.num,"密码",this.pwd)
    }
  }
};
</script>

<style lang="less" scoped>
.login_page{
  box-sizing: border-box;
}
.login_box {
  width: 700px;
  height: 500px;
  background-color: #999;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  transform: translateY(15%);
}
.login_tit {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
}
.login_userinfo{
  width: 300px;
  margin: 0 auto;
  padding-right: 60px;
  .login_userNumber{
    width: 100%;
    padding: 10px;
    
    input{
      width: 247px;
      height: 50px;
      font-size: 20px;
      border-radius: 3px;
    }
  }
}
.login_btn{
  width: 300px;
  margin: 0 auto;
  button{
    width: 100%;
    height: 50px;
    background-color:#666;
    color: #fff;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="userLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    computed:{
      ...mapState(['login'])
    },
    watch:{
      login(value){
        if(value){
          this.$router.push('/homePage')
        }else{
          this.$router.push('/')
        }
      }
    },
    methods: {
      userLogin() {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            let loginParams = { "userAccount":this.ruleForm2.account, "userPassword":this.ruleForm2.checkPass };
            this.$store.dispatch('userLogin',loginParams)

          } else {
            alert("用户名 和密码不能为空")
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login-container
  -webkit-border-radius 5px
  border-radius 5px
  -moz-border-radius 5px
  background-clip padding-box
  margin 180px auto
  width 350px
  padding 35px 35px 15px 35px
  background #fff
  border 1px solid #eaeaea
  box-shadow 0 0 25px #cac6c6
  .title
    margin 0px auto 40px auto
    text-align center
    color #505458
  .remember
    margin 0px 0px 35px 0px
</style>

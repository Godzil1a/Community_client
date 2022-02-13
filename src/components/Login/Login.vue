<template>
  <div>
    <el-card class="box-card">
      <h3>登录</h3>
      <el-divider></el-divider>
      <el-form :model="user" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="email">
          <el-col :span="19">
            <el-input v-model="user.code"></el-input>
          </el-col>
          <el-col :span="5">
            <el-image style="width: 100px; height: 40px" :src="kaptchaUrl"></el-image>
            <el-button type="text" @click="refreshKaptcha">刷新验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="记住我">
          <el-switch v-model="user.rememberMe"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginUser(user)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {login} from '../../api/login'
export default {
  name: 'Login',
  data () {
    return {
      kaptchaUrl: '/community/kaptcha',
      user: {
        username: '',
        password: '',
        code: '',
        rememberMe: false
      },
      rules: {}
    }
  },
  methods: {
    // submitForm (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // 调用注册方法
    //       this.register()
    //     } else {
    //       this.$notify.error({
    //         title: '错误',
    //         message: '注册信息有误！'
    //       })
    //       return false
    //     }
    //   })
    // },
    refreshKaptcha () {
      const num = Math.ceil(Math.random() * 10)
      this.kaptchaUrl = '/community/kaptcha' + '?p=' + num
    },
    loginUser (user) {
      login(user.username, user.password, user.code, user.rememberMe).then(res => {
        if (res.success === 'true') {
          console.log(res)
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      }).catch(ex => {
        this.$notify.error({
          title: '错误',
          message: '登录失败！'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

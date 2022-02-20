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
        <el-form-item label="验证码" prop="kaptcha">
          <el-col :span="17">
            <el-input v-model="user.code"></el-input>
          </el-col>
          <el-col :span="7" style="height: 40px">
            <el-image :src="kaptchaUrl"></el-image>
            <el-button type="text" @click="refreshKaptcha" style="margin: auto">刷新验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="user.rememberMe" style="float: left">记住我</el-checkbox>
          <el-button type="text" @click="refreshKaptcha" style="float: right">忘记密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {login} from '../../api/log'
import {mapActions} from 'vuex'
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
      rules: {
        username: { required: true, message: '用户名不能为空！', trigger: 'blur' },
        password: {required: true, message: '请输入密码！', trigger: 'blur'}
      }
    }
  },
  methods: {
    ...mapActions({
      stateLogin: 'login'
    }),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用注册方法
          this.loginUser(this.user)
        } else {
          this.$notify.error({
            title: '错误',
            message: '登录信息有误！'
          })
          return false
        }
      })
    },
    refreshKaptcha () {
      const num = Math.ceil(Math.random() * 10)
      this.kaptchaUrl = '/community/kaptcha' + '?p=' + num
    },
    loginUser (user) {
      login(user.username, user.password, user.code, user.rememberMe).then(res => {
        if (res.code === 200) {
          this.stateLogin({
            userId: res.userId,
            username: user.username,
            header_url: res.header_url
          })
          this.$notify({
            title: '成功',
            message: '登陆成功！',
            type: 'success'
          })
          this.$router.push('/forum')
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
.box-card{
  width: 800px;
  margin: auto;
}
</style>

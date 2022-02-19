<template>
  <div>
    <el-card class="box-card">
      <h3>注册</h3>
      <el-divider></el-divider>
      <el-form :model="user" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwordRepeat">
          <el-input v-model="user.passwordRepeat" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {registerUser} from '../../api/register'
export default {
  name: 'Register',
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        passwordRepeat: '',
        email: ''
      },
      // todo 完善校验策略
      rules: {
        username: { required: true, message: '用户名不能为空！', trigger: 'blur' },
        password: {required: true, message: '请输入密码！', trigger: 'blur'},
        passwordRepeat: [
          {required: true, message: '请再次输入密码！', trigger: 'blur'},
          {validator: checkPassword, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱！', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误！', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用注册方法
          this.register()
        } else {
          this.$notify.error({
            title: '错误',
            message: '注册信息有误！'
          })
          return false
        }
      })
    },
    register () {
      registerUser({
        username: this.user.username,
        password: this.user.password,
        email: this.user.email
      }).then(res => {
        if (res.code === 200) {
          // 注册成功，跳转
          this.$router.push({
            name: 'Redirect',
            params: {
              msg: '注册成功！我们已向您的邮箱发送了一封激活邮件，请尽快激活！',
              url: '/forum'
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.msg
          })
        }
      }).catch(ex => {
        this.$notify.error({
          title: '错误',
          message: '注册失败！'
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

<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>注册</span>
      </div>
      <el-row class="row">
        <el-col :span="6">
          <span>账号：</span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="user.username" placeholder="请输入您的账号"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6">
          <span>密码：</span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="user.password" placeholder="请输入您的密码"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6">
          <span>确认密码：</span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="user.passwordRepeat" placeholder="请再次输入密码"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="6">
          <span>邮箱：</span>
        </el-col>
        <el-col :span="18">
          <el-input v-model="user.email" placeholder="请输入您的邮箱"></el-input>
        </el-col>
      </el-row>
      <el-button type="primary">注册</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        username: '',
        password: '',
        passwordRepeat: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 800px;
  margin: auto;
}
.row{
  margin: 10px;
}
</style>

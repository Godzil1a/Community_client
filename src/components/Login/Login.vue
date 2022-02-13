<template>
  <div>
    <el-image style="width: 100px; height: 40px" :src="kaptchaUrl"></el-image>
    <el-button type="primary" @click="refreshKaptcha">刷新验证码</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      kaptchaUrl: '/api/kaptcha'
    }
  },
  methods: {
    refreshKaptcha () {
      const num = Math.ceil(Math.random() * 10)
      this.kaptchaUrl = '/api/kaptcha' + '?p=' + num
    }
  }
}
</script>

<style scoped>

</style>

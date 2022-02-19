<template>
  <div>
    <el-card>
      <img height="280" width="300" src="../assets/Sad_Frog.png">
      <h3>{{this.$route.params.msg}}</h3>
      <el-divider></el-divider>
      <span>系统将在
        <span style="color: green">
          {{timeout}}
        </span>
        秒后自动跳转！</span>
      <span>您也可以点此<router-link :to="this.$route.params.url">链接</router-link>，手动跳转！</span>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Redirect',
  data () {
    return {
      timeout: 10
    }
  },
  methods: {
    countdown () {
      this.timer = setInterval(() => {
        if (this.timeout === 0) {
          clearInterval(this.timer)
          // 跳转
          this.$router.push('/forum')
        }
        this.timeout--
      }, 1000)
    }
  },
  created () {
    this.countdown()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>

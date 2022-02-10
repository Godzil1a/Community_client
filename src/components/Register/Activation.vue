<template>
  <div></div>
</template>

<script>
import {acvitateUser} from '../../api/register'
export default {
  name: 'Activation',
  methods: {
    activation () {
      acvitateUser(this.$attrs.userId, this.$attrs.code).then(res => {
        this.$router.push({
          name: 'Redirect',
          params: {
            msg: res.msg,
            url: res.path
          }
        })
      }).catch(ex => {
        this.$router.push({
          name: 'Redirect',
          params: {
            msg: '激活失败！',
            url: '/forum'
          }
        })
      })
    }
  },
  mounted () {
    this.activation()
  }
}
</script>

<style scoped>

</style>

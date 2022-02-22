<template>
  <div>
    <el-container>
      <el-header>
        <div id="nav-type">
          <el-row>
            <el-col :span="6">
              <img height="56" width="60" src="../assets/Sad_Frog.png">
            </el-col>
            <el-col :span="6">
              <div class="myNav">
                <el-menu
                  :router="true"
                  :default-active="curPage"
                  mode="horizontal">
                  <el-menu-item index="forum" :route="{path: '/forum'}">首页</el-menu-item>
                  <el-menu-item index="2" v-show="loginStatus">消息</el-menu-item>
                  <el-menu-item index="register" v-show="!loginStatus">注册</el-menu-item>
                  <el-menu-item index="login" v-show="!loginStatus">登录</el-menu-item>
                </el-menu>
              </div>
            </el-col>
            <el-col :span="6" style="padding-top: 8px">
              <el-input style="width: 200px" v-model="searchParams" placeholder="请输入内容"></el-input>
              <el-button style="margin-left: 10px" icon="el-icon-search" circle></el-button>
            </el-col>
            <el-col :span="6" style="padding-top: 8px">
              <el-dropdown style="float: left" placement="bottom" v-show="loginStatus">
                <el-avatar shape="square" size="large" fit="cover" :src="user.header_url"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人主页</el-dropdown-item>
                  <el-dropdown-item @click.native="$router.push('/info')">账号设置</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                  <el-dropdown-item divided>{{user.username}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main class="main-page">
        <div id="main">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
        -
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {logout, getLoginStatus} from '../api/log'
export default {
  name: 'Index',
  data () {
    return {
      searchParams: ''
    }
  },
  methods: {
    ...mapActions({stateLogout: 'logout', login: 'login'}),
    logout () {
      logout()
        .then(res => {
          if (res.code === 200) {
            this.stateLogout()
            this.$notify({
              title: '成功',
              message: '已退出登录！',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '退出登录失败！'
          })
        })
    },
    initLoginStatus () {
      getLoginStatus()
        .then(res => {
          if (res.code === 200 && res.isLogin === 'true') {
            this.login({
              userId: res.userId,
              username: res.username,
              header_url: res.header_url
            })
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '获取登录信息失败！'
          })
        })
    }
  },
  computed: {
    ...mapState(['loginStatus', 'user']),
    curPage () {
      let str = this.$route.path.substring(1)
      let pos = str.lastIndexOf('/')
      return pos < 0 ? str : str.substring(0, pos)
    }
  },
  mounted () {
    this.initLoginStatus()
  }
}
</script>

<style scoped>
#nav-type{
  border-bottom: solid 1px #e6e6e6;
}
#main{
  width: 60%;
  margin: 0 auto;
}
.myNav /deep/ .el-menu{
  border-bottom: none;
}
.main-page{
  /*background-color: floralwhite;*/
}
</style>

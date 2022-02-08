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
                  :default-active="'1'"
                  mode="horizontal">
                  <el-menu-item index="1">首页</el-menu-item>
                  <el-menu-item index="2">消息</el-menu-item>
                  <el-menu-item index="3">注册</el-menu-item>
                  <el-menu-item index="4">登录</el-menu-item>
                </el-menu>
              </div>
            </el-col>
            <el-col :span="6">
              <el-input style="width: 200px" v-model="searchParams" placeholder="请输入内容"></el-input>
              <el-button icon="el-icon-search" circle></el-button>
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main class="main-page">
        <div id="main">
          <DiscussPosts></DiscussPosts>
        </div>
      </el-main>
      <el-footer>
        Footer
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import DiscussPosts from './Discuss/DiscussPosts'
export default {
  name: 'Index',
  components: {DiscussPosts},
  data () {
    return {
      searchParams: ''
    }
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
  background-color: floralwhite;
}
</style>

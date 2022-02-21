<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="18">
            <i class="el-icon-postcard" style="float: left;margin-top: 13px"></i>
            <span style="float: left;margin: 10px 10px">{{post.title}}</span>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">置顶</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">加精</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">删除</el-button>
          </el-col>
        </el-row>
        <el-container style="margin-top: 20px">
          <el-aside width="100px">
            <el-image
              style="width: 70px; height: 70px"
              :src="user.headerUrl"
              fit="cover"></el-image>
          </el-aside>
          <el-container style="text-align: left">
            <el-header style="height: 30px">{{user.username}}</el-header>
            <el-main>
              <el-row>
                <el-col :span="21">
                  发布于 {{post.createTime | dateFormat}}
                </el-col>
                <el-col :span="3">
                  赞 11 | 回帖 7
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
      </div>
      <div class="content">
        <span>
          {{post.content}}
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getDiscussPostById} from '../../api/discussPosts'
export default {
  name: 'PostDetail',
  data () {
    return {
      post: {},
      user: {}
    }
  },
  methods: {
    queryDiscussPost () {
      let id = this.$route.params.id
      getDiscussPostById(id)
        .then(res => {
          this.post = res.post
          this.user = res.user
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '获取内容失败！请重试！'
          })
        })
    }
  },
  mounted () {
    this.queryDiscussPost()
  }
}
</script>

<style scoped>
.content{
  text-align: left;
}
</style>

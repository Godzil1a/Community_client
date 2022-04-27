<template>
  <div class="post">
    <el-container>
      <el-aside width="200px">
        <a @click="$router.push(`/profile/${discussPost.user.id}`)">
          <el-image
            style="width: 100px; height: 100px; cursor: pointer"
            :src="discussPost.user.headerUrl"
            fit="cover"></el-image>
        </a>
      </el-aside>
      <el-container style="text-align: left">
        <el-header>
          <a style="cursor: pointer" @click="route">
            {{discussPost.post.title | unescape}}
          </a>
          <el-tag type="success" v-if="discussPost.post.status===1">精华</el-tag>
          <el-tag type="danger" v-if="discussPost.post.type===1">置顶</el-tag>
        </el-header>
        <el-main>
          <el-row type="flex" justify="space-between">
            <el-col :span="20">
              <a @click="$router.push(`/profile/${discussPost.user.id}`)" style="cursor: pointer; color: #088A08">{{discussPost.user.username }}</a>
               发布于 {{discussPost.post.createTime | dateFormat}}
            </el-col>
            <el-col :span="4">
              赞 {{discussPost.likeCount}} | 回复 {{discussPost.post.commentCount}}
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['discussPost'],
  methods: {
    route () {
      this.$router.push({
        path: `/post/${this.discussPost.post.id}`
      })
    }
  }
}
</script>

<style scoped>
.post{
  height: 100px;
}
</style>

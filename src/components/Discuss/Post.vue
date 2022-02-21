<template>
  <div class="post">
    <el-container>
      <el-aside width="200px">
        <el-image
          style="width: 100px; height: 100px"
          :src="discussPost.user.headerUrl"
          fit="cover"></el-image>
      </el-aside>
      <el-container style="text-align: left">
        <el-header>
          <a style="cursor: pointer" @click="route">
            {{discussPost.post.title | unescape}}
          </a>
        </el-header>
        <el-main>
          {{discussPost.user.username }} 发布于 {{discussPost.post.createTime | dateFormat}}
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

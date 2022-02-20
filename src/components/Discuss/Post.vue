<template>
  <div class="post">
<!--    todo 对发帖时间、标题、内容进行过滤-->
    <el-container>
      <el-aside width="200px">
        <el-image
          style="width: 100px; height: 100px"
          :src="discussPost.user.headerUrl"
          fit="cover"></el-image>
      </el-aside>
      <el-container style="text-align: left">
        <el-header>
          <span>
            {{discussPost.post.title}}
          </span>
        </el-header>
        <el-main>
          {{discussPost.user.username }}发布于{{discussPost.post.createTime}}
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['discussPost']
}
</script>

<style scoped>
.post{
  height: 100px;
}
</style>

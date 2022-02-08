<template>
  <div class="post">
    <el-container>
      <el-aside width="200px">
        <el-image
          style="width: 100px; height: 100px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"></el-image>
      </el-aside>
      <el-container style="text-align: left">
        <el-header>
          <span>
            {{post.title}}
          </span>
        </el-header>
        <el-main>
          {{ post.userId }}发布于{{post.createTime}}
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['post']
}
</script>

<style scoped>
.post{
  height: 100px;
}
</style>

<template>
  <div>
    <el-container>
      <el-aside width="150px">
        <el-image
          style="width: 110px; height: 110px"
          :src="comment.user.headerUrl"
          fit="cover"></el-image>
      </el-aside>
      <el-container>
        <el-header style="height: 30px">
          <el-row>
            <el-col :span="21" style="text-align: left">
              {{comment.user.username}}
            </el-col>
            <el-col :span="3">
              {{index}} #
            </el-col>
          </el-row>
        </el-header>
        <el-main style="text-align: left">
          {{comment.comment.content}}
        </el-main>
        <el-footer>
          <el-row>
            <el-col :span="20" style="text-align: left">
              发布于 {{comment.comment.createTime | dateFormat}}
            </el-col>
            <el-col :span="4">
              <el-button type="text">赞(0)</el-button>
              <el-button type="text" @click="isReply=!isReply">回复({{comment.replyCount}})</el-button>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-container>
    <div v-show="isReply" style="width: 916px;margin: 0px 0px 20px 150px">
      <reply v-for="(reply,index) in comment.replys" :key="index" :reply="reply"></reply>
      <el-row>
        <el-col :span="20">
          <el-input v-model="curComment" placeholder="请输入回复！" style="margin-left: 20px"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">回复</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// todo 回复框宽度需要进行动态设定 或者 进行重新布局
import Reply from './Reply'
export default {
  name: 'Comment',
  components: {Reply},
  props: ['comment', 'index'],
  data () {
    return {
      isReply: false,
      curComment: ''
    }
  }
}
</script>

<style scoped>

</style>

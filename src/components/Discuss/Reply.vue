<template>
  <div>
    <el-container>
      <el-header style="height: 30px">
        <span style="float: left" v-if="reply.target">{{reply.user.username}} 回复 {{reply.target.username}}:  {{reply.reply.content}}</span>
        <span style="float: left" v-else>{{reply.user.username}}:  {{reply.reply.content}}</span>
      </el-header>
      <el-main style="padding: 5px 20px 5px 20px">
        <el-row>
          <el-col :span="20" style="text-align: left">
            发布于 {{reply.reply.createTime | dateFormat}}
          </el-col>
          <el-col :span="4">
            <el-button type="text">赞(0)</el-button>
            <el-button type="text" @click="isReply=!isReply">回复(0)</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-row v-show="isReply" style="margin-bottom: 10px">
      <el-col :span="20">
        <el-input v-model="curComment" :placeholder="`回复${reply.user.username}`" style="margin-left: 20px"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">回复</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// todo 使用模块化vuex保证同一时刻只有一个回复框
export default {
  name: 'Reply',
  props: ['reply'],
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

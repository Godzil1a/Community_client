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
              {{index+1}} #
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
              <el-button type="text" @click="like(comment,2,comment.comment.id)">{{comment.likeStatus===1 ? '已赞' : '赞'}}({{comment.likeCount}})</el-button>
              <el-button type="text" @click="showReply">回复({{comment.replyCount}})</el-button>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-container>
    <div v-show="isReply" style="width: 916px;margin: 0px 0px 20px 150px">
      <div v-for="(reply,index) in comment.replys" :key="index">
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
                <el-button type="text" @click="like(reply,2,reply.reply.id)">{{reply.likeStatus===1 ? '已赞' : '赞'}}({{reply.likeCount}})</el-button>
                <el-button type="text" @click="replyIdx=index">回复(0)</el-button>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <el-row v-show="replyIdx===index" style="margin-bottom: 10px">
          <el-col :span="20">
            <el-input v-model="curComment" :placeholder="`回复${reply.user.username}`" style="margin-left: 20px"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addComment(2,reply.reply.entityId,reply.user.id)">回复</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row v-show="replyIdx<0">
        <el-col :span="20">
          <el-input v-model="curComment" placeholder="请输入回复！" style="margin-left: 20px"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addComment(2,comment.comment.id,0)">回复</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// todo 回复框宽度需要进行动态设定 或者 进行重新布局
import {insertComment} from '../../api/comment'
import {postLike} from '../../api/like'
export default {
  name: 'Comment',
  props: {
    'comment': Object,
    'index': Number,
    'queryDiscussPost': Function
  },
  data () {
    return {
      isReply: false,
      replyIdx: -1,
      curComment: ''
    }
  },
  methods: {
    showReply () {
      if (!this.isReply) {
        this.isReply = true
      } else if (this.replyIdx >= 0) {
        this.replyIdx = -1
      } else {
        this.isReply = false
      }
    },
    addComment (entityType, entityId, targetId) {
      const comment = {
        entityType: entityType,
        entityId: entityId,
        content: this.curComment,
        targetId: targetId
      }
      insertComment(comment)
        .then(res => {
          if (res === 200) {
            this.curComment = ''
            this.queryDiscussPost()
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `评论失败！${ex.message}!请重试！`
          })
        })
    },
    like (entity, entityType, entityId) {
      const data = new FormData()
      data.append('entityType', entityType)
      data.append('entityId', entityId)
      postLike(data)
        .then(res => {
          if (res.code === 200) {
            entity.likeCount = res.data.likeCount
            entity.likeStatus = res.data.likeStatus
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `点赞失败！${ex.message}!请重试！`
          })
        })
    }
  },
  watch: {
    replyIdx () {
      this.curComment = ''
    }
  }
}
</script>

<style scoped>

</style>

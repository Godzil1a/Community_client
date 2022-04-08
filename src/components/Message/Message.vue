<template>
  <div style="position: relative;width: 80%;margin: auto">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          用户私信
          <el-badge :value="unreadMessageCount" :hidden="unreadMessageCount===0"></el-badge>
        </span>
        <div v-for="(letter,index) in items" :key="index" @click="route(letter)" style="cursor: pointer">
          <el-container>
            <el-aside width="150px" style="padding-top: 10px">
              <el-badge :value="letter.unread" :hidden="letter.unread===0">
                <el-image
                  style="width: 110px; height: 110px"
                  :src="letter.target.headerUrl"
                  fit="cover"></el-image>
              </el-badge>
            </el-aside>
            <el-container>
              <el-header style="height: 85px;padding-top: 10px">
                <el-row>
                  <el-col :span="17" style="text-align: left">
                    <span style="cursor: pointer;color: #088A08">{{letter.target.username}}</span>
                  </el-col>
                  <el-col :span="7">
                    {{letter.conversation.createTime | dateFormat}}
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <el-row>
                  <el-col :span="19" style="text-align: left">
                    {{letter.conversation.content}}
                  </el-col>
                  <el-col :span="5">
                    共 {{letter.letterCount}} 条对话
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
        </div>
        <el-pagination
          @size-change="changePageSize"
          @current-change="changePage"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="jumper, prev, pager, next, sizes, total"
          :total="page.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="系统通知">
<!--        点赞-->
        <div style="cursor: pointer" @click="$router.push('/notice/detail/like')">
          <el-container>
            <el-aside width="150px" style="padding-top: 10px">
              <el-badge :value="hasLike ? notices.like.unread : 0" :hidden="!hasLike || notices.like.unread===0">
                <el-image
                  style="width: 70px; height: 70px"
                  src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-like-instagram-flatart-icons-outline-flatarticons.png"
                  fit="cover"></el-image>
              </el-badge>
            </el-aside>
            <el-container>
              <el-header style="height: 45px;padding-top: 10px">
                <el-row>
                  <el-col :span="19" style="text-align: left">
                    <span>点赞</span>
                  </el-col>
                  <el-col :span="5">
                    共 {{hasLike ? notices.like.count : 0}} 条通知
                  </el-col>
                </el-row>
              </el-header>
              <el-main v-if="hasLike">
                <el-row>
                  <el-col :span="17" style="text-align: left">
                    <span style="cursor: pointer;color: #088A08">{{notices.like.user.username}}</span>
                     点赞了你的{{notices.like.entityType === 1 ? "讨论贴" : "评论"}}
                  </el-col>
                  <el-col :span="7">
                    {{notices.like.message.createTime | dateFormat}}
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
        </div>
<!--        评论-->
        <div style="cursor: pointer" @click="$router.push('/notice/detail/comment')">
          <el-container>
            <el-aside width="150px" style="padding-top: 10px">
              <el-badge :value="hasComment ? notices.comment.unread : 0" :hidden="!hasComment || notices.comment.unread===0">
                <el-image
                  style="width: 70px; height: 70px"
                  src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/000000/external-comment-social-media-basic-1-sbts2018-outline-sbts2018.png"
                  fit="cover"></el-image>
              </el-badge>
            </el-aside>
            <el-container>
              <el-header style="height: 45px;padding-top: 10px">
                <el-row>
                  <el-col :span="19" style="text-align: left">
                    <span>评论</span>
                  </el-col>
                  <el-col :span="5">
                    共 {{hasComment ? notices.comment.count : 0}} 条通知
                  </el-col>
                </el-row>
              </el-header>
              <el-main v-if="hasComment">
                <el-row>
                  <el-col :span="17" style="text-align: left">
                    <span style="cursor: pointer;color: #088A08">{{notices.comment.user.username}}</span>
                    评论了你的{{notices.comment.entityType === 1 ? "讨论贴" : "评论"}}
                  </el-col>
                  <el-col :span="7">
                    {{notices.comment.message.createTime | dateFormat}}
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
        </div>
<!--        关注-->
        <div style="cursor: pointer" @click="$router.push('/notice/detail/follow')">
          <el-container>
            <el-aside width="150px" style="padding-top: 10px">
              <el-badge :value="hasFollow ? notices.follow.unread : 0" :hidden="!hasFollow || notices.follow.unread===0">
                <el-image
                  style="width: 70px; height: 70px"
                  src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/000000/external-Follow-social-media-bearicons-detailed-outline-bearicons.png"
                  fit="cover"></el-image>
              </el-badge>
            </el-aside>
            <el-container>
              <el-header style="height: 45px;padding-top: 10px">
                <el-row>
                  <el-col :span="19" style="text-align: left">
                    <span>关注</span>
                  </el-col>
                  <el-col :span="5">
                    共 {{hasFollow ? notices.follow.count : 0}} 条通知
                  </el-col>
                </el-row>
              </el-header>
              <el-main v-if="hasFollow">
                <el-row>
                  <el-col :span="17" style="text-align: left">
                    <span style="cursor: pointer;color: #088A08">{{notices.follow.user.username}}</span>
                    关注了你
                  </el-col>
                  <el-col :span="7">
                    {{notices.follow.message.createTime | dateFormat}}
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button style="position: absolute;right: 17px;top: 5px" type="text" icon="el-icon-edit" size="small" @click="dialogVisible=true">发送私信</el-button>
    <el-dialog
      title="私信"
      @closed="curMessage={toName: '',content: ''}"
      :visible.sync="dialogVisible"
      style="text-align: left"
      width="40%">
      <el-form label-position="top" label-width="80px" :model="curMessage" :rules="rules" ref="messageForm">
        <el-form-item label="发给：" prop="toName">
          <el-input v-model="curMessage.toName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            placeholder="请输入内容"
            v-model="curMessage.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('messageForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// todo 发送私信按钮布局待优化
// todo 通知数量提示
import {getMessageList, insertMessage, queryNoticeList} from '../../api/message'
export default {
  name: 'Message',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      unreadMessageCount: 0,
      unreadNoticeCount: 0,
      items: [],
      notices: {
        like: {},
        follow: {},
        comment: {}
      },
      dialogVisible: false,
      curMessage: {
        toName: '',
        content: ''
      },
      rules: {
        toName: { required: true, message: '用户不能为空！', trigger: 'blur' },
        content: {required: true, message: '请输入私信内容！', trigger: 'blur'}
      }
    }
  },
  methods: {
    queryMessageList () {
      getMessageList(this.page)
        .then(res => {
          if (res.code === 200) {
            this.unreadMessageCount = res.unreadCount
            this.items = res.data
            this.page = res.page
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取消息列表失败！${ex.message}请重试！`
          })
        })
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.queryMessageList()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.queryMessageList()
    },
    route (letter) {
      this.$router.push(`/message/detail/${letter.conversation.conversationId}`)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用发送方法
          this.sendMessage(this.curMessage)
        } else {
          this.$notify.error({
            title: '错误',
            message: '私信信息有误！'
          })
          return false
        }
      })
    },
    sendMessage (curMessage) {
      let message = new FormData()
      message.append('toName', curMessage.toName)
      message.append('content', curMessage.content)
      insertMessage(message)
        .then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '发送私信成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.queryMessageList()
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `私信信息有误！${ex.message}请重试！`
          })
        })
    },
    getNoticeList () {
      queryNoticeList()
        .then(res => {
          if (res.code === 200) {
            this.unreadNoticeCount = res.unreadCount
            this.notices.like = res.data.likeNotice
            this.notices.comment = res.data.commentNotice
            this.notices.follow = res.data.followNotice
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取系统通知列表失败！${ex.message}请重试！`
          })
        })
    }
  },
  mounted () {
    this.queryMessageList()
    this.getNoticeList()
  },
  computed: {
    hasLike () {
      return Object.keys(this.notices.like).length !== 0
    },
    hasComment () {
      return Object.keys(this.notices.comment).length !== 0
    },
    hasFollow () {
      return Object.keys(this.notices.follow).length !== 0
    }
  }
}
</script>

<style scoped>
.el-tabs__nav {
  width:100%
}
.el-tabs__item{
  float:left
}
</style>

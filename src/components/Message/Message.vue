<template>
  <div style="position: relative;width: 80%;margin: auto">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          用户私信
          <el-badge :value="unreadCount" :hidden="unreadCount===0"></el-badge>
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
                    {{letter.target.username}}
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
        系统通知
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
import {getMessageList, insertMessage} from '../../api/message'
export default {
  name: 'Message',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      unreadCount: 0,
      items: [],
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
            this.unreadCount = res.unreadCount
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
    }
  },
  mounted () {
    this.queryMessageList()
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

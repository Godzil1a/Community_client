<template>
  <div>
    <el-card>
      <div slot="header">
        <el-page-header @back="$router.push('/message')" :content="`来自${target.username}的私信`">
        </el-page-header>
      </div>
      <div>
        <div v-for="(obj,index) in letters" :key="index" style="margin: 20px 0 20px 0">
          <el-row type="flex" justify="space-between">
            <el-col :span="3">
              <el-image
                v-show="obj.fromUser.id===target.id"
                style="width: 70px; height: 70px;margin-top: 20px"
                :src="obj.fromUser.headerUrl"
                fit="cover"></el-image>
            </el-col>
            <el-col :span="18">
              <el-card class="box-card">
                <div slot="header">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                      <span style="float: left;cursor: pointer;color: #088A08" v-if="obj.fromUser.id===target.id" @click="$router.push(`/profile/${obj.fromUser.id}`)">
                        {{ obj.fromUser.username}}
                      </span>
                      <span style="float: left" v-else>{{ obj.letter.createTime | dateFormat}}</span>
                    </el-col>
                    <el-col :span="6">
                      <span style="float: right" v-if="obj.fromUser.id===target.id">{{obj.letter.createTime | dateFormat}}</span>
                      <span style="float: right;cursor: pointer;color: #088A08" v-else @click="$router.push(`/profile/${obj.fromUser.id}`)">
                        {{obj.fromUser.username}}
                      </span>
                    </el-col>
                  </el-row>
                </div>
                <div :style="{float: obj.fromUser.id===target.id ? 'left' : 'right', height: '40px'}">
                  {{obj.letter.content}}
                </div>
              </el-card>
            </el-col>
            <el-col :span="3">
              <el-image
                v-show="obj.fromUser.id!==target.id"
                style="width: 70px; height: 70px;margin-top: 20px"
                :src="obj.fromUser.headerUrl"
                fit="cover"></el-image>
            </el-col>
          </el-row>
        </div>
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
      <div style="margin-top: 10px">
        <el-form :model="curMessage" :rules="rules" ref="messageForm">
          <el-form-item prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="请输入内容"
              v-model="curMessage.content">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button size="small" style="float: right;margin-bottom: 15px" type="primary" @click="submitForm('messageForm')">发送</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {insertMessage, queryLetterDetail} from '../../api/message'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MessageDetail',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      target: {},
      letters: [],
      curMessage: {
        content: ''
      },
      rules: {
        content: {required: true, message: '请输入私信内容！', trigger: 'blur'}
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions({setUnreadCnt: 'setUnreadCnt'}),
    getLetterDetail () {
      const conversationId = this.$attrs.convsersationId
      queryLetterDetail(conversationId, this.page)
        .then(res => {
          if (res.code === 200) {
            this.target = res.target
            this.letters = res.letters
            this.page.total = res.count
            this.setUnreadCnt(this.user.userId)
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取私信列表失败！${ex.message}请重试！`
          })
        })
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
      message.append('toName', this.target.username)
      message.append('content', curMessage.content)
      insertMessage(message)
        .then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '发送私信成功！',
              type: 'success'
            })
            this.getLetterDetail()
            this.curMessage.content = ''
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
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.getLetterDetail()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.getLetterDetail()
    }
  },
  mounted () {
    this.getLetterDetail()
  }
}
</script>

<style scoped>

</style>

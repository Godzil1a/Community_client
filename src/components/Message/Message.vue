<template>
  <div>
    <el-tabs type="border-card" style="width: 80%;margin: auto">
      <el-tab-pane>
        <span slot="label">
          用户私信
          <el-badge :value="unreadCount" :hidden="unreadCount===0"></el-badge>
        </span>
        <div v-for="(letter,index) in items" :key="index">
          <el-container>
            <el-aside width="150px" style="padding-top: 10px">
              <el-badge :value="letter.unread">
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
  </div>
</template>

<script>
import {getMessageList} from '../../api/message'
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
      items: []
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
    }
  },
  mounted () {
    this.queryMessageList()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <el-page-header @back="$router.push('/message')" :content="pageName">
        </el-page-header>
      </div>
      <div v-if="notices.length !== 0">
        <div v-for="(obj,index) in notices" :key="index" style="margin: 20px 0 20px 0">
          <el-row type="flex" justify="space-between">
            <el-col :span="3">
              <el-image
                style="width: 70px; height: 70px;margin-top: 20px"
                :src="obj.user.headerUrl"
                fit="cover"></el-image>
            </el-col>
            <el-col :span="21">
              <el-card class="box-card">
                <div slot="header">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                      <span style="float: left;cursor: pointer;color: #088A08" @click="$router.push(`/profile/${obj.user.id}`)">
                        {{obj.user.username}}
                      </span>
                    </el-col>
                    <el-col :span="6">
                      <span style="float: right">{{obj.notice.createTime | dateFormat}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div style="float: left; height: 40px">
                  <span v-if="$attrs.topic === 'follow'">关注了你</span>
                  <span v-if="$attrs.topic === 'like'">赞了你</span>
                  <span v-if="$attrs.topic === 'comment'">回复了你</span>
<!--                  <span style="cursor: pointer;color: #409EFF" @click="$router.push($attrs.topic === 'follow' ? `/profile/${obj.notice.toId}` : `/post/${obj.notice.toId}`)">，点此查看</span>-->
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <el-empty :description="`暂无${pageName}通知`"></el-empty>
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
    </el-card>
  </div>
</template>

<script>
// todo:点我查看跳转功能
import {mapState, mapActions} from 'vuex'
import {queryNoticeDetail} from '../../api/message'
export default {
  name: 'NoticeDetail',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      target: {},
      notices: []
    }
  },
  methods: {
    ...mapActions({setUnreadCnt: 'setUnreadCnt'}),

    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.getNoticeDetail()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.getNoticeDetail()
    },
    getNoticeDetail () {
      const topic = this.$attrs.topic
      queryNoticeDetail(topic, this.page)
        .then(res => {
          if (res.code === 200) {
            this.page.total = res.data.count
            this.notices = res.data.notices
            this.setUnreadCnt(this.user.userId)
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取通知列表失败！${ex.message}请重试！`
          })
        })
    }
  },
  computed: {
    ...mapState(['user']),
    pageName () {
      return this.$attrs.topic === 'like' ? '点赞' : this.$attrs.topic === 'comment' ? '评论' : '关注'
    }
  },
  mounted () {
    this.getNoticeDetail()
  }
}
</script>

<style scoped>

</style>

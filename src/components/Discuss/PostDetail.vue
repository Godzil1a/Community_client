<template>
  <div>
<!--    帖子详情-->
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="18">
            <i class="el-icon-postcard" style="float: left;margin-top: 13px"></i>
            <span style="float: left;margin: 10px 10px">{{post.title | unescape}}</span>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">置顶</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">加精</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger">删除</el-button>
          </el-col>
        </el-row>
        <el-container style="margin-top: 20px">
          <el-aside width="100px">
            <el-image
              style="width: 70px; height: 70px"
              :src="user.headerUrl"
              fit="cover"></el-image>
          </el-aside>
          <el-container style="text-align: left">
            <el-header style="height: 30px">{{user.username}}</el-header>
            <el-main>
              <el-row>
                <el-col :span="21">
                  发布于 {{post.createTime | dateFormat}}
                </el-col>
                <el-col :span="3">
                  <el-button type="text" @click="likePost(1,post.id)">{{likeStatus===1 ? '已赞' : '赞'}} {{likeCount}}</el-button>
                   | 回帖 {{post.commentCount}}
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
      </div>
      <div class="content">
        {{post.content | unescape}}
      </div>
    </el-card>
<!--    回复-->
    <br>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="21">
            <span style="float: left;margin-top: 10px;margin-left: 20px">{{post.commentCount}} 条回帖</span>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-edit" style="float: right">发帖</el-button>
          </el-col>
        </el-row>
      </div>
      <comment v-for="(comment,index) in comments" :key="index" :comment="comment" :index="index" :query-discuss-post="queryDiscussPost"></comment>
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
    <br>
    <el-card>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10}"
        placeholder="在这里畅所欲言吧！"
        v-model="curComment">
      </el-input>
      <el-button type="primary" size="medium" style="float: right;margin: 10px 0 10px 0" @click="addComment(1)">发帖</el-button>
    </el-card>
  </div>
</template>

<script>
import {getDiscussPostById} from '../../api/discussPosts'
import {insertComment} from '../../api/comment'
import {postLike} from '../../api/like'
import Comment from './Comment'
export default {
  name: 'PostDetail',
  components: {Comment},
  data () {
    return {
      post: {},
      user: {},
      comments: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      curComment: '',
      likeCount: 0,
      likeStatus: 0
    }
  },
  methods: {
    queryDiscussPost () {
      let id = this.$route.params.id
      const page = this.page
      let offset = (page.currentPage - 1) * page.pageSize
      let limit = page.pageSize
      getDiscussPostById(id, offset, limit)
        .then(res => {
          this.post = res.post
          this.user = res.user
          this.comments = res.comments
          this.page.total = this.post.commentCount
          this.likeCount = res.likeCount
          this.likeStatus = res.likeStatus
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '获取内容失败！请重试！'
          })
        })
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.queryDiscussPost()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.queryDiscussPost()
    },
    addComment (entityType) {
      const comment = {
        entityType: entityType,
        entityId: this.post.id,
        content: this.curComment
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
    likePost (entityType, entityId) {
      const data = new FormData()
      data.append('entityType', entityType)
      data.append('entityId', entityId)
      postLike(data)
        .then(res => {
          if (res.code === 200) {
            this.likeCount = res.data.likeCount
            this.likeStatus = res.data.likeStatus
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `点赞失败！${ex.message}!请重试！`
          })
        })
    }
  },
  mounted () {
    this.queryDiscussPost()
  }
}
</script>

<style scoped>
.content{
  text-align: left;
}
</style>

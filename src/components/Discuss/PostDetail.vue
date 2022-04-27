<template>
  <div>
    <!--    帖子详情-->
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="18">
            <i class="el-icon-postcard" style="float: left;margin-top: 13px"></i>
            <span style="float: left;margin: 10px 10px">{{post.title | unescape}}</span>
            <el-tag style="float: left;margin: 5px 5px" type="success" v-if="post.status===1">精华</el-tag>
            <el-tag style="float: left;margin: 5px 5px" type="danger" v-if="post.type===1">置顶</el-tag>
          </el-col>
          <el-col :span="2">
            <el-button size="small" :type="post.type===0 ? 'danger' : 'info'" v-show="currentUser.type>=2" @click="updateType(post.id,post.type===0 ? 1 :0)">{{post.type===0 ? '置顶' : '取消置顶'}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" :type="post.status===0 ? 'danger' : 'info'" v-show="currentUser.type>=2" @click="updateStatus(post.id,post.status===0 ? 1 :0)">{{post.status===0 ? '加精' : '取消加精'}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="danger" v-show="currentUser.type>=1" @click="deletePost(post.id)">删 除</el-button>
          </el-col>
        </el-row>
        <el-container style="margin-top: 20px">
          <el-aside width="100px">
            <a @click="$router.push(`/profile/${user.id}`)">
              <el-image
                style="width: 70px; height: 70px; cursor: pointer"
                :src="user.headerUrl"
                fit="cover"></el-image>
            </a>
          </el-aside>
          <el-container style="text-align: left">
            <el-header style="height: 30px">
              <span @click="$router.push(`/profile/${user.id}`)" style="cursor: pointer;color: #088A08">
                {{user.username}}
              </span>
            </el-header>
            <el-main>
              <el-row>
                <el-col :span="21">
                  发布于 {{post.createTime | dateFormat}}
                </el-col>
                <el-col :span="3">
                  <el-button type="text" @click="likePost(1,post.id,user.id)">{{likeStatus===1 ? '已赞' : '赞'}} {{likeCount}}</el-button>
                  <el-button type="text">回帖 {{post.commentCount}}</el-button>
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
import {getDiscussPostById, setType, setStatus} from '../../api/discussPosts'
import {insertComment} from '../../api/comment'
import {postLike} from '../../api/like'
import Comment from './Comment'
import {mapState} from 'vuex'
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
    likePost (entityType, entityId, entityUserId) {
      const data = new FormData()
      data.append('entityType', entityType)
      data.append('entityId', entityId)
      data.append('entityUserId', entityUserId)
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
    },
    updateType (id, type) {
      let data = new FormData()
      data.append('id', id)
      data.append('type', type)
      setType(data)
        .then(res => {
          if (res.code === 200) {
            this.queryDiscussPost()
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `置顶失败！${ex.message}!请重试！`
          })
        })
    },
    updateStatus (id, status) {
      let data = new FormData()
      data.append('id', id)
      data.append('status', status)
      setStatus(data)
        .then(res => {
          if (res.code === 200) {
            this.queryDiscussPost()
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `加精失败！${ex.message}!请重试！`
          })
        })
    },
    deletePost (id) {
      let data = new FormData()
      data.append('id', id)
      data.append('status', 2)
      setStatus(data)
        .then(res => {
          if (res.code === 200) {
            this.$router.push('/forum')
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `删除失败！${ex.message}!请重试！`
          })
        })
    }
  },
  mounted () {
    this.queryDiscussPost()
  },
  computed: {
    ...mapState({currentUser: 'user'})
  }
}
</script>

<style scoped>
.content{
  text-align: left;
}
</style>

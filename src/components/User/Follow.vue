<template>
  <div>
    <el-card class="box-card" style="width: 80%;margin: auto">
      <el-page-header @back="goBack" :content="`${curUser.username} 的${isFollowee ? '关注页' : '粉丝页'}`">
      </el-page-header>
      <div v-for="(follow,index) in userList" :key="index" style="margin-top: 10px">
        <el-container>
          <el-aside width="150px" style="padding-top: 10px">
            <el-image
              style="width: 110px; height: 110px"
              :src="follow.entity.headerUrl"
              fit="cover"></el-image>
          </el-aside>
          <el-container>
            <el-header style="height: 85px;padding-top: 10px">
              <span style="cursor: pointer;color: #088A08;float: left" @click="$router.push(`/profile/${follow.entity.id}`)">{{follow.entity.username}}</span>
            </el-header>
            <el-main>
              <el-row>
                <el-col :span="19" style="text-align: left">
                  关注于 {{follow.followTime | dateFormat}}
                </el-col>
                <el-col :span="5">
                  <el-button v-if="follow.entity.id!==user.userId"
                             size="mini"
                             @click="setFollowStatus(3,follow.entity.id)"
                             :type="follow.isFollowing ? 'danger' : 'success'">
                    {{follow.isFollowing ? '取消关注' : '关注TA'}}
                  </el-button>
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
    </el-card>
  </div>
</template>

<script>
import {changeFollowStatus, queryFollowee, queryFollower} from '../../api/user'
import {mapState} from 'vuex'
export default {
  name: 'Follow',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      curUser: {},
      userList: []
    }
  },
  methods: {
    getFollowee (userId) {
      queryFollowee(userId, this.page)
        .then(res => {
          if (res.code === 200) {
            this.curUser = res.data.user
            this.page = res.data.page
            this.userList = res.data.list
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取用户信息失败！${ex.message}!请重试！`
          })
        })
    },
    getFollower (userId) {
      queryFollower(userId, this.page)
        .then(res => {
          if (res.code === 200) {
            this.curUser = res.data.user
            this.page = res.data.page
            this.userList = res.data.list
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取用户信息失败！${ex.message}!请重试！`
          })
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.init()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.init()
    },
    init () {
      if (this.isFollowee) {
        this.getFollowee(this.userId)
      } else {
        this.getFollower(this.userId)
      }
    },
    setFollowStatus (entityType, entityId) {
      const data = new FormData()
      data.append('entityType', entityType)
      data.append('entityId', entityId)
      changeFollowStatus(data)
        .then(res => {
          if (res.code === 200) {
            this.init()
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `操作失败！${ex.message}!请重试！`
          })
        })
    }
  },
  computed: {
    ...mapState(['user']),
    isFollowee () {
      return this.$route.params.mode === 'followee'
    },
    userId () {
      return this.$route.params.userId
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-card class="box-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="个人信息" name="info" style="padding-top: 10px">
          <el-container>
            <el-aside width="150px">
              <el-image
                style="width: 110px; height: 110px"
                :src="user.headerUrl"
                fit="cover"></el-image>
            </el-aside>
            <el-container>
              <el-header style="height: 30px">
                <el-row>
                  <el-col :span="21" style="text-align: left;color:#088A08;">
                    {{user.username}}
                  </el-col>
                  <el-col :span="3">
                    <el-button v-if="curUser.userId!==user.id" :type="isFollowing ? 'danger' : 'success'" @click="setFollowStatus(3,user.id)">{{isFollowing ? '取消关注' : '关注TA'}}</el-button>
                  </el-col>
                </el-row>
              </el-header>
              <el-main style="text-align: left">
                注册于 {{user.createTime | dateFormat}}
              </el-main>
              <el-footer>
                <el-row type="flex" justify="start" style="text-align: left">
                  <el-col :span="3">
                    关注了 <span @click="$router.push(`/follow/${user.id}/followee`)" style="cursor: pointer;color: #088A08">{{followeeCount}}</span> 人
                  </el-col>
                  <el-col :span="3">
                    关注者 <span @click="$router.push(`/follow/${user.id}/follower`)" style="cursor: pointer;color: #088A08">{{followerCount}}</span> 人
                  </el-col>
                  <el-col :span="3">
                    获得了 {{likeCount}} 个赞
                  </el-col>
                </el-row>
              </el-footer>
            </el-container>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="我的帖子" name="post">
          帖子
        </el-tab-pane>
        <el-tab-pane label="我的回复" name="comment">
          回复
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {getProfile, changeFollowStatus} from '../../api/user'
import {mapState} from 'vuex'
export default {
  name: 'Profile',
  data () {
    return {
      activeTab: 'info',
      user: {},
      likeCount: 0,
      isFollowing: false,
      followeeCount: 0,
      followerCount: 1
    }
  },
  methods: {
    queryUserProfile (userId) {
      getProfile(userId)
        .then(res => {
          if (res.code === 200) {
            this.user = res.data.user
            this.likeCount = res.data.likeCount
            this.isFollowing = res.data.isFollowing
            this.followeeCount = res.data.followeeCount
            this.followerCount = res.data.followerCount
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取用户信息失败！${ex.message}!请重试！`
          })
        })
    },
    setFollowStatus (entityType, entityId) {
      const data = new FormData()
      data.append('entityType', entityType)
      data.append('entityId', entityId)
      changeFollowStatus(data)
        .then(res => {
          if (res.code === 200) {
            this.queryUserProfile(this.$route.params.userId)
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
  mounted () {
    this.queryUserProfile(this.$route.params.userId)
  },
  computed: {
    ...mapState({
      curUser: 'user'
    })
  },
  watch: {
    $route (to, from) {
      if (to.params.userId != null && from.params.userId != null && to.params.userId !== from.params.userId) {
        this.queryUserProfile(this.$route.params.userId)
      }
    }
  }
}
</script>

<style scoped>

</style>

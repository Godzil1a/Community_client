<template>
  <div>
    <el-container>
      <el-header>
        <el-input style="width: 400px" v-model="keyword" placeholder="请输入内容"></el-input>
        <el-button style="margin-left: 10px" icon="el-icon-search" circle @click="search"></el-button>
      </el-header>
      <el-main>
        <div v-for="(post,index) in resultList" :key="index" class="post">
          <el-container>
            <el-aside width="200px">
              <a @click="$router.push(`/profile/${post.user.userId}`)">
                <el-image
                  style="width: 100px; height: 100px; cursor: pointer"
                  :src="post.user.headerUrl"
                  fit="cover"></el-image>
              </a>
            </el-aside>
            <el-container style="text-align: left">
              <el-header>
                <a style="cursor: pointer" @click="$router.push(`/post/${post.post.id}`)">
                  {{post.post.title | unescape}}
                </a>
              </el-header>
              <el-main>
                <el-row type="flex" justify="space-between">
                  <el-col :span="20">
                    <a @click="$router.push(`/profile/${post.user.id}`)" style="cursor: pointer; color: #088A08">{{post.user.username }}</a>
                    发布于 {{post.post.createTime | dateFormat}}
                  </el-col>
                  <el-col :span="4">
                    赞 {{post.likeCount}} | 回复 7
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-container>
        </div>
        <el-pagination
          v-show="page.total!==0"
          @size-change="changePageSize"
          @current-change="changePage"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="jumper, prev, pager, next, sizes, total"
          :total="page.total">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// TODO 待实现搜索内容高亮
import {searchDiscussPost} from '../../api/discussPosts'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      resultList: []
    }
  },
  methods: {
    search () {
      searchDiscussPost(this.keyword, this.page)
        .then(res => {
          if (res.code === 200) {
            this.page = res.data.page
            this.resultList = res.data.data
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `搜索失败！${ex.message}请重试！`
          })
        })
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.search()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.search()
    }
  }
}
</script>

<style scoped>

</style>

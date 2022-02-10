<template>
  <div>
    最新 最热 发帖
    <div v-for="post in discussPosts" :key="post.id" class="post">
      <Post :post="post"></Post>
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

  </div>
</template>

<script>
import Post from './Post'
import {getDiscussPosts} from '../../api/discussPosts'
export default {
  name: 'DiscussPosts',
  components: {Post},
  data () {
    return {
      discussPosts: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      }
    }
  },
  methods: {
    getDiscussPosts () {
      getDiscussPosts(this.page).then(res => {
        this.discussPosts = res.discussPosts
        this.page = res.page
      }).catch(ex => {
        this.$notify.error({
          title: '错误',
          message: '请求数据失败！'
        })
      })
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.getDiscussPosts()
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.getDiscussPosts()
    }
  },
  mounted () {
    this.getDiscussPosts()
  },
  watch: {
  }
}
</script>

<style scoped>
.post{
  margin: 10px;
}
</style>

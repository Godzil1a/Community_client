<template>
  <div>
    <el-row type="flex">
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-switch
          v-model="queryMode"
          @change="getDiscussPosts(page,queryMode)"
          :active-value="1"
          :inactive-value="0"
          active-text="最热"
          inactive-text="最新">
        </el-switch>
      </div></el-col>
      <el-col :span="18">
        <el-button style="float: right" type="primary" icon="el-icon-edit" @click="dialogVisible=true" v-if="loginStatus">发帖</el-button>
      </el-col>
    </el-row>
    <div v-for="(post,index) in discussPosts" :key="index" class="post">
      <Post :discuss-post="post"></Post>
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
    <el-dialog
      title="新帖发布"
      :visible.sync="dialogVisible"
      @close="clear"
      width="60%">
      <el-form :model="post" :rules="rules" ref="postForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="post.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="post.content">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('postForm')">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Post from './Post'
import {getDiscussPosts, addPost} from '../../api/discussPosts'
import {mapState} from 'vuex'
export default {
  name: 'DiscussPosts',
  components: {Post},
  data () {
    return {
      discussPosts: [],
      queryMode: 0,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      dialogVisible: false,
      rules: {
        title: { required: true, message: '请输入标题！', trigger: 'blur' },
        content: {required: true, message: '请输入正文！', trigger: 'blur'}
      },
      post: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    getDiscussPosts (page, queryMode) {
      getDiscussPosts(page, queryMode).then(res => {
        this.discussPosts = res.discussPosts
        this.page = res.page
      }).catch(ex => {
        this.$notify.error({
          title: '错误',
          message: `请求数据失败！${ex.message}`
        })
      })
    },
    changePageSize (curPageSize) {
      this.page.pageSize = curPageSize
      this.getDiscussPosts(this.page, this.queryMode)
    },
    changePage (curPage) {
      this.page.currentPage = curPage
      this.getDiscussPosts(this.page, this.queryMode)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发布帖子
          this.publish()
        } else {
          this.$notify.error({
            title: '错误',
            message: '登录信息有误！'
          })
          return false
        }
      })
    },
    publish () {
      let formData = new FormData()
      formData.append('title', this.post.title)
      formData.append('content', this.post.content)
      addPost(formData)
        .then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '发布成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getDiscussPosts(this.page, this.queryMode)
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '发布失败！请重试！'
          })
        })
    },
    clear () {
      this.post = {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    this.getDiscussPosts(this.page, this.queryMode)
  },
  computed: {
    ...mapState(['loginStatus'])
  }
}
</script>

<style scoped>
.post{
  margin: 10px;
}
</style>

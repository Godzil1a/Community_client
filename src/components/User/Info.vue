<template>
  <div>
    <el-card class="box-card">
      <h3>上传头像</h3>
      <el-divider></el-divider>
      <el-upload
        class="avatar-uploader"
        action="false"
        :limit="1"
        :show-file-list="false"
        :on-change="handleChange"
        :http-request="upload"
        :before-upload="beforeAvatarUpload">
<!--        <img v-if="info.header" :src="info.header" class="avatar">-->
        <el-image class="avatar" v-if="info.header" :src="info.header" fit="cover"></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
<!--      <el-form :model="info" :rules="rules" ref="headerForm" label-width="100px">-->
<!--        <el-form-item label="选择头像" prop="header_url">-->
<!--          <el-input v-model="info.header_url"></el-input>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <el-button type="primary">上传</el-button>-->
      <h3>修改密码</h3>
      <el-divider></el-divider>
      <el-form :model="info" :rules="rules" ref="passwordForm" label-width="100px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="info.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="info.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repeatPassword">
          <el-input v-model="info.repeatPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary">修改</el-button>
    </el-card>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {uploadHeader} from '../../api/user'
export default {
  name: 'UserSetting',
  data () {
    return {
      rules: {},
      info: {
        header: '',
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      file: {}
    }
  },
  methods: {
    ...mapActions({setHeader: 'setHeaderUrl'}),
    handleChange (file, fileList) {
      this.file = file
    },
    beforeAvatarUpload (file) {
      const isPic = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPic) {
        this.$message.error('上传头像图片只能是 JPG / PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPic && isLt2M
    },
    upload () {
      const form = new FormData()
      form.append('file', this.file.raw)
      form.append('userId', this.user.userId)
      uploadHeader(form)
        .then(res => {
          if (res.success === 'true') {
            this.info.header = res.header
            this.setHeader(res.header)
            this.$notify({
              title: '成功',
              message: '头像上传成功！',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.msg
            })
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: '上传头像失败！'
          })
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.box-card{
  width: 800px;
  margin: auto;
}
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin: auto;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-top: 10px;
}
</style>

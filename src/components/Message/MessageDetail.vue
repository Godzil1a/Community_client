<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="20">
            <i class="el-icon-message" style="float: left;margin-top: 13px"></i>
            <span style="float: left;margin: 10px 10px">来自 {{target.username}} 的私信</span>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="info" @click="$router.push('/message')">返回</el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="success" @click="getLetterDetail">给TA私信</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="content">
        <div  v-for="(obj,index) in letters" :key="index" style="margin: 20px 0 20px 0">
          <el-row type="flex" justify="space-between">
            <el-col :span="3">
              <el-image
                v-show="obj.fromUser.id===target.id"
                style="width: 70px; height: 70px;margin-top: 20px"
                :src="obj.fromUser.headerUrl"
                fit="cover"></el-image>
            </el-col>
            <el-col :span="18">
              <el-card class="box-card">
                <div slot="header">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="6">
                      <span style="float: left" v-if="obj.fromUser.id===target.id">{{ obj.fromUser.username}}</span>
                      <span style="float: left" v-else>{{ obj.letter.createTime | dateFormat}}</span>
                    </el-col>
                    <el-col :span="6">
                      <span style="float: right" v-if="obj.fromUser.id===target.id">{{obj.letter.createTime | dateFormat}}</span>
                      <span style="float: right" v-else>{{obj.fromUser.username}}</span>
                    </el-col>
                  </el-row>
                </div>
                <div :style="{float: obj.fromUser.id===target.id ? 'left' : 'right', height: '40px'}">
                  {{obj.letter.content}}
                </div>
              </el-card>
            </el-col>
            <el-col :span="3">
              <el-image
                v-show="obj.fromUser.id!==target.id"
                style="width: 70px; height: 70px;margin-top: 20px"
                :src="obj.fromUser.headerUrl"
                fit="cover"></el-image>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {queryLetterDetail} from '../../api/message'
export default {
  name: 'MessageDetail',
  data () {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 100
      },
      target: {},
      letters: []
    }
  },
  methods: {
    getLetterDetail () {
      const conversationId = this.$attrs.convsersationId
      queryLetterDetail(conversationId, this.page)
        .then(res => {
          if (res.code === 200) {
            this.target = res.target
            this.letters = res.letters
          } else {
            throw new Error(res.msg)
          }
        })
        .catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `获取私信列表失败！${ex.message}请重试！`
          })
        })
    }
  },
  mounted () {
    this.getLetterDetail()
  }
}
</script>

<style scoped>

</style>

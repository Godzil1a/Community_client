<template>
  <div>
    <el-descriptions title="" direction="vertical" :column="2" border>
      <el-descriptions-item label="DAU">
        <el-date-picker
          v-model="dauTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-descriptions-item>
      <el-descriptions-item :label="dau">
        <el-button type="primary" @click="getDAU(dauTime[0],dauTime[1])">统计</el-button>
      </el-descriptions-item>
      <el-descriptions-item label="UV">
        <el-date-picker
          v-model="uvTime"
          type="daterange"
          unlink-panels
          range-separator="至"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-descriptions-item>
      <el-descriptions-item :label="uv">
        <el-button type="primary" @click="getUV(uvTime[0],uvTime[1])">统计</el-button>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {queryDAU, queryUV} from '../../api/data'
export default {
  name: 'Data',
  data () {
    return {
      dau: '',
      uv: '',
      dauTime: '',
      uvTime: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    getDAU (startDate, endDate) {
      queryDAU(startDate, endDate)
        .then(res => {
          if (res.code === 200) {
            this.dau = res.data
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `查询失败！${ex.message}请重试！`
          })
        })
    },
    getUV (startDate, endDate) {
      queryUV(startDate, endDate)
        .then(res => {
          if (res.code === 200) {
            this.uv = res.data
          } else {
            throw new Error(res.msg)
          }
        }).catch(ex => {
          this.$notify.error({
            title: '错误',
            message: `查询失败！${ex.message}请重试！`
          })
        })
    }
  }
}
</script>

<style scoped>

</style>

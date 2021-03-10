<template>
  <div>
    <el-calendar v-model="value"></el-calendar>
    <el-dialog title="课程信息" :visible.sync="dialogVisible" width="60%">
      <HourList></HourList>
    </el-dialog>
  </div>
</template>

<script>
import HourList from '../../components/hour/HourList.vue'
export default {
  components: { HourList },
  name: 'Hour',
  data () {
    return {
      dialogVisible: false,
      value: new Date()
    }
  },
  created () {
    this.calendar(this.value)
  },
  mounted () {},
  methods: {
    // 初始化加载
    calendar (valmonth) {
      console.log(valmonth)
      this.$http.get('/coursetables/search', { month: this.$moment.dateFormat('yyyy-MM', valmonth), page: 1 }, success => {
        console.log(success)
      }, failure => {
        console.log('课程汇总数据请求失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

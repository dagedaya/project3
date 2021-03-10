<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
      <el-form-item label="联系方式">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.resource">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="出生日期">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
      <el-form-item label="学员编号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'StudentList',
  data () {
    return {
      // 绑定数据
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>

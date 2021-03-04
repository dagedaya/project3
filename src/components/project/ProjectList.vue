<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="课程名称：">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="收费模式：">
      <el-radio-group v-model="form.resource">
        <el-radio label="按课时收费"></el-radio>
        <el-radio label="按期收费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="单价：">
      <el-input v-model="form.name" class="inner"></el-input>&nbsp;&nbsp;元/课时
    </el-form-item>
    <el-form-item label="上课模式：">
      <el-radio-group v-model="form.resource">
        <el-radio label="一对一"></el-radio>
        <el-radio label="集体班"></el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.el-input{
  width: 80%;
}
</style>
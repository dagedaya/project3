<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item>
      <el-radio-group v-model="form.resource">
        <el-radio label="出勤"></el-radio>
        <el-radio label="迟到"></el-radio>
        <el-radio label="请假"></el-radio>
        <el-radio label="旷课"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-input type="textarea" v-model="form.desc" placeholder="备注"></el-input>
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

<style lang="less" scoped>
.el-textarea{
  width: 80%;
}
</style>
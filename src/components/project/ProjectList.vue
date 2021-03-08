<template>
  <el-form ref="form" :v-model="form" label-width="100px">
    <el-form-item label="课程名称：">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="收费模式：">
      <el-radio-group v-model="form.pricetype">
        <el-radio label="按课时收费"></el-radio>
        <el-radio label="按期收费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="单价：">
      <el-input v-model="form.price" class="inner"></el-input>&nbsp;&nbsp;元/课时
    </el-form-item>
    <el-form-item label="上课模式：">
      <el-radio-group v-model="form.mode">
        <el-radio label="一对一"></el-radio>
        <el-radio label="集体班"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-button type="primary preservation" @click="loaddata">{{form.id==undefined?"添加":'修改'}}</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pricetype: "",
        price: 0.0,
        mode: "",
      }
    };
  },
  mounted() {
  },
  methods: {
    // 封装添加数据
    restModel() {
      this.form = [];
    },
    // 添加
    loaddata() {
      console.log(this.form)
      this.$http.post(
        "/courses/add",
        this.form,
        success => {
          console.log(success)
          // 添加成功
          this.restModel();
          this.$emit("PorListChild");
          this.$message({
            message: "添加成功",
            type: "success"
          });
        },
        failrue => {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 80%;
}
</style>
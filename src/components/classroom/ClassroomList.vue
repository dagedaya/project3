<template>
  <div class="classroom">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="教室名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-button
        type="primary preservation"
        @click="classroomAdd(form)"
      >{{form.id==""||form.id==undefined?"添加":'修改'}}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 0为添加 否则为删除
        id: 0,
        // 教室名称：
        name: ""
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入教室名称", trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 添加教室
    classroomAdd(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post(
            "/classrooms/add",
            this.form,
            success => {
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
              this.form = [];
              this.$emit("classroomChild");
            },
            failrue => {
              this.$message({
                error: "添加失败"
              });
            }
          );
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.classroom {
  .el-input {
    width: 80%;
  }
}
</style>

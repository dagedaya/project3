<template>
  <div class="projectList">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="课程名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="收费模式：" prop="pricetype">
        <el-radio-group v-model="form.pricetype">
          <el-radio label="按课时收费"></el-radio>
          <el-radio label="按期收费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="单价：" prop="price">
        <el-input v-model="form.price" class="inner"></el-input>&nbsp;&nbsp;元/课时
      </el-form-item>
      <el-form-item label="上课模式：" prop="mode">
        <el-radio-group v-model="form.mode">
          <el-radio label="一对一"></el-radio>
          <el-radio label="集体班"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button
        type="primary preservation"
        @click="loaddata(form)"
      >{{form.id==undefined?"添加":'修改'}}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 课程名称：
        name: "",
        // 收费模式：
        pricetype: "",
        // 单价：
        price: 0.0,
        // 上课模式：
        mode: ""
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        pricetype: [
          { required: true, message: "请选择收费模式", trigger: "change" }
        ],
        price: [{ required: true, message: "单价不能为空", trigger: "blur" }],
        mode: [{ required: true, message: "请选择上课模式", trigger: "change" }]
      }
    };
  },
  mounted() {},
  methods: {
    // 添加
    loaddata(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const that = this;
          const data = JSON.stringify(this.form);
          this.$http.post(
            "/courses/add",
            data,
            success => {
              console.log(success);
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 封装添加数据
    restModel() {
      this.form = {};
    }
  }
};
</script>

<style lang="less" scoped>
.projectList {
  .el-input {
    width: 80%;
  }
}
</style>

<template>
  <div class="projectList">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="密码：" prop="pass">
        <el-input v-model="form.pass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" autocomplete="off" prop="passcheck">
        <el-input v-model="form.passcheck" type="password"></el-input>
      </el-form-item>
      <el-button type="primary preservation" @click="loaddata(form)">提交</el-button>
      <el-button @click="retset(form)">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var new_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.passcheck !== "") {
          this.$refs.form.validateField("passcheck");
        }
        callback();
      }
    };
    var userPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        // 密码
        pass: "",
        // 确认密码
        passcheck: ""
      },
      // 表单验证
      rules: {
        pass: [{ validator: new_password, trigger: "blur" }],
        passcheck: [{ validator: userPassWord, trigger: "change" }]
      }
    };
  },
  mounted() {},
  methods: {
    // 重置账号密码
    loaddata(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http.post(
            "/company/changepass",
            { id: this.form.id, pass: this.form.pass },
            success => {
              console.log(success);
              this.$message({
                message: "重置成功",
                type: "success"
              });
              this.$emit('accountChild')
            },
            failure => {
              this.$message({
            message: "重置失败",
            type: "error"
          });
            }
          );
        }
      });
    },
    // 重置按钮
      retset(form) {
      this.$refs.form.resetFields();
    },
  }
};
</script>
<style>
.el-dialog {
  overflow: hidden;
  height: auto;
}
</style>
<style lang="less" scoped>
.projectList {
  .el-input {
    width: 80%;
  }
}
</style>

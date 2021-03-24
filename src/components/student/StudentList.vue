<template>
  <div class="student">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      <el-form-item label="学员编号" prop="num">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-button
        class="button-box"
        type="primary"
        @click="studentAdd(form)"
      >{{form.id==""||form.id==undefined?"保存":"修改"}}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "StudentList",
  data() {
    return {
      // 绑定数据
      form: {
        // 名字
        name: "",
        // 电话
        tel: "",
        // 性别
        sex: "",
        // 出生日期
        birthday: "",
        // 学员编号
        num: "",
        // 备注
        remarks: ""
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        birthday: [{ required: true, message: "请输入生日", trigger: "blur" }],
        num: [{ required: true, message: "请输入编号", trigger: "blur" }],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    restModel() {
      // 添加列表清空
      this.form = [];
    },
    // 添加学员数据
    studentAdd(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = JSON.stringify(this.form);
          this.$http.post(
            "/students/add",
            data,
            success => {
              this.restModel();
              this.$emit("studentChild");
              // 弹框
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
            },
            failure => {
              // 弹框
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
    }
  }
};
</script>

<style lang="less">
.student {
  .el-input__inner {
    border: 1px solid #ececec;
    margin-top: 1px;
    height: 33px;
    width: 300px;
  }
  .el-button {
    // background-color: #409eff;
    color: #fff;
  }
}
</style>

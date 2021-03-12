<template>
  <div class="student">
    <el-form ref="form" v-model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-input v-model="form.birthday"></el-input>
      </el-form-item>
      <el-form-item label="学员编号">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-button
        class="button-box"
        type="primary"
        @click="studentAdd"
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
    studentAdd() {
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
    }
  }
};
</script>

<style lang="less">
.student{
.el-input__inner{
  border:1px solid #b9c5dd;
  margin-top:1px;
}
.el-button{
  // background-color: #409eff;
  color:#fff;
}
}
</style>

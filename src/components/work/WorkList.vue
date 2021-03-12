<template>
  <div class="workList">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-radio-group v-model="form.status">
          <el-radio name="rad" label="0">未签到</el-radio>
          <el-radio name="rad" label="1">出勤</el-radio>
          <el-radio name="rad" label="2">迟到</el-radio>
          <el-radio name="rad" label="3">请假</el-radio>
          <el-radio name="rad" label="4">旷课</el-radio>  
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" v-model="form.remarks" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <!-- 提交按钮 -->
    <div class="button-bg">
      <el-button type="primary" class="buttin save" @click="sign">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 绑定数据
      form: {
        // 学员id
        id: "",
        // 签到状态
        status: 0,
        // 课程id
        courseid: "",
        // 备注
        remarks: ""
      }
    };
  },
  mounted() {},
  methods: {
    // 考勤签到数据
    sign() {
      // let data = JSON.stringify(this.form);
      let data = [this.form];
      this.$http.post(
        "/coursetables/updateState",
        data,
        success => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.$emit('workChild')
        },
        failure => {
          this.$message({
            message: "操作失败",
            type: "error"
          });
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.workList {
  .el-textarea {
    width: 80%;
  }
}
</style>

<template>
  <div class="Teacher">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="教师名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入教师名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="wechat">
        <el-input v-model="form.wechat" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="主讲老师"></el-checkbox>
          <el-checkbox label="助教老师"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary preservation" @click="teacherAdd(form)">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "TeacherList",
  data() {
    return {
      form: {
        id: 0,
        name: "",
        tel: "",
        wechat: "",
        type: []
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入教师名称", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        wechat: [{ required: true, message: "请输入微信号", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "最少选择一个教师类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 添加教师
    teacherAdd(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 复选框拼接
          this.form.type = this.form.type.join();
          // console.log()
          this.$http.post(
            "/teachers/add",
            this.form,
            success => {
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
              this.$emit("teacherChild");
            },
            failure => {
              console.log("添加教师数据失败");
            }
          );
        }
      });
    }
  },
  mounted() {
    setTimeout(()=>{
      console.log(this.form)
      if(this.form.id!=undefined&&this.form.id!=0){
        this.form.type=[this.form.type]
      }
      console.log(this.form)
    },50)
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
</style>
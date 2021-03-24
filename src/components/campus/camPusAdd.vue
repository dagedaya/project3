<template>
  <div class="camPsAddes">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="所有人姓名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="校区名称：" prop="title">
        <el-input v-model="form.title" placeholder="请输入校区的名称"></el-input>
      </el-form-item>
      <el-form-item label="校区电话：" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入校区的电话"></el-input>
      </el-form-item>
      <el-form-item label="校区座机：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入校区的座机"></el-input>
      </el-form-item>

      <el-form-item label="校区地址：" prop="selectedOptions">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label prop="address">
        <el-input v-model="form.address" placeholder="请输入详细信息"></el-input>
      </el-form-item>
      <el-button type="primary preservation" @click="campusAdd">{{form.id==undefined?"添加":'修改'}}</el-button>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      // 三级联动
      options: regionData,
      selectedOptions: [],
      form: {
        // 校区名称
        title: "",
        // 用户名
        name: "",
        // 电话：
        tel: "",
        // 座机：
        mobile: "",
        // 地址
        province: "",
        city: "",
        area: "",
        // 详细地址
        address: ""
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        title: [{ required: true, message: "请输入校区名称", trigger: "blur" }],
        tel: [{ required: true, message: "请选择手机号", trigger: "change" }],
        mobile: [{ required: true, message: "座机不能为空", trigger: "blur" }],
        selectedOptions: [
          { required: true, message: "校区地址不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "详细地址不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
    // console.log(JSON.stringify(this.form))
  },
  methods: {
    // 校区添加
    campusAdd() {
      this.$http.post(
        "/campus/add",
        this.form,
        success => {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success"
          });
          this.$emit("campuschild");
        },
        failure => {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      );
    },
    // 三级联动
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
        if (i === 0) {
          this.form.province = CodeToText[this.selectedOptions[i]];
        } else if (i === 1) {
          this.form.city = CodeToText[this.selectedOptions[i]];
        } else {
          this.form.area = CodeToText[this.selectedOptions[i]];
        }
        // console.log(CodeToText);
      }
      // alert(loc);
    },
    //    地区 处理
    diqupage(){
      this.selectedOptions=[
        TextToCode[this.form.province].code,
        TextToCode[this.form.province][this.form.city].code,
        TextToCode[this.form.province][this.form.city][this.form.area].code,
      ]
      console.log(TextToCode[this.form.province][this.form.city][this.form.area].code)
    },
  },
  mounted() {
    setTimeout(() => {
        this.diqupage()
        // console.log(this.selectedOptions)
    }, 50);
  }
};
</script>
<style>
.el-dialog {
  overflow: hidden;
  height: auto;
}
.el-cascader .el-input .el-icon-arrow-down {
  transition: transform 0.3s;
  font-size: 14px;
  position: relative;
  top: -16px;
}
</style>
<style lang="less" scoped>
.camPsAddes {
  .el-input {
    width: 80%;
  }
  .el-dialog {
    overflow: hidden;
    height: auto;
  }
}
</style>

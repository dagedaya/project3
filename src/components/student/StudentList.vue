<template>
  <div class="student">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-upload
        ref="upload"
        class="avatar-uploader"
        action="/upload/add"
        :show-file-list="false"
        :data="{width:100,height:100}"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
      >
        <!-- :auto-upload="false"
        :on-change="handleAvatarChange"-->
        <img v-if="form.photo" :src="imgUrl+form.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker v-model="form.birthday" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
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
        @click="submit(form)"
      >{{form.id==""||form.id==undefined?"保存":"修改"}}</el-button>
    </el-form>
  </div>
</template>
http://192.168.1.250:8888/edusystems/upload
<script>
export default {
  name: "StudentList",
  data() {
    return {
      headers: { token: localStorage.getItem("token") },
      // 上传图片
      imgUrl: this.$config.imgUrl,
      imageUrl: "",
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
        remarks: "",
        photo: null,
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
    submit(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.form));
          this.form.classids=[]
          this.$http.post(
            "/students/add",

            this.form,
            success => {
              this.restModel();
              this.$emit("studentChild");
              // 弹框
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
              console.log(success);
              this.$refs.upload.clearFiles(); //清空
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
    },
    // 上传文件
    handleAvatarChange(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.photo = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.student {
  .el-input__inner {
    border: 1px solid #ececec !important;
    margin-top: 1px;
    height: 33px;
    width: 300px;
  }
  .el-button {
    // background-color: #409eff;
    color: #fff;
  }
  //上传文件
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    left: 504px;
    top: 87px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

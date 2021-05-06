<template>
  <div class="student">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上传图片" prop="name">
        <!-- 上传图片 -->
        <el-upload class="image-upload" action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"><p>上传图片</p></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        <div class="image-font">建议尺寸大小为1120*388，大小不能超过2M，格式为jpg</div>
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="form.name" placeholder="请输入轮播图标题"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入轮播图链接"></el-input>
      </el-form-item>
      <el-button class="button-box" type="primary" @click="submit(form)">{{
        form.id == "" || form.id == undefined ? "保存" : "修改"
      }}</el-button>
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
        photo: null
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    restModel() {
      // 添加列表清空
      this.form = [];
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
  .el-icon-plus p {
  font-size: 18px;
}
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
    overflow: hidden;
  }
  .image-upload{
    float: left;
  }
  .image-font{
    padding-left: 160px!important;
    padding-top:100px!important; 
  }
  .button-box{
    float:right;
  }
  .button-box span {
      font-size: 14px;
      color:#fff;
      margin-top:0px!important;
      padding-top: 0px !important;
      padding-left: 0px !important;
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

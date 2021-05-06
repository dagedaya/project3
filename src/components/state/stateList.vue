<template>
  <div>
    <div class="top">
      <span> ＜ </span>
      <span>返回</span>
      <span>返回动态</span>
    </div>
    <div class="main-body">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上传图片:">
          <el-upload
            class="image-upload"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
          >
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
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <span>建议尺寸大小为192*128,大小不超过2M,格式jpg</span>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="摘要:">
          <el-input
            type="textarea"
            v-model="form.desc"
            rows="8"
            class="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <div id="websiteEditorElem" style="height: 100px"></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  // name: "Editor",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      form: {},
      disabled: false,
      editor: null,
      editorContent: ""
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  mounted() {
    // // wangeditor
    let phoneEditor = new E("websiteEditorElem");
    phoneEditor.onchange = function() {
      this.formData.phone= this.$txt.html();
    };
    phoneEditor.create();
  },
}
</script>

<style scoped>
.image-upload {
  float: left;
}
span {
  margin-top: 100px !important;
}
.top {
  background-color: #f1f2f6;
  height: 40px;
  line-height: 40px;
}
.top span {
  color: #968887;
  margin-left: 5px;
}
.top span:nth-child(3) {
  padding-left: 10px;
  border-left: 1px solid;
}
.main-body {
  margin-left: 15%;
  margin-top: 5%;
}
.el-icon-plus p {
  font-size: 18px;
}
.el-form-item span {
  float: left;
}
.el-input {
  width: 80%;
}
.textarea {
  width: 80%;
}
</style>
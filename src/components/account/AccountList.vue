<template>
  <div class="accountList">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="账号：" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="选择校区：" prop="campusid">
        <el-select v-model="form.campusid" placeholder="请选择校区">
          <el-option
            v-for="(item,index) in campusListes"
            :label="item.title"
            :key="index"
            :value="item.id"
          >{{item.title}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="tel">
        <el-input v-model="form.tel" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="form.remarks" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-button
        type="primary preservation"
        @click="loaddata(form)"
      >{{form.id==undefined||form.id==0?"添加":'修改'}}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 校区数据
      campusListes: [],
      form: {
        // 0为添加1为修改
        id: 0,
        // 校区id
        campusid: "",
        // 账号
        username: "",
        // 密码
        pass: "123",
        // 名字
        name: ""
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户姓名", trigger: "change" }
        ],
        campusid: [
          { required: true, message: "请输入校区", trigger: "change" }
        ],
        tel: [{ required: true, message: "请选择上课模式", trigger: "blur" }],
        email: [{ required: true, message: "请选择邮箱", trigger: "blur" }],
        remarks: [{ required: true, message: "请选择备注", trigger: "blur" }]
      }
    };
  },
  created() {
    this.campusList();
  },
  mounted() {},
  methods: {
    // 添加账号
    loaddata(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(JSON.stringify(this.form));
          this.$http.post(
            "/company/add",
            this.form,
            success => {
              console.log(success);
              this.$message({
                message: "恭喜你，添加成功",
                type: "success"
              });
              this.$emit("accountChild");
            },
            failure => {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
          );
        }
      });
    },
    // 获取校区数据
    campusList() {
      this.$http.get(
        "/campus/list",
        { page: 1 },
        success => {
          this.campusListes = success.data.list;
        },
        failure => {
          console.log("添加校区数据失败");
        }
      );
    },
    // 封装添加数据
    restModel() {}
  }
};
</script>
<style>
.el-select .el-input .el-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotateZ(180deg);
  cursor: pointer;
  /* margin-top: -30px; */
  position: relative;
  top: -19px;
}
</style>
<style lang="less" scoped>
.accountList {
  .el-input {
    width: 80%;
  }
  .el-dialog {
    overflow: hidden;
    height: auto;
  }
}
</style>

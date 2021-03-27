<template>
  <div class="accountFormation">
    <table>
      <tr>
        <td>账号</td>
        <td>{{form.account}}</td>
        <td></td>
      </tr>
      <tr>
        <td>姓名</td>
        <td>{{form.name}}</td>
        <td>
          <i class="el-icon-edit" @click="Name=true"></i>
        </td>
      </tr>
      <tr>
        <td>联系方式</td>
        <td>{{form.contact}}</td>
        <td>
          <i class="el-icon-edit" @click="Contact=true"></i>
        </td>
      </tr>
      <tr>
        <td>邮箱</td>
        <td>{{form.email}}</td>
        <td>
          <i class="el-icon-edit" @click="Email=true"></i>
        </td>
      </tr>
      <tr>
        <td>地址</td>
        <td>{{form.address}}</td>
        <td>
          <i class="el-icon-edit" @click="Address=true"></i>
        </td>
      </tr>
      <tr>
        <td>登录密码</td>
        <td>{{form.loginPass}}</td>
        <td>
          <i class="el-icon-edit" @click="Loginpass=true"></i>
        </td>
      </tr>
    </table>
    <!-- 修改姓名 -->
    <el-dialog title="修改姓名" :visible.sync="Name" width="35%" :append-to-body="true">
      <editName></editName>
    </el-dialog>
    <!-- 修改联系方式 -->
    <el-dialog title="修改联系方式" :visible.sync="Contact" width="35%" :append-to-body="true">
      <editContact></editContact>
    </el-dialog>
    <!-- 修改邮箱 -->
    <el-dialog title="修改邮箱" :visible.sync="Email" width="35%" :append-to-body="true">
      <editEmail></editEmail>
    </el-dialog>
    <!-- 修改地址 -->
    <el-dialog title="修改地址" :visible.sync="Address" width="35%" :append-to-body="true">
      <editAddress></editAddress>
    </el-dialog>
    <!-- 修改登录密码 -->
    <el-dialog title="修改登录密码" :visible.sync="Loginpass" width="40%" :append-to-body="true">
      <editLoginpass></editLoginpass>
    </el-dialog>
  </div>
</template>

<script>
import editName from "../index/editName.vue";
import editContact from "../index/editContact.vue";
import editEmail from "../index/editEmail.vue";
import editAddress from "../index/editAddress.vue";
import editLoginpass from "../index/editLoginpass";
export default {
  components: { editName, editContact, editEmail, editAddress, editLoginpass },
  data() {
    return {
      form: {
        account: "2856281442",
        name: "李红",
        contact: "18330024560",
        email: "2856281442@qq.com",
        address: "河北邯郸",
        loginPass: "*********"
      },
      // 修改账号
      Name: false,
      // 联系方式
      Contact: false,
      // 邮箱
      Email: false,
      // 地址
      Address: false,
      // 登录密码
      Loginpass:false,
      accountList: []
    };
  },
  created() {
    // 初始化账号信息
    this.accountInformation();s
  },
  mounted() {},
  methods: {
    // 获取账号信息
    accountInformation() {
      this.$http.get(
        "/company/list",
        { page: 1 },
        success => {
          console.log(success);
          this.accountList = success.data.list;
        },
        fialure => {
          console.log("获取账号失败");
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.accountFormation {
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f5f5f5 !important;
  }
  i {
    font-size: 20px;
    color: #4281fc;
  }
}
</style>
<template>
  <div class="editLoginpass">
    <table>
      <tr>
        <td>密码：</td>
        <td>
          <input type="text" name id class="txt" />
        </td>
      </tr>
      <tr>
        <td>确认密码：</td>
        <td>
          <input type="text" name id class="txt" />
        </td>
      </tr>
      <tr>
        <td>验证码：</td>
        <td>
          <input type="text" name id class="txt" />
        </td>
        <td>
          <div class="verify">获取验证码</div>
        </td>
      </tr>
      <div class="btn">修改</div>
      <!-- <div style="clear:both"></div> -->
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Loginpass: "******"
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.editLoginpass {
  .txt {
    width: 330px;
    outline: none;
    height: 33px;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
  }
  tr {
    line-height: 53px;
  }
  td {
    text-align: right;
  }
  .btn {
    width: 100px;
    height: 33px;
    background-color: #4281fc;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    position: relative;
    left: 450px;
    top: 10px;
  }
  .verify {
    width: 100px;
    height: 33px;
    background-color: #4281fc;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    margin-top:3px;
  }
}
</style>
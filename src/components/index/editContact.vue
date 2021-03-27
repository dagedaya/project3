<template>
  <div class="editContact">
    <table>
      <tr>
        <td>联系方式：</td>
        <td>
          <input type="text" :value="form.Contact" name id class="txt" />
        </td>
      </tr>
      <div class="btn">修改</div>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Contact: "2856281442@qq.com"
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.editContact {
  .txt {
    width: 378px;
    height: 33px;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    outline: none;
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
    left: 390px;
    top: 10px;
  }
}
</style>
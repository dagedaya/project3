<template>
  <div class="editEmail">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="邮箱">
        <el-input v-model="form.email" value="form.email"></el-input>
      </el-form-item>
      <div class="btn">
        修改
      </div>
      <div style="clear:both"></div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "2856281442@qq.com",
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.editEmail{
  .btn{
    width:100px;
    height: 33px;
    background-color: #4281FC;
    border-radius: 5px;
    color:#fff;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    float: right;
  }
}
</style>
<template>
  <div class="editName">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" value="form.name"></el-input>
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
        name: "李红",
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.editName{
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
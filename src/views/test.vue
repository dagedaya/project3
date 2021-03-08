<template>
  <div class="test">
    <input />
    <div class="button">添加班级</div>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
// @import "../less/button";

.test {
  .button {
    color: red;
  }
  input {
    border: solid 1px red;
  }
}
</style>
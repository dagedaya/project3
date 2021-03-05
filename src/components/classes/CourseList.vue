<template>
  <div>
    <div class="box">
      <div class="box-1">
        <div>
          <div class="box-1-1-1">
            <span style="color: red">*</span>
            主讲老师
          </div>
          <div class="box-1-1-2">
            <a href="#">添加助教</a>
          </div>
        </div>
        <div class="box-2">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        请选择<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
        </div>
      </div>
      <div class="box-1">
        <div>
          <div class="box-1-1-1">
            助教老师
          </div>
        </div>
        <div class="box-2">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        请选择<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
        </div>
      </div>
      <div class="box-1">
        <div>
          <div class="box-1-1-1">
            教师
          </div>
        </div>
        <div class="box-2">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        请选择<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
        </div>
      </div>
      <div class="box-1">
        <div>
          <div class="box-1-1-1">
            <span style="color: red">*</span>
            单节课扣学员课时
          </div>
        </div>
        <div class="box-2">
          <el-input></el-input>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.box-1 {
  width: 200px;
}
.box-1-1-1 {
  float: left;
}
.box-1-1-2 {
  float: right;
  color: #63bffe;
}
.box-2 {
  clear: both;
  height: 30px;
}
.box-2 .el-dropdown {
  height: 50px;
  margin-top: 12px;
  margin-left: 23px;
}
.box > div {
  float: left;
  margin-left: 40px;
}
</style>
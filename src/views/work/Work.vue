<template>
  <div>
    <div class="box-header">
      <!-- 头部输入框 -->
      <div class="place">
        <button class="btn">考勤管理</button>
        <div class="triangle"></div>
      </div>
      <div class="time" style="position:absolute;left:160px;top:8px">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date3"></el-date-picker>-
        <el-date-picker type="date" placeholder="结束日期" v-model="form.date4"></el-date-picker>
      </div>
      <div class="select-box">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">学习</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">课程</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="text-box">
          <input type="text" class="el-input__inner" />
        </div>
        <i class="el-icon-search search"></i>
      </div>
    </div>
    <!-- 表格主体部分 -->
    <div class="connect">
      <p>今日课表</p>
      <div class="day">
        <div class="line-1">架子鼓基础班</div>
        <div class="line-2">
          <span>班课</span>
        </div>
        <div class="line-3">
          <i class="el-icon-reading"></i>
          架子鼓课
        </div>
        <div class="line-4">
          <i class="el-icon-time"></i>
          13:30-14:15
        </div>
        <div class="line-5">
          <i class="el-icon-suitcase"></i>
          明明
        </div>
        <div class="line-6">
          <i class="el-icon-data-analysis"></i>
          已到达
        </div>
        <div class="line-7" @click="dialogVisible = true">
          <i class="el-icon-edit-outline"></i>
          签到
        </div>
        <el-dialog title="签到" :visible.sync="dialogVisible" width="47%">
          <WorkList></WorkList>
          <span slot="footer" class="dialog-footer">
            <el-button class="button-box" type="primary" @click="dialogVisible = false">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script >
import WorkList from "../../components/work/WorkList.vue";
// 引入组件
export default {
  components: { WorkList },
  data() {
    return {
      dialogVisible: false,
      form: {
        date3: "",
        date4: ""
      },
      dataList: []
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
/* 输入框 */
.select-box {
  width: 420px;
  height: 31px;
  border: 1px solid #dee3e9;
  margin-left: 649px;
  margin-top: -45px;
  line-height: 28px;
  padding-left: 5px;
  float: left;
  background-color: #fff;
}
.text-box2 {
  width: 260px;
  position: relative;
  top: -30px;
}

.el-input__inner {
  background-color: rgba(0, 0, 0, 0);
  margin-top: -4px;
  margin-left: -9px;
  border: none;
}
/* 搜索 */
.el-icon-search {
  position: absolute;
  left: 1042px;
  top: 16px;
  font-size: 20px;
}

/* 按钮 */
/* 三角 */
.btn {
  font-size: 15px;
}
.triangle {
  width: 0;
  height: 0;
  border-top: 29px solid transparent;
  border-left: 34px solid #dbdfe8;
  border-bottom: 30px solid transparent;
  position: absolute;
  left: 99px;
  top: -3px;
}
.place .btn {
  width: 100px;
  height: 56px;
  background-color: #dbdfe8;
  border: none;
  margin-right: 40px;
  outline: none;
}
.box-header {
  width: 99.9%;
  height: 55px;
  background-color: #f0f1f5;
  border-right: 1px solid #dee3e9;
  border-bottom: 1px solid #dee3e9;
  position: relative;
}

.el-button {
  padding: 6px 15px;
  margin: 10px 34px;
  background-color: #4385f5;
  color: #fff;
  font-size: 14px;
}
.el-icon-folder-add {
  font-weight: bold;
  font-size: 16px;
}

/* 输入框 */
.select-box {
  width: 420px;
  height: 35px;
  border: 1px solid #dee3e9;
  margin-left: 649px;
  margin-top: -46px;
  line-height: 33px;
  padding-left: 5px;
  float: left;
  background-color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #9ea4b0;
}
.text-box {
  width: 260px;
  position: relative;
  left: 90px;
  top: -30px;
}
.el-icon-search {
  position: absolute;
  left: 1040px;
  top: 20px;
  font-size: 20px;
}
/* 主体表格 */
.el-form-item {
  margin: 0 auto;
}
.connect .day {
  margin-top: 22px;
  height: 72px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  margin-left: 25px;
  border-left: 7px solid #1890ff;
  border-radius: 5px;
}
.connect .day > div {
  line-height: 72px;
  float: left;
}
.connect .day > .line-1 {
  margin-left: 32px;
}
.connect .day > .line-2 {
  margin-top: 27px;
  background-color: #c7ebdf;
  color: #2dcc70;
  margin-left: 15px;
  line-height: 180%;
}
.connect .day > .line-2 span {
  display: block;
  width: 50px;
  height: 20px;
  text-align: center;
  position: relative;
  top: -6px;
}
.connect .day > .line-3 {
  margin-left: 300px;
}
.connect .day > .line-4 {
  margin-left: 40px;
}
.connect .day > .line-5 {
  margin-left: 20px;
}
.connect .day > .line-6 {
  margin-left: 187px;
}
.connect .day > .line-7 {
  margin-left: 60px;
  cursor: pointer;
  color: #417df5;
}
.connect .day > .line-7 i {
  color: #417df5;
}
.connect p {
  margin-left: 26px;
}
</style>
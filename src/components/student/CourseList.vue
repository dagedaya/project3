<template>
  <div class="CourseList">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="插班排课" name="first">
        <div>
          <input type="text" placeholder="请输入关键字" />
          <i class="el-icon-search search"></i>
        </div>
        <table class="tab">
          <tr>
            <th>班级名称</th>
            <th>课程</th>
            <th>老师</th>
            <th>人数</th>
            <th>计划课时</th>
            <th>已排课时</th>
            <th>已上课时</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in getProjectList" :key="index">
            <td>
              <span></span>
              <a href="javascript:;" class="text-a">{{item.name}}</a>
            </td>
            <td>{{item.coursename}}</td>
            <td>{{item.teacherslist}}</td>
            <td>{{item.students}}</td>
            <td>{{item.schcourses}}</td>
            <td>{{item.endcourses}}</td>
            <td>{{item.coursecounts}}</td>
            <td>
              <a href="javascript:;">课表</a>
            </td>
          </tr>
        </table>
        <span class="dialog-footer">
        <el-button class="button-box" type="primary" @click="course = false">保存</el-button>
      </span>
      </el-tab-pane>
      <el-tab-pane label="一对一排课" name="second" class="second">
        <isOne></isOne>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import isOne from "../../components/student/isOne";
export default {
  components: { isOne },
  data() {
    return {
      // 获取课程信息
      getProjectList: [],
      // 开始时间
      startTime: "",
      // 结束时间
      endTime: "",
      // 切换
      activeName: "second",
      // 数据
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      activeName: "first"
    };
  },
  created() {
    this.getProjectInfo();
  },
  mounted() {},

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取课程信息
    getProjectInfo() {
      this.$http.get(
        "/classes/list",
        { page: 1 },
        success => {
          console.log(success.data.list);
          this.getProjectList = success.data.list;
        },
        failure => {
          console.log("获取课程信息失败");
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.CourseList {
  .el-select {
    border: 1px solid #dee3e9;
  }
  .One-time {
    margin-left: 20px;
  }
  /* 一对一排课 */
  /* 表格 */
  .tab tr td span {
    background-image: url("../../assets/ico.png");
    display: inline-block;
    width: 25px;
    height: 25px;
    background-position: -2px -969px;
    position: relative;
    top: 5px;
  }

  table > tr > th:nth-child(1) {
    text-align: left;
  }
  table tr td:nth-of-type(1) {
    text-align: left;
  }
  table tr td .text-a {
    text-decoration: none;
    color: #0b0f18;
  }
  /* 列表 */
  .tab {
    width: 96%;
    margin-left: 2%;
    margin-top: 20px;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tab td,
  .tab th {
    border-bottom: solid 1px #ececec;
    text-align: center;
    height: 40px;
  }
  .tab th {
    background: #f5f6fa;
    height: 35px;
    text-align: center;
    font-weight: normal;
  }
  .el-icon-circle-plus-outline {
    font-size: 38px;
    color: #ececec;
    position: absolute;
    top: 94px;
    left: 465px;
  }
  @import "../../less/InputList";
}
</style>

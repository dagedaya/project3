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
      </el-tab-pane>
      <el-tab-pane label="一对一排课" name="second">
        <div class="first">
          <el-form ref="form" :model="form" label-width="20px">
            <el-form-item label>
              <div>
                <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;选择课程
              </div>
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="second">
          <el-form ref="form" :model="form" label-width="20px">
            <el-form-item label style="float:left;">
              <div>
                <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;主讲老师
                <a href="javascript:;">添加助教</a>
              </div>
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label style="float:left;">
              <div>
                <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;教室
              </div>
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>&nbsp;&nbsp;&nbsp;
            <el-form-item label>
              <div>
                <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;单节课扣学员课时
              </div>
              <input type="text" class="input-ke" />
            </el-form-item>
          </el-form>
        </div>
        <div class="third">
          <el-tabs @tab-click="handleClick">
            <el-tab-pane v-model="activeName" label="单次排课" name="first">
              <div class="One-time">
                <div>开课日期</div>
                <el-date-picker v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
                <div style="height:15px"></div>
                <div>
                  <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;上课时间
                </div>
                <el-time-select
                  placeholder="起始时间"
                  v-model="startTime"
                  :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
                ></el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="endTime"
                  :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
                ></el-time-select>
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="second">批量排课</el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
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
  div.second > form > div:nth-child(3) > div > input {
    border: 1px solid #dee3e9;
  }
  .first {
    width: 100%;
    height: 100px;
    background-color: #fafafa;
  }
  .second {
    width: 100%;
    height: 100px;
    background-color: #fafafa;
    margin-top: 20px;
  }
  .third {
    width: 100%;
    height: 220px;
    background-color: #fafafa;
    margin-top: 20px;
  }
  #pane-third {
    line-height: 40px;
  }

  .el-tabs--card > .el-tabs__header {
    border-bottom: 1px solid #4281fc;
  }

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

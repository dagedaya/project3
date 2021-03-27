<template>
  <div class="body courseListes">
    <!-- 上半部分 -->
    <div class="heads">
      <div class="zhuteacher1">
        <div>
          <font color="red">*</font>主讲老师
          <span class="createTeacher first" @click="is_createTeacher = !is_createTeacher">添加助教</span>
        </div>
        <div class="selechange1">
          <el-select class="selectAll" v-model="courseForm.teacherid" placeholder="请选择">
            <el-option
              v-for="item in teacherslist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="zhuteacher2" v-show="is_createTeacher">
        <div>
          <span>助教老师</span>
        </div>
        <div class="selechange1">
          <el-select v-model="courseForm.assistant" placeholder="请选择">
            <el-option
              v-for="item in assistantList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="zhuteacher3">
        <div>
          <span>教室</span>
        </div>
        <div class="selechange1">
          <el-select v-model="courseForm.classrooms" placeholder="请选择">
            <el-option
              v-for="item in classroomList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="zhuteacher4">
        <div>
          <span>
            <font color="red">*</font>单结课扣学员课时
          </span>
        </div>
        <div class="selechange1">
          <el-input v-model="courseForm.pricecounts"></el-input>
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="main">
      <div class="title">
        <span :class="{ laing: isTAVal == 1 ? 'laing' : '' }" @click="changeis(1)">单次排课</span>
        <span :class="{ laing: isTAVal == 2 ? 'laing' : '' }" @click="changeis(2)">批量排课</span>
      </div>
      <div class="connect-body">
        <!-- 开课日期 -->
        <div class="start">
          <p class="title">开课日期</p>
          <div>
            <el-date-picker
              v-model="courseForm.begindate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
        <div v-show="this.courseForm.addtype == 'more'">
          <!-- 结束方式 -->
          <div class="start">
            <p class="title">结束方式</p>
            <div>
              <el-radio-group v-model="courseForm.jsfs" @change="clickCatJsfs">
                <el-radio :label="'按课节'"></el-radio>
                <el-radio :label="'按日期'"></el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 排课总数 -->
          <template v-if="courseForm.jsfs == '按课节'">
            <div class="start">
              <!-- 排课总数 // 结课日期 -->
              <p class="title">排课总数</p>
              <div>
                <el-input v-model="courseForm.coursescount"></el-input>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="start">
              <!-- 排课总数 // 结课日期 -->
              <p class="title">结课日期</p>
              <div>
                <el-date-picker
                  v-model="courseForm.enddate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </div>
          </template>
        </div>
        <!-- 星期选择 -->
        <div class="start up-time" v-if="courseForm.jsfs == '按日期' && courseForm.addtype != 'one'">
          <p class="title">
            <span style="color: #f00">*</span>
            星期选择
          </p>
          <div>
            <div>
              <!-- <el-checkbox-group> -->
              <el-checkbox
                v-for="(item, index) in weekArray"
                :key="item.id"
                :label="item.id"
                name="type"
                v-model="item.check"
                @change="selectThisWeek(index)"
              >
                <div>星期{{ item.name }}</div>
              </el-checkbox>
              <!-- </el-checkbox-group> -->
            </div>
          </div>
          <div>
            <template v-for="(item, index) in week">
              <div v-for="(item2, index2) in item" class="week-time" :key="item2.id">
                <p>周{{ weekArray[index.charAt(4) - 1].name }}时间</p>
                <div>
                  <el-time-select
                    placeholder="起始时间"
                    v-model="item2.begintime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                    }"
                    width="80px"
                  ></el-time-select>
                  <el-input v-model="item2.duration" placeholder="时长(45分钟)"></el-input>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="item2.endtime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30',
                      minTime: startTime,
                    }"
                  ></el-time-select>
                  <template v-if="index2 == 0">
                    <el-button
                      class="create"
                      icon="el-icon-plus"
                      @click="clickWeekCreate(index.charAt(4) - 1)"
                    ></el-button>
                  </template>
                  <template v-else>
                    <el-button
                      class="create"
                      icon="el-icon-minus"
                      @click="clickWeekDel(index.charAt(4) - 1, index2)"
                    ></el-button>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- 上课时间 -->
        <div class="start up-time" v-else>
          <p class="title">
            <span style="color: #f00">*</span>
            上课时间
          </p>
          <div>
            <template>
              <el-time-select
                placeholder="起始时间"
                v-model="weekBegintime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
              ></el-time-select>
              <span>-</span>
              <el-time-select
                placeholder="结束时间"
                v-model="weekEndtime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime,
                }"
              ></el-time-select>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部部分 -->
    <div class="floor clearfix">
      <div class="box">
        <h3>选择学员({{courseForm.studentlist.length}})</h3>
        <span class="createUser" @click="stuChoose">
          <span class="el-icon-user"></span>添加学员
        </span>
        <div v-for="(item,index) in courseForm.studentlist" :key="index">
          <div>
            <span class="elf userCap"></span>
            {{item.name}}
          </div>
        </div>
        <!-- 提交按钮 -->
        <div class="button-bg">
          <el-button type="primary" class="buttin save" @click="handleClick">保存</el-button>
        </div>
      </div>
    </div>
    <!-- 选择成员 -->
    <el-dialog
      title="选择学员"
      style="margin-top:0vh;margin-top:-70px;"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="60%"
    >
      <StudentList @changeStudent="changeStudentes"></StudentList>
    </el-dialog>
  </div>
</template>

<script>
import StudentList from "./StudentList";
export default {
  components: { StudentList },
  // 接收传值classid和courseid
  props: {
    id: {
      type: Number
    },
    courseid: {
      type: Number
    }
  },
  data() {
    return {
      dialogVisible: false,
      // 主讲老师列表
      teacherslist: [],
      // 助教老师列表
      assistantList: [],
      // 是否添加助教
      is_createTeacher: false,
      // 教室列表
      classroomList: [],
      // 要传输的数据
      courseForm: {
        // 班级ID
        classid: this.id,
        // 课程ID
        courseid: this.courseid,
        // 单次one/批量排课more
        addtype: "one",
        // 主讲老师ID
        teacherid: "",
        // 助教老师ID
        assistant: "",
        // 教师ID
        classrooms: 0,
        // 单节课扣学员课时
        pricecounts: "1",
        // 开课日期
        begindate: "",
        // 结课日期
        enddate: "",
        // 结束方式
        jsfs: "按课节",
        // 排课总数
        coursescount: "",
        // 上课时间
        weektime: [],
        // 学员列表（已选择）
        studentlist: []
      },
      // 上课时间
      weekBegintime: "",
      weekEndtime: "",

      // 单排/批量排课（class类）
      isTAVal: 1,
      // 星期选择
      week: {
        week1: [],
        week2: [],
        week3: [],
        week4: [],
        week5: [],
        week6: [],
        week7: []
      },
      weekArray: [
        {
          id: 1,
          name: "一",
          check: false
        },
        {
          id: 2,
          name: "二",
          check: false
        },
        {
          id: 3,
          name: "三",
          check: false
        },
        {
          id: 4,
          name: "四",
          check: false
        },
        {
          id: 5,
          name: "五",
          check: false
        },
        {
          id: 6,
          name: "六",
          check: false
        },
        {
          id: 7,
          name: "日",
          check: false
        }
      ],

      startTime: "",
      endTime: ""
    };
  },
  created() {
    console.log(this.id);
    console.log(this.courseid);
    // 获取讲师信息
    this.getTeacherInfo();
    // 获取助教讲师信息
    this.getHelpTeacherInfo();
    // 获取教室信息
    this.getClassroomInfo();
  },
  methods: {
    // 选中的成员
    changeStudentes(list) {
      this.dialogVisible = false;
      this.courseForm.studentlist = list;
    },
    // 批量排课里面（切换结束方式）
    clickCatJsfs() {
      if (this.courseForm.jsfs == "按课节") {
        this.courseForm.enddate = null;
      } else {
        this.courseForm.coursescount = "";
      }
    },
    // 选择星期
    selectThisWeek(index) {
      if (this.weekArray[index].check) {
        this.week["week" + (index + 1)].push({
          week: index + 1,
          begintime: "00:00",
          endtime: "00:00"
        });
      } else {
        this.week["week" + (index + 1)] = [];
      }
    },
    // 添加星期日期
    clickWeekCreate(index) {
      this.week["week" + (index + 1)].push({
        week: index + 1,
        begintime: "00:00",
        endtime: "00:00"
      });
    },
    // 删除星期日期
    clickWeekDel(index, index2) {
      this.week["week" + (index + 1)].splice(index2, 1);
    },
    // 切换单排排课、批量排课
    changeis(value) {
      if (value == 1) {
        this.isTAVal = 1;
        this.courseForm.addtype = "one";
        this.courseForm.weektime = [];
        this.courseForm.enddate = null;
        this.courseForm.coursescount = "";
        this.courseForm.jsfs = "按课节";
      } else {
        this.isTAVal = 2;
        this.courseForm.addtype = "more";
      }
    },
    // 获取讲师信息
    getTeacherInfo() {
      this.$http.get(
        "/teachers/list",
        { cat: 1, page: 1 },
        success => {
          this.teacherslist = success.data.list;
        },
        failure => {
          console.log("获取讲师信息失败");
        }
      );
    },
    // 获取助教讲师信息
    getHelpTeacherInfo() {
      this.$http.get(
        "/teachers/list",
        { cat: 2, page: 1 },
        success => {
          console.log("助教", success.data.list);
          this.assistantList = success.data.list;
        },
        failure => {
          console.log("讲师信息接收失败");
        }
      );
    },
    // 获取教师信息
    getClassroomInfo() {
      this.$http.get(
        "/classrooms/list",
        { page: 1 },
        success => {
          console.log("教师", success.data.list);
          this.classroomList = success.data.list;
        },
        failure => {
          console.log("获取教师信息失败");
        }
      );
    },
    // 选择学员
    stuChoose() {
      this.dialogVisible = true;
    },
    // 保存排课
    handleClick() {
      // 单次排课
      if (this.courseForm.addtype == "one") {
        this.courseForm.weektime = [
          {
            week: 0,
            // 开始时间和结束时间
            begintime: this.weekBegintime,
            endtime: this.weekEndtime
          }
        ];
      } else if (this.courseForm.jsfs != "按课节") {
        for (var i in this.week) {
          for (var j in this.week[i]) {
            this.courseForm.weektime.push(this.week[i][j]);
          }
        }
      }
      // 打印结果查看
      console.log(this.courseForm);
      console.log(JSON.stringify(this.courseForm));
      let that = this;
      that.$http.post(
        "/coursetables/add",
        that.courseForm,
        success => {
          this.$message.success({
            message: "班级排课成功",
            type: "success"
          });
          this.$emit("closeAlert");
        },
        failure => {
          this.$message({
            message: "班级排课失败",
            type: "error"
          });
        }
      );
    }
  }
};
</script>
<style>
</style>
<style lang="less" scoped>
.el-date-picker table {
  table-layout: fixed;
  width: 100%;
  /* margin-left: -800px; */
  position: relative;
  /* top: -40px; */
}
.courseListes {
  .el-date-picker table {
    table-layout: fixed;
    width: 100%;
    position: relative;
  }
  .el-dialog {
    margin-top: 0 !important;
    position: relative;
    border-radius: 2px;
    box-sizing: border-box;
    top: 30px;
    bottom: 30px;
    height: 90%;
  }
  background-color: #fff;
  .el-icon-user {
    font-size: 16px;
  }
  .week-time {
    float: left;
    margin-right: 40px;
    margin-top: 45px;
  }
  .week-time .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 115px;
  }
  .week-time .el-input {
    margin-top: 10px;
    width: 115px;
  }
  .up-time {
    clear: both;
  }
  .save {
    height: 40px;
    margin-left: 80%;
    position: relative;
    top: -65px;
    right: 5px;
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .button-bg {
    background-color: #fff;
  }
  .icon-jiahaotianjia:before {
    content: "\e623";
  }
  .createUser {
    color: #4181fc;
    cursor: pointer;
  }
  /* 引入精灵图 */
  .elf {
    width: 24px;
    height: 24px;
    background-image: url("../../assets/ico.png");
  }
  .userCap {
    display: inline-block;
    background-position: -2px -635px;
  }
  .box {
    padding-top: 25px;
    margin-left: 30px;
  }
  .box h3 {
    display: inline-block;
    margin-right: 35px;
  }
  .box .user > div {
    margin-top: 30px;
    margin-right: 100px;
    // float: left;
    display: inline-block;
  }
  .floor {
    margin-top: 20px;
    background-color: #ffffff;
    clear: both;
  }

  .connect-body .start {
    float: left;
    margin-right: 80px;
  }
  .connect-body .start .create {
    padding: 0;
    width: 40px;
    height: 40px;
    margin-left: 8px;
  }
  .connect-body .start .title {
    margin-top: 5px;
  }
  .connect-body .start .title {
    margin-bottom: 12px;
  }
  .main .title {
    padding-top: 20px;
  }
  .main > .title span {
    margin-right: 40px;
    font-size: 16px;
    cursor: pointer;
  }
  .main {
    padding-left: 30px;
  }
  .shiliangtu {
    background-image: url("../../assets/ico.png");
    background-repeat: no-repeat;
    background-position: -30px -776px;
  }

  .laing {
    display: inline-block;
    height: 36px;
    color: #0074d9;
    cursor: pointer;
    border-bottom: 3px solid #0074d9;
  }

  .heads {
    padding-left: 30px;
    height: 100px;
    background-color: #fff;
  }

  .main {
    height: auto;
    background-color: #fff;
    margin-top: 20px;
  }

  .fen {
    margin-top: 30px;
    border-bottom: 1px solid #000000;
  }

  .buttin {
    width: 150px;
    margin-top: 20px;
  }

  .zhuteacher1 {
    font-size: 15px;
    color: #000000;
    padding-right: 40px;
    padding-top: 15px;
    float: left;
  }
  .zhuteacher1 .createTeacher {
    float: right;
    color: #15b0ff;
    cursor: pointer;
  }

  .zhuteacher2 {
    font-size: 15px;
    color: #000000;
    padding-right: 40px;
    padding-top: 15px;
    float: left;
  }

  .zhuteacher3 {
    font-size: 15px;
    color: #000000;
    padding-right: 40px;
    padding-top: 15px;
    float: left;
  }

  .zhuteacher4 {
    font-size: 15px;
    color: #000000;
    padding-right: 40px;
    padding-top: 15px;
    float: left;
  }

  .selechange1 {
    width: 177px;
    height: 40px;
    float: left;
    border-radius: 5px;
    margin-top: 12px;
  }

  .selechange2 {
    width: 177px;
    height: 40px;
    float: left;
    border: 1px solid #ebeef5;
    border-radius: 5px;
  }

  .selechange3 {
    width: 177px;
    height: 40px;
    float: left;
    border: 1px solid #ebeef5;
    border-radius: 5px;
  }

  .selechange4 {
    width: 177px;
    height: 40px;
    float: left;
    border: 1px solid #ebeef5;
    border-radius: 5px;
  }
  /* 引入精灵图 */
  .elf {
    width: 24px;
    height: 24px;
    background-image: url("../../assets/ico.png");
  }
  div.floor > div > div > div:nth-child(1) > span {
    display: inline-block;
    background-position: -2px -635px;
    margin-left: 20px;
  }
  div.floor > div > div > div:nth-child(2) > span {
    background-position: -2px -635px;
  }
  .classes .el-input__suffix-inner .el-input__icon {
    height: none;
    top: 0;
  }
  .first {
    position: absolute;
    top: 81px;
    left: 150px;
  }
}
</style>

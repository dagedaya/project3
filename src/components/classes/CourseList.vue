<template>
  <div class="body">
    <div class="heads">
      <div class="zhuteacher1">
        <div>
          <font color="red">*</font>主讲老师
          <span class="createTeacher" @click="is_createTeacher = !is_createTeacher">添加助教</span>
        </div>
        <div class="selechange1">
          <el-select v-model="courseForm.teacherid" placeholder="请选择">
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
    <div class="floor">
      <div class="box">
        <h3>选择学员(0)</h3>
        <span class="createUser">
          <span class="iconfont icon-jiahaotianjia"></span>添加学员
        </span>
        <div class="user">
          <div>
            <span class="elf userCap"></span>
            Jason
          </div>
          <div>
            <span class="elf userCap"></span>
            Jason
          </div>
        </div>
      </div>
    </div>
    <div class="button-bg">
      <el-button type="primary" class="buttin save" @click="handleClick">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 真实数据

      // 主讲老师列表
      teacherslist: [],
      // 助教老师列表
      assistantList: [],
      // 是否添加助教
      is_createTeacher: false,
      // 教室列表
      classroomList: [],
      // 学员列表
      studentList: [],
      // 要传输的数据
      courseForm: {
        // 班级ID
        classid: "",
        // 课程ID
        courseid: "",
        // 单次/批量排课
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
        // 学员列表
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
    // 获取讲师信息
    // this.getTeacherInfo();
    // 获取助教讲师信息
    // this.getHelpTeacherInfo();
    // 获取教室信息
    // this.getClassroomInfo();
    // 获取学员列表
    // this.getStudentInfo();
  },
  methods: {
    // 切换结束方式
    clickCatJsfs() {
      console.log(this.courseForm.jsfs);
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
      // console.log(this.weekArray);
    },
    // 添加星期日期
    clickWeekCreate(index) {
      console.log(index);
      this.week["week" + (index + 1)].push({
        week: index + 1,
        begintime: "00:00",
        endtime: "00:00"
      });
    },
    // 删除星期日期
    clickWeekDel(index, index2) {
      console.log(index);
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
      // console.log(this.courseForm.addtype);
    },
    // 获取讲师信息
    // getTeacherInfo() {
    //   this.$http.get(
    //     "edusystems/api/teachers/list",
    //     { cat: 1, page: 1 },
    //     success => {
    //       // console.log(success);
    //       this.teacherslist = success.data.list;
    //     },
    //     error => {}
    //   );
    // },
    // 获取助教讲师信息
    // getHelpTeacherInfo() {
    //   this.$http.get(
    //     "edusystems/api/teachers/list",
    //     { cat: 2, page: 1 },
    //     success => {
    //       // console.log(success);
    //       this.assistantList = success.data.list;
    //     },
    //     error => {}
    //   );
    // },
    // 获取教室信息
    // getClassroomInfo() {
    //   this.$http.get(
    //     "edusystems/api/classrooms/list",
    //     { page: 1 },
    //     success => {
    //       // console.log(success);
    //       this.classroomList = success.data.list;
    //     },
    //     error => {}
    //   );
    // },
    // 获取学员列表
    // getStudentInfo() {
    //   this.$http.get(
    //     "edusystems/api/students/list",
    //     { page: 1 },
    //     success => {
    //       console.log(success);
    //       this.studentList = success.data.list;
    //     },
    //     error => {}
    //   );
    // },
    // 保存
    handleClick() {
      console.log();
      if (this.courseForm.addtype == "one") {
        this.courseForm.weektime = [
          {
            week: 0,
            begintime: this.weekBegintime,
            endtime: this.weekBegintime
          }
        ];
      } else if (this.courseForm.jsfs != "按课节") {
        for (var i in this.week) {
          for (var j in this.week[i]) {
            this.courseForm.weektime.push(this.week[i][j]);
          }
        }
      }
      console.log(this.courseForm);
      console.log(JSON.stringify(this.courseForm));
      // return false
      this.$http.post(
        "edusystems/api/coursetables/add",
        this.courseForm,
        success => {
          this.$message.success({
            message: "班级排课成功",
            type: "success"
          });
          this.$emit("closeAlert");
        },
        error => {}
      );
    }
  }
};
</script>

<style>
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
@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_2397226_4aavsy7kgg5.eot?t=1614750743350"); /* IE9 */
  src: url("//at.alicdn.com/t/font_2397226_4aavsy7kgg5.eot?t=1614750743350#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANgAAsAAAAAByAAAAMRAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCJIISATYCJAMICwYABCAFhG0HNxs/BsiuMG7hSQuAxYI7OgLcCoBnCoKI1srqnVma3SfiAFpAkMTyEV3YRgGrc0G0rOMepm42dGkX8BboEx/LfgTa1sRLYFG2Blhr6nKgn5hat2Dny8j0pZT5lDilGRmDxLbxw/YNEADMvAECzMzH6v8cM10U4DA/0Jwym/YGOG4dUMZ1AR/IHciB+Q1jF7iE6yGAIZuCXnbz9AU1NNYqAeRYFFio5VTolmzBQ3BqDmpkABvP6rSeA/3h78s/6vPAwlZYeat27cHZC+w4dXnusm0+AvZ8BoAdAwVUotAg62pNKxTjUCUWo4VK5KP2lS3wczE357N2+48HAuJgZYYAZELWPbFdzq2WWQBo7n10O+D8qPuAHUaFYeU50zV2ZTwIukcvj6wbG0uW8fHkg5JoRo58/Lhh/7Rx/bB+eb+lf5979cPy6VPBtY+nq7vJY1NyJSOl5SH1h7abRaOTEzeSbxU//Gjev18nNZdHR2+mRI3ONTWx5U5BxPxI+mEigZ93zDm88CP+i5gB83/k2iudI7Gz0ibG0WtBeThK86P49fqwYsVQdgl/VwnGfIcemfONn6fDlH2V/K43t3ukcd/onFd1stnVnWj4p3572jnn7lD2mdseV3T843/LwI/EHwMsAsDc1Iha/Nv/hqR7f3aK8/57gQbgO1m90DE3TT8L4N2cWeAns3u2aJ1rqS2tsmtjFtuVb77KYIA52BbvGytLeqOY4JH0XhaXrBQUHoVIja0Em4BGcPBYCIYK9vGABFgR0T5QLgUgxGrBIppnoIg1IzX2BZtkPzjEpsCwoYRzBhR32CwVskoeOnuMXc59R6smyv6gYJtayXJD0g/JJvKiWV1bjN5STjLHFrILThP1MRDOEICbUZoyQuGYXF1GquuVXnOg7ouWLmdgWEoQSxEPcuyhmIvlfL+zMqWf/0ACWylLWppq9D+I2IjGRyaN0QN5K8p7Nd3LS4idwKmE8qGAYBkEgIGkdoghWD8vRlxqKRoRWFvRUbugr2i5viT7ul2AwZJbYk9QRB2JbGhZfUEeKwEAAAAA")
      format("woff2"),
    url("//at.alicdn.com/t/font_2397226_4aavsy7kgg5.woff?t=1614750743350")
      format("woff"),
    url("//at.alicdn.com/t/font_2397226_4aavsy7kgg5.ttf?t=1614750743350")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_2397226_4aavsy7kgg5.svg?t=1614750743350#iconfont")
      format("svg"); /* iOS 4.1- */
}
.save {
  height: 40px;
  margin-left: 80%;
  margin-bottom: 20px;
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
  float: left;
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
  border: 1px solid #ebeef5;
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
div.floor > div > div > div:nth-child(1) > span{
  display: inline-block;
  background-position: -2px -635px;
  margin-left: 20px;
}
div.floor > div > div > div:nth-child(2) > span{
  background-position: -2px -635px;
}
.classes .el-input__suffix-inner .el-input__icon {
  height: none;
  top: 0px;
}
.createTeacher {
  position: absolute;
  top: 81px;
  left: 150px;
}
</style>

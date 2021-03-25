<template>
  <div class="chartes">
    <div class="left">
      <div class="top">
        <div class="header">
          <p class="title">{{item.name}}</p>
        </div>
        <div class="content">
          <div class="inline">
            <h6>
              <span class="pro_one">课程：</span>
              {{item.coursename}}
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">老师：</span>
              {{item.teacherslist}}
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">教室：</span>
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">人数：</span>2/30
            </h6>
          </div>
          <!-- 进度条 -->
          <el-progress :percentage="50" :color="colores" :stroke-width="15"></el-progress>
          <div class="inline">
            <h6>
              <span class="pro_one already">已上2节课</span>
              <span class="pro_one already2">已排4节课</span>
            </h6>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="one">
          <!-- {{item}} -->
          <div class="inline2">
            <h6>
              <span class="pro_two">选择成员：</span>
              ({{stuList.length}})
            </h6>
          </div>
          <i class="el-icon-user" style="color:blue" @click="stu_load=true"></i>
          <div class="block" v-for="(item2,index) in stuList" :key="index">
            <img src="../../assets/ico1.png" width="50px" height="50px" />
            <p>{{item2.name}}</p>
            <a href="javascript:;">已排{{item2.oncourses}}节，已上{{item2.lavecourses}}节</a>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- <el-calendar v-model="value"></el-calendar> -->
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="单次排课" name="first">
            <!-- <hour></hour> -->
          </el-tab-pane>
          <el-tab-pane label="批量排课" name="second">批量排课</el-tab-pane>
        </el-tabs>
      </div>
      <div class="clear">
        <div class="clear1"></div>
      </div>
    </div>
    <!-- 选择成员 -->
    <el-dialog title="选择学员" :visible.sync="stu_load" :append-to-body="true" width="60%">
      <StudentList @changeStudent="changeStudent" :stuList="stuList"></StudentList>
    </el-dialog>
  </div>
</template>

<script>
// import Hour from "../../views/hour/Hour.vue";
import StudentList from "../../components/classes/StudentList.vue";
export default {
  components: { StudentList },
  name: "ChartList",
  data() {
    return {
      // 课表学员
      stu_load: false,
      // tabs
      activeName: "first",
      colores: "#1bd67b",
      value: new Date(),
      item: [],
      stuList: [],
      // 插班排课表单
      JsonCourse: {
        classid: null,
        studentListes: []
      }
    };
  },
  created() {
    // 获取学生信息
    this.studentList();
  },
  // 接收传值classid和courseid
  props: {
    id: {
      type: Number
    },
    courseid: {
      type: Number
    }
  },
  mounted() {},
  methods: {
    // 切换tabs
    handleClick(tab, event) {
      console.log(this.activeName);
    },
    // 进度条
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    // 获取学生信息
    studentList() {
      console.log(this.courseid);
      console.log(this.id);
      this.$http.get(
        "/students/list",
        { psize: 10000, courseid: this.courseid, classid: this.id },
        success => {
          console.log(success);
          this.stuList = success.data.list;
        },
        failure => {
          console.log("获取学生信息失败");
        }
      );
    },
    // 选择学员完成
    changeStudent(list) {
      console.log(list);
      this.stu_load = false;
      for (var i in list) {
        this.JsonCourse.studentListes.push({
          id: list[i].id
        });
        // 插板排课
        this.JsonCourse.classid = this.classid;
        this.$http.post(
          "/coursetables/addForClassid",
          this.JsonCourse,
          success => {
            this.$message({
              message: "排课成功",
              type: "success"
            });
            this.studentList();
          },
          failure => {
            this.$message.error("排课失败");
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.el-calendar__body {
  padding: 12px 20px 35px;
  height: 513px;
  overflow: scroll;
}
</style>
<style lang="less" scoped>
.chartes {
  .left {
    float: left;
    .top {
      // border:1px solid #f5f5f5;
      width: 369px;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
      .header {
        height: 64px;
        background-color: #1890ff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .title {
          font-size: 14px;
          color: #fff;
          line-height: 64px;
          margin-left: 30px;
        }
      }
      .content {
        font-size: 14px;
        border:1px solid #f5f5f5;
        line-height: 12px;
        .pro_one {
          color: #7e8a9a;
        }
        .already {
          margin-left: 10px;
          margin-top: -19px;
        }
        .already2 {
          margin-left: 170px;
          margin-top: -19px;
        }
      }
    }
    .bottom {
      width: 369px;
      height: 200px;
      background-color: #fff;
      margin-top: 10px;
      border-radius: 10px;
      overflow: scroll;
      border:1px solid #f5f5f5;
      .one {
        width: 313px;
        height: 38px;
        margin-left: 27px;
        margin-top: 20px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 14px;
        line-height: 38px;
      }
      .pro_two {
        color: black;
      }
      h6 {
        color: #c5c3c4;
      }
      i {
        position: absolute;
        left: 339px;
        top: 440px;
        font-size: 20px;
      }
      .block img {
        float: left;
        margin-right: 10px;
      }
      .block p {
        width: 200px;
        height: -30px;
        line-height: 20px;
        overflow: hidden;
        color: #18adff;
        font-size: 14px;
      }
      span {
        color: #948baa;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        font-size: 14px;
        position: relative;
        left: 1px;
        top: -17px;
        color: #7da8d5;
      }
    }
  }
  .right {
    .connect {
      overflow: scroll;
      background-color: #fff;
      height: 500px;
      padding-top: 15px;
      padding-left: 15px;
    }
    .clear {
      clear: both;
    }
    .clear1 {
      float: right;
    }
    width: 930px;
    margin-left: 390px;
    .el-calendar {
      border-radius: 10px;
    }
  }
}
</style>
<template>
  <div class="hour-body">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ data }">
        <div>
          <div class="calendar-day">
            <div style="text-align: center">
              <span class="everyDay">{{
                data.day.split("-").slice(2).join("-")
              }}</span>
            </div>
            <div v-for="(item, index) in courseList" :key="index">
              <div
                v-if="item.coursedate == data.day"
                class="schedule"
              >
              <!-- @click="ClickDetail(index)" -->
                <div class="box-course">
                  <p>{{ item.coursename }}</p>
                  <div>
                    <span class="time">{{
                      $moment.dateFormat("HH:mm", new Date(item.starttime))
                    }}</span>
                    <span>{{ item.teachername }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
    <!-- <div v-if="alertCourseDetail">
      <el-dialog
        title="课程详情"
        :visible.sync="alertCourseDetail"
        :append-to-body="true"
        width="80%"
      >
        <Detail ref="children"  @closeAlert="closeAlert"></Detail>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
// import Detail from "./detail.vue";
export default {
  data() {
    return {
      value: new Date(),
      courseList: [],
      // 弹框课程详情
      alertCourseDetail: false,
      courseid: null,
      classid: null,
      studentid: null,
    };
  },
  created() {
    // 初始化排课列表
    // setTimeout(() => {
    //   this.initCourse(this.value);
    // }, 100);
  },
  methods: {
    // 初始化加载
    // initCourse(dmonth) {
    //   this.$http.get(
    //     "edusystems/api/coursetables/search",
    //     {
    //       month: this.$moment.dateFormat("yyyy-MM", dmonth),
    //       psize: 10000,
    //       courseid: this.courseid,
    //       classid: this.classid,
    //       studentid: this.studentid,
    //     },
    //     (success) => {
    //       console.log(success);
    //       this.courseList = success.data.list;
    //     },
    //     (error) => {}
    //   );
    // },
    // 查看详情
    // ClickDetail(index) {
    //   this.alertCourseDetail = true;
    //   setTimeout(() => {
    //     this.$refs.children.courseid = this.courseList[index].id;
    //   }, 50);
    // },
    // 取消排课
    closeAlert() {
      this.alertCourseDetail = false;
      // 初始化排课列表
      this.initCourse(this.value);
    },
  },
  watch: {
    value(newValue, oldValue) {
      if (
        this.$time.dateFormat("yyyy-MM", newValue) !=
        this.$time.dateFormat("yyyy-MM", oldValue)
      ) {
        this.initCourse(newValue);
      }
    },
  },
  // components: { Detail },
};
</script>

<style lang="less">
.hour-body {
 
  .el-calendar__body {
    padding-bottom: 0;
  }
  tr {
    line-height: normal !important;
    background-color: #fdfdfd !important;
  }
  table {
    font-size: 16px !important;
  }
  .el-calendar-table td:hover {
    background: #ebeef5;
  }
  .el-calendar-table .el-calendar-day {
    height: auto;
    min-height: 85px;
  }
  .el-calendar-table .el-calendar-day:hover {
    cursor: auto;
    background: none;
  }
}
.hour-body table tr td:first-of-type {
  text-align: left;
}
.hour-body .box-course .time {
  margin-right: 10px;
}
.hour-body .box-course p {
  margin-bottom:5px;
  font-size: 12px;
}
.hour-body .box-course span {
  color: #7c8c9c;
}
.hour-body .box-course {
  margin-left: 20px;
  font-size: 12px;
  padding-top:5px;
  color: #000;
  padding-bottom: 6px;
}
.hour-body .schedule {
  width: 126px;
  /* height: 63px; */
  border-left: 6px solid #4381fc;
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-top: 5px;
  cursor: pointer;
}
</style>
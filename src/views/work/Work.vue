<template>
  <div class="attendance-body">
    <!-- 头部 -->
    <div class="header">
      <div class="title">考勤管理</div>
      <div class="time">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="today"
          value-format="yyyy-MM-dd"
          @blur="loaddate"
        ></el-date-picker>
      </div>
      <el-form ref="form" :model="attendanceFrom">
        <div class="form-search">
          <el-select v-model="attendanceFrom.searchListThis" :clearable="true" @change="workSelect" placeholder="班级">
            <el-option
              v-for="(item,index) in attendanceFrom.searchList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <i class="el-icon-search searchIcon"></i>
          <!-- <input v-model="attendanceFrom.search" placeholder="搜索学员快速签到" class="search" /> -->
          <el-autocomplete
            class="search"
            v-model="attendanceFrom.search"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索学员快速签到"
            @select="handleSelect"
            value-key="name"
            :clearable="true"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </div>
      </el-form>
    </div>
    <!-- 内容 -->
    <div class="connect">
      <p>今日课表</p>
      <div class="day">
        <div class="title">
          <div class="select">
            <input type="checkbox" name id class="checkbox-selectStudent" />
            <span>全选</span>
            <div class="attendance">考勤</div>
          </div>
        </div>

        <div v-for="item in attendanceList" :key="item.id">
          <!-- {{item}} -->
          <div class="student-group">
            <div class="row">
              <div class="title">
                <input type="checkbox" name id class="checkbox-selectStudent" />
                <span>{{ item.classname }}</span>
                <div class="classCourse">班课</div>
                <div class="book-course">
                  <img src="../../assets/课程.gif" alt srcset />
                  <span>{{ item.coursename }}</span>
                </div>
                <div class="book-course">
                  <img src="../../assets/时间.gif" alt srcset />
                  <!-- {{$time.dateFormat('HH:mm',item.endtime)}} -->
                  <span>
                    {{
                    $moment.dateFormat("HH:mm", new Date(item.starttime))
                    }}-{{
                    $moment.dateFormat("HH:mm", new Date(item.endtime))
                    }}
                  </span>
                </div>
                <div class="book-course">
                  <img src="../../assets/hat.gif" alt srcset />
                  <span>{{ item.teachername }}</span>
                </div>
              </div>
              <div class="group">
                <div class="student-group-row" v-for="item2 in item.studentList" :key="item2.id">
                  <input type="checkbox" name id class="checkbox-selectStudent" />
                  <img src="../../assets/ico1.png" alt srcset />
                  <span>{{ item2.name }}</span>
                  <div class="right">
                    <img src="../../assets/到达.gif" alt srcset />
                    <span>{{ item2.checkedName }}</span>
                    <img src="../../assets/签到.gif" alt srcset />
                    <span class="sign-in" @click="qiandao(item.id,item2.id)">签到</span>
                  </div>
                </div>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </div>
    <!-- 考勤签到 -->
    <el-dialog title="签到" :visible.sync="dialogVisible" :append-to-body="true" width="60%">
      <WorkList ref="workChilds" @workChild="workAdd"></WorkList>
    </el-dialog>
  </div>
</template>

<script>
import WorkList from "../../components/work/WorkList.vue";
export default {
  components: { WorkList },
  name: "index",
  data() {
    return {
      today: new Date(),
      // 考勤数据
      attendanceList: [],
      form: {
        date1: "",
        date2: ""
      },
      attendanceFrom: {
        // 班级数据
        searchList: [],
        // 班级id
        searchListThis: "",
        // 学生id
        studentid:null,
        // 内容
        search: ""
      },
      dialogVisible: false
    };
  },

  created() {
    this.loaddate();
    // 班级数据
    this.classData();
  },
  mounted() {

  },
  methods: {
    // 初始化考勤数据
    attendance() {
      this.$http.get(
        "/coursetables/checked",
        {
          today: this.$moment.dateFormat("yyyy-MM-dd", new Date(this.today)),
          psize: 100,
          classid: this.attendanceFrom.searchListThis,
          studentid:this.attendanceFrom.studentid
        },
        success => {
          this.attendanceList = success.data.list;
        },
        failure => {
          console.log("获取考勤数据失败");
        }
      );
    },
    // 获取班级数据
    classData() {
      this.$http.get(
        "/classes/list",
        {psize: 10000 },
        success => {
          this.attendanceFrom.searchList = success.data.list;
        },
        failrue => {
          console.log("获取数据失败");
        }
      );
    },
    // 日期
    loaddate() {
      // console.log(this.today)
      this.attendance();
    },
    // 搜索
    querySearchAsync(queryString,cb) {
      // 输入的内容
      this.$http.get(
        "/students/list",
        { psize: 10000, name: queryString },
        success => {
          cb(success.data.list);
        },
        failrue => {
          console.log("获取数据失败");
        }
      );
    },
    // 点击选中建议项时触发
    handleSelect(item) {
      this.attendanceFrom.studentid = item.id;
      this.attendance();
    },
    // (子传父)
    workAdd() {
      this.dialogVisible = false;
      this.attendance();
    },
    // 签到
    qiandao(courseid, id) {
      this.dialogVisible = true;
      setInterval(() => {
        this.$refs.workChilds.form.id = id;
        this.$refs.workChilds.form.courseid = courseid;
      }, 50);
    },
    // change
    workSelect(){
      this.classid = this.attendanceFrom.searchListThis
      this.attendance()
    }
  }
};
</script>

<style lang="less">
.header {
  .form-search {
    .el-input__inner {
      border: none;
      height: 33px;
      background-color: transparent;
    }
  }
}
</style>
<style lang="less">
.attendance-body {
  .qiandao {
    cursor: pointer;
  }
  * {
    font-size: 14px;
  }
  background-color: #fff;
  height: 100%;
  .el-form-item {
    margin: 0 auto;
  }
  .connect {
    .sign-in {
      cursor: pointer;
    }
    .day {
      .title {
        margin-left: 60px;
        margin-top: 30px;
        margin-bottom: 24px;
        .select {
          position: relative;
          .attendance {
            cursor: pointer;
            background-color: #4385f5;
            color: #fff;
            text-align: center;
            display: inline-block;
            width: 120px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            margin-left: 15px;
            border-radius: 4px;
            position: absolute;
            top: -12px;
          }
        }
      }
      .student-group {
        margin-top: 18px;
        margin-left: 25px;
        border: 1px solid #e5e5e5;
        width: 96%;
        .row {
          margin-left: 20px;
          margin-top: 32px;
          .title {
            margin-left: 12px;
            .classCourse {
              display: inline-block;
              padding: 5px 10px;
              background-color: #c6eae0;
              color: #2acd72;
              margin-left: 15px;
              margin-right: 31px;
            }
          }
        }
      }
      .student-list-detail {
        margin-left: 25px;
        > .student-group-row {
          margin-top: 20px;
          padding-left: 29px;
          height: 72px;
          line-height: 72px;
          border: 1px solid #e5e5e5;
          width: 96%;
          > span {
            margin-right: 105px;
          }
        }
      }
    }
  }
  .el-select .el-input__inner {
    border: 0;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .header {
    height: 52px;
    background-color: #f5f6fa;
    border: 1px solid #dfe3ec;
  }
  .header .title {
    width: 100px;
    height: 52px;
    background-color: #dfe3ec;
    text-align: center;
    line-height: 50px;
    position: absolute;
    top: 59px;
    left: 125px;
  }
  .header .title:before {
    content: "";
    height: 0%;
    border: 26px solid;
    border-color: transparent transparent transparent #dfe3ec;
    position: absolute;
    left: 100px;
    top: 0px;
  }
  .header .time {
    float: left;
    margin-left: 160px;
    margin-top: 5px;
  }
  /* 搜索 */
  .header .search {
    width: 200px;
    height: 35px;
    border: 1px solid #dee3e9;
    border-radius: 2px;
    margin-left: 15px;
    padding-left: 100px;
    padding-right: 50px;
    outline: none;
  }
  .form-search {
    position: relative;
    display: inline-block;
    margin-top: 5px;
  }
  .el-form {
    display: inline-block;
  }
  .form-search .searchIcon {
    right: 16px;
    top: 10px;
    position: absolute;
    font-size: 20px;
    cursor: pointer;
    z-index: 998;
  }
  .header .el-select {
    width: 94px;
    position: absolute;
    left: 25px;
    top: 0px;
    z-index: 998;
    .el-input__inner {
      background: none !important;
    }
    .el-input .el-select__caret {
      margin-top: 4px;
    }
  }
  .connect p {
    margin-top: 30px;
    margin-left: 20px;
  }
}
.checkbox-selectStudent {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

.student-group-row {
  position: relative;
  height: 72px;
  line-height: 72px;
  border-bottom: 1px solid #e5e5e5;
  padding-left: 10px;
  .checkbox-selectStudent {
    margin-right: 24px;
  }
  .right {
    float: right;
    img {
      margin-right: 10px;
    }
    span {
      margin-right: 62px;
    }
  }
  > img {
    position: absolute;
    top: 20px;
  }
  > span {
    margin-left: 40px;
    cursor: pointer;
  }
}
.book-course {
  display: inline-block;
  margin-right: 42px;
  span {
    margin-left: 6px;
  }
}
</style>
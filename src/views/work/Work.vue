<template>
  <div class="attendance-body">
    <!-- 头部 -->
    <div class="header">
      <div class="title">考勤管理</div>
      <div class="time">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>-
        <el-date-picker type="date" placeholder="结束日期" v-model="form.date2"></el-date-picker>
      </div>
      <el-form ref="form" :model="attendanceFrom">
        <div class="form-search">
          <el-select v-model="attendanceFrom.searchListThis">
            <el-option
              v-for="item in attendanceFrom.searchList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <i class="el-icon-search searchIcon"></i>
          <input v-model="attendanceFrom.search" placeholder="搜索学员快速签到" class="search" />
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
        <div class="student-group">
          <div class="row">
            <div class="title">
              <input type="checkbox" name id class="checkbox-selectStudent" />
              <span>架子鼓基础班2101</span>
              <div class="classCourse">班课</div>
              <div class="book-course">
                <img src="../../assets/课程.gif" alt srcset />
                <span>架子鼓课</span>
              </div>
              <div class="book-course">
                <img src="../../assets/时间.gif" alt srcset />
                <span>08:00-08:45</span>
              </div>
              <div class="book-course">
                <img src="../../assets/hat.gif" alt srcset />
                <span>在</span>
              </div>
            </div>
            <div class="group">
              <div class="student-group-row">
                <input type="checkbox" name id class="checkbox-selectStudent" />
                <img src="../../assets/ico1.png" alt srcset />
                <span>李宗霖</span>
                <div class="right">
                  <img src="../../assets/到达.gif" alt srcset />
                  <span>已到达</span>
                  <img src="../../assets/签到.gif" alt srcset />
                  <span>签到</span>
                </div>
              </div>
              <div class="student-group-row">
                <input type="checkbox" name id class="checkbox-selectStudent" />
                <img src="../../assets/ico1.png" alt srcset />
                <span>李宗霖</span>
                <div class="right">
                  <img src="../../assets/到达.gif" alt srcset />
                  <span>已到达</span>
                  <img src="../../assets/签到.gif" alt srcset />
                  <span>签到</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="student-list-detail">
          <div class="student-group-row">
            <input type="checkbox" name id class="checkbox-selectStudent" />
            <img src="../../assets/ico1.png" alt srcset />
            <span>李宗霖</span>
            <div class="right">
              <img src="../../assets/到达.gif" alt srcset />
              <span>已到达</span>
              <img src="../../assets/签到.gif" alt srcset />
              <span>签到</span>
            </div>
          </div>
          <div class="student-group-row">
            <input type="checkbox" name id class="checkbox-selectStudent" />
            <img src="../../assets/ico1.png" alt srcset />
            <span>李宗霖</span>
            <div class="book-course">
              <img src="../../assets/课程.gif" alt srcset />
              <span>架子鼓课</span>
            </div>
            <div class="book-course">
              <img src="../../assets/时间.gif" alt srcset />
              <span>08:00-08:45</span>
            </div>
            <div class="book-course">
              <img src="../../assets/到达.gif" alt srcset />
              <span>在</span>
            </div>
            <div class="right">
              <img src="../../assets/到达.gif" alt srcset />
              <span>已到达</span>
              <img src="../../assets/签到.gif" alt srcset />
              <span>签到</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      form: {
        date1: "",
        date2: ""
      },
      attendanceFrom: {
        searchList: [
          {
            label: "课程",
            value: 0
          },
          {
            label: "老师",
            value: 1
          }
        ],
        searchListThis: "",
        // 搜索内容
        search: ""
      },
      dialogVisible: false
    };
  },
  mounted() {
    // 设置搜索框下的默认选中
    this.attendanceFrom.searchListThis = this.attendanceFrom.searchList[0].value;
  },
  methods: {}
};
</script>

<style lang="less">
.attendance-body {
  *{
    font-size:14px;
  }
  background-color: #fff;
  height: 100%;
  .el-form-item {
    margin: 0 auto;
  }
  .connect {
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
    background-color: #ffffff;
  }
  .header .el-select {
    width: 80px;
    position: absolute;
    left: 30px;
    top: 0px;
    .el-input__inner {
      background: none !important;
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
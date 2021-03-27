<template>
  <div class="houres">
    <el-button-group>
      <div class="introduction">课时汇总</div>
      <div class="brief"></div>
      <div class="brief-s"></div>
      <div class="sele">
        <el-dropdown>
          <span class="el-dropdown-link">
            课程
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            班级
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <input type="text" />
      </div>
    </el-button-group>
    <div class="row-course">
      <div class="dates">
        <div class="upper" @click="firstMonth('-')">上一月</div>
        <div class="data">
          <el-date-picker v-model="Time" type="month" @change="dayMath" placeholder="选择月"></el-date-picker>
        </div>
        <div class="lower" @click="firstMonth('+')">下一月</div>
        <ul>
          <li>
            <button class="prass">按月</button>
            <button class="prass1">按日</button>
          </li>
          <li>已结果：0</li>
          <li>
            <div class="result"></div>未结果:303
          </li>
          <li>总排学生数：39位</li>
          <li>总排课时：304</li>
        </ul>
      </div>
    </div>
    <table class="thead">
      <tr v-for="(item,index) in dayMathList" :key="index">
        <td>{{item}}</td>
        <td>
          <template v-for="vals in navlist">
            <div
              v-if="item==vals.coursedate"
              :key="vals.id"
              class="subject"
              @click="handleClickDeail(index,vals.id)"
            >
              <th>{{vals.coursename}}:{{vals.classname}}</th>
              <div>{{$moment.dateFormat('MM-dd',new Date(vals.starttime))}}</div>
              <div>{{vals.teachername}}</div>
            </div>
          </template>
        </td>
      </tr>
    </table>
    <!-- 课程详情 -->
    <el-dialog title="课程信息" :visible.sync="dialogVisible" :append-to-body="true" width="80%">
      <HourList ref="hourChild" :tableid="tableid" @hourChild='hourChild'></HourList>
    </el-dialog>
  </div>
</template>

<script>
import HourList from "../../components/hour/HourList.vue";
export default {
  components: { HourList },
  data() {
    return {
      // 天数
      Time: new Date(),
      dayMathList: [],
      // value:new Date(),
      dialogVisible: false,
      // 列表
      HourList: [],
      // 课表id
      tableid: "",
      // 循环列表
      navlist: [],
      CourseDetails: false,
      sendData: []
    };
  },
  created() {
    // 天数
    this.dayMath();
    // 初始化排课列表
    this.calendar();
  },
  methods: {
    // 天数
    dayMath() {
      var year = this.$moment.dateFormat("yyyy", this.Time);
      var month = this.$moment.dateFormat("MM", this.Time);
      var days = new Date(year, month, 0).getDate();
      this.dayMathList = [];
      for (var i = 1; i <= days; i++) {
        if (i < 10) {
          i = "0" + i;
        }
        // console.log(i);
        this.dayMathList.push(year + "-" + month + "-" + i);
      }
      // console.log(this.dayMathList);
      // console.log(year);
      // console.log(month);
      // console.log(days);
    },
    // 改变
    firstMonth(value) {
      var year = this.$moment.dateFormat("yyyy", this.Time);
      var month = Number(this.$moment.dateFormat("MM", this.Time));
      if (value == "-") {
        if (month > 1) {
          month -= 1;
        } else {
          month = 12;
          --year;
        }
      } else {
        if (month < 12) {
          // console.log(month);

          month += 1;
        } else {
          month = 1;
          ++year;
        }
      }

      this.Time = new Date(year + "-" + month);
      this.dayMath();
      // console.log(month);
    },
    // 初始化加载
    calendar() {
      this.$http.get(
        "/coursetables/search",
        {
          month: this.$moment.dateFormat("yyyy-MM", this.Time),
          page: 1,
          psize: 10000
        },
        success => {
          this.navlist = success.data.list;
          // this.navlist.push(success.data.list[0])
          // console.log(this.navlist);
        },
        failure => {
          console.log("课程汇总数据请求失败");
        }
      );
    },

    // 查看详情
    ClickDetail(index) {
      this.dialogVisible = true;
      // console.log(this.HourList[index])
      setTimeout(() => {
        this.$refs.hourChild.courseInfo = this.HourList[index];
      }, 50);
    },

    handleClickDeail(index, id) {
      this.tableid = id;
      this.dialogVisible = true;
      this.sendData = this.navlist[index];
      console.log(this.tableid);
    },
    // 
    hourChild(){
      this.dialogVisible = false
      this.calendar()
    }
  }
};
</script>
<style lang="less" scoped>
.el-date-picker table {
  table-layout: fixed;
  width: 100%;
  margin-left: -800px;
  position: relative;
  top: -40px;
}

</style>
<style lang="less" scoped>
.houres {
  .el-main {
    background-color: #e9eef3;
    color: #333;
    padding: 0px;
  }
  .el-button-group {
    width: 100% !important;
    position: relative;
    height: 51px;
    border: #c8ccd5 solid 1px;
    background-color: #f5f6fa;
  }
  .introduction {
    width: 106px;
    height: 51px;
    background-color: #dfe3ec;
    line-height: 51px;
    font-size: 16px;
    text-align: center;
  }
  .brief {
    width: 0;
    height: 0;
    border-right: 16px solid transparent;
    border-bottom: 25px solid #dfe3ec;
    left: 106px;
    top: 0px;
    position: absolute;
  }
  .brief-s {
    width: 0;
    height: 0;
    border-right: 16px solid transparent;
    border-top: 25px solid #dfe3ec;
    position: absolute;
    left: 106px;
    top: 25px;
  }
  .el-dropdown-link {
    cursor: pointer;
    margin-right: 36px;
    padding-left: 10px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .sele {
    position: absolute;
    left: 158px;
    top: 6px;
    color: #a0a3aa;
    border: 1px solid #dee3e9;
    height: 36px !important;
    width: 518px;
    line-height: 36px;
    background-color: #ffffff;
  }
  .sele input {
    border: 0px;
    background: url("../../assets/ico.png") no-repeat;
    background-position: 183px -438px;
    width: 312px;
    height: 27px;
  }
  .row-course {
    width: 100%;
    height: 52px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    margin-left: 24px;
  }
  .dates {
    margin-left: 9px;
    margin-right: 50px;
    line-height: 52px;
  }
  .upper {
    float: left;
    line-height: 52px;
    width: 80px;
    background: url("../../assets/ico.png") no-repeat;
    background-position: -164px -887px;
    margin: 0px;
    padding-left: 20px;
    cursor: pointer;
  }
  .data {
    width: 162px;
    float: left;
    line-height: 52px;
  }
  .lower {
    float: left;
    line-height: 52px;
    width: 80px;
    background: url("../../assets/ico.png") no-repeat;
    background-position: 65px -888px;
    margin: 0px;
    margin-left: 100px;
    cursor: pointer;
  }
  .total {
    float: right;
  }
  .row-course .dates ul li {
    float: right;
    margin-right: 30px;
    position: relative;
    list-style: none;
  }
  .row-course .dates ul li .result {
    width: 12px;
    height: 12px;
    background-color: #925ff8;
    position: absolute;
    left: -15px;
    top: 20px;
  }

  .prass {
    border: 1px solid #dcdfe6;
    width: 68px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 33px;
  }
  .prass1 {
    border: 1px solid #dcdfe6;
    width: 68px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 33px;
  }
  .thead {
    width: 100%;
    height: 100%;
    cursor: pointer;
    /* background-color: red; */
    margin-left: 24px;
  }
  .thead tr {
    width: 100%;
  }
  .thead tr td {
    border-bottom: 2px solid #e5e5e5;
    height: 99px;
    position: relative;
    padding-left: 10px;
  }
  .thead tr td:first-of-type {
    width: 125px;

    background-color: #f3f3f3;
    line-height: 99px;
  }
  .thead tr td:nth-of-type(2) {
    background-color: #f7f7f7;
  }
  .thead tr td .subject {
    width: 150px;
    // height: 57px;
    min-height: 57px;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 13px;
    top: 20px;
    left: 14px;
    border-left: 4px solid #4381fc;
    text-align: center;
    display: inline-block;
    margin-left: 10px;
  }
  .thead tr td .subject th {
    padding-top: 7px;
  }
  .thead tr td .subject div {
    float: left;
    margin-left: 10px;
    margin-top: 5px;
    color: #c8ccd5;
  }
  .thead tr:nth-of-type(6) td:first-of-type,
  .thead tr:nth-of-type(7) td:first-of-type {
    background-color: #fefa8f;
  }
}
</style>
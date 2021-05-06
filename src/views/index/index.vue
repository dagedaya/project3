<template>
  <div class="home">
    <div class="title">首页</div>
    <!-- 整个页面 -->
    <div class="main">
      <!-- 整个左面 -->
      <div class="left-All">
        <!-- 左上 -->
        <div class="left-top">
          <div class="today">
            <i
              class="iconfont icon-shuju"
              style="font-size:20px;color:#f54f43"
            ></i>
            今日数据变动
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">
              {{ todayList.addCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
          <div class="add">
            <div class="student">待续费学员</div>
            <p class="zier">
              {{ todayList.renewCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
          <div class="add">
            <div class="student">今日课节</div>
            <p class="zier">
              {{ todayList.courseCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
          <div class="add">
            <div class="student">请假人数</div>
            <p class="zier">
              {{ todayList.leaveCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
          <div class="add">
            <div class="student">上课学员人数</div>
            <p class="zier">
              {{ todayList.studentCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
          <div class="add add1">
            <div class="student">上课老师人数</div>
            <p class="zier">
              {{ todayList.teacherCounts }}&nbsp;&nbsp;<span class="student"
                >(人)</span
              >
            </p>
          </div>
        </div>
        <!-- 左下 -->
        <div class="left-bottom">
          <div class="xiala">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item class="cap_header">
                <el-select v-model="form.region" placeholder="请选择年份">
                  <el-option
                    :label="item.title"
                    v-for="(item, index) in campusList"
                    :key="index"
                    :clearable="true"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div class="statistics">
            <i
              class="iconfont icon-tongji1"
              style="color:#6abde9;font-size:20px;margin-right:10px"
            ></i
            >学生数统计
          </div>
          <div
            id="myChart"
            :style="{
              width: '920px',
              height: '300px',
              position: 'absolute',
              left: '30px',
              top: '23px'
            }"
          ></div>
        </div>
      </div>
      <!-- 整个右面 -->
      <div class="right-All">
        <!-- 右上面 -->
        <div class="right-top">
          <div class="remind">
            <div>
              <i
                class="iconfont icon-tixingtianchong"
                style="font-size:20px;color:#68bce8;padding-right:10px"
              ></i>
              <span class="warn">事项提醒</span>
            </div>

            <div class="lingfont">0</div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon"><i class="iconfont icon-yousanjiao"></i></div>
          </div>
        </div>
        <!-- 右下面 -->
        <div class="right-bottom">
          <div class="list-bottom">
            <div>
              <i
                class="iconfont icon-dangao"
                style="font-size:20px;color:#69bce8;padding-left:20px"
              ></i>
              <span class="birthday">生日学员</span>
            </div>
            <div class="ling">
              {{ birthdayList.length
              }}<span><i class="iconfont icon-yousanjiao"></i></span>
            </div>
          </div>
          <div
            class="member"
            v-for="(item, index) in birthdayList"
            :key="index"
          >
            <div class="boder">
              <img
                :src="imgUrl + item.photo"
                v-if="item.photo != null && item.photo != ''"
                style="width:20px;height:20px"
              />
              <img
                src="../../assets/ico1.png"
                v-else
                style="width:20px;height:20px;border-radius:50%"
              />
              <div class="wenzi">{{ item.name }}</div>
            </div>
            <div class="time">
              {{ $moment.dateFormat("yyyy-MM-dd", new Date(item.birthday)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      form: {
        region: ""
      },
      // 校区信息
      campusList: [],
      // 月份
      monthList: [],
      // 数据
      countsList: [],
      // 单月月份
      AloneList: [],
      // 单月数据
      AloneCountsList: [],
      //学生统计总数
      studentList: [],
      // 当前时间
      year: new Date(),
      // 今日数据变动
      todayList: [],
      // 学生生日信息
      birthdayList: [],
      // 头像路径
      imgUrl: this.$config.imgUrl
    };
  },
  mounted() {
    // this.drawLine();
  },
  created() {
    this.campus();
    // 获取今日数据变动
    this.todaycounts();
    // 获取学生生日信息
    this.birthday();
    // 获取学生统计总数
    this.studentTotal();
    // 学生单月增加统计
    this.studentAlone();
  },
  methods: {
    // 获取校区信息
    campus() {
      this.$http.get(
        "/campus/list",
        { page: 1 },
        success => {
          console.log(success);
          this.campusList = success.data.list;
        },
        failure => {
          console.log("获取信息失败");
        }
      );
    },
    // 下拉改变
    change() {
      this.$forceUpdate();
    },
    // 获取今日数据变动
    todaycounts() {
      this.$http.post(
        "/students/todaycounts",
        null,
        success => {
          this.todayList = success.data.model;
          console.log("今日数据变动：", this.todayList);
        },
        failure => {
          console.log("获取今日数据变动失败");
        }
      );
    },
    // 获取学生生日数据
    birthday() {
      this.$http.post(
        "/students/birthday",
        null,
        success => {
          console.log(success);
          this.birthdayList = success.data.list;
          console.log("学生生日信息：", this.birthdayList);
        },
        failure => {
          console.log("获取学生生日信息失败");
        }
      );
    },
    // 学生总数统计
    studentTotal() {
      // this.$moment.dataFormat(yyyy,this.year)
      this.$http.post(
        "/students/allcounts?year=2020",
        null,
        success => {
          console.log(success);
          for (var i in success.data.list) {
            // 月份
            this.monthList.push(success.data.list[i].month);
            // 数据
            this.countsList.push(success.data.list[i].counts);
          }
          console.log("月份", this.monthList);
          console.log("数据", this.countsList);
          this.drawLine();
        },
        failure => {
          console.log("获取学生总数统计失败");
        }
      );
    },
    // 学生单月增加统计
    studentAlone() {
      this.$http.post(
        "/students/monthcounts?year=2020",
        null,
        success => {
          console.log(success);
          for (var i in success.data.list) {
            // 月份
            this.AloneList.push(success.data.list[i].month);
            // 数据
            this.AloneCountsList.push(success.data.list[i].counts);
          }
          console.log("单月月份", this.AloneList);
          console.log("单月数据", this.AloneCountsList);
        },
        failure => {
          console.log("获取学生单月增加统计");
        }
      );
    },
    // echarts图表
    drawLine() {
      var that = this;
      // 基于准备好的dom，初始化echarts实例
      let echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          // text: "学生数统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["学生总数", "单月增加"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // 下载按钮
        /* 
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }, */
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.monthList
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "学生总数",
            type: "line",
            stack: "总量",
            data: this.countsList
          },
          {
            name: "单月增加",
            type: "line",
            stack: "总量",
            data: this.AloneCountsList
          }
        ]
      });
    },
    // 年份
    Allcounts(){
      this.$http.post()
    }
  }
};
</script>

<style lang="less" scoped>

* {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
}
.home {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .title {
    margin-left: 10px;
    height: 74px;
    line-height: 74px;
    font-size: 20px;
  }
  .main {
    height: 580px;
    margin-left: 10px;
    max-width: 100%;
    display: flex;
    // 整个左面
    .left-All {
      margin-right: 20px;
      flex: 1;
      .xiala{
        margin-left:650px;
        padding-top:15px;
        z-index:99999;
      }
      .left-top {
        height: 220px;
        margin-bottom: 20px;
        background-color: #fff;
        .today {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #f5f5f5;
          margin-left: 34px;
          margin-right: 34px;
        }
        .add {
          float: left;
          .zier {
            color: #f54d40;
          }
          .student {
            color: #a47678;
          }
          width: auto;
          width: 15%;
          height: 130px;
          border-right: 1px solid #f5f5f5;
          text-align: center;
          line-height: 30px;
          padding-top: 50px;
        }
        .add1 {
          border: none;
        }
      }
      .left-bottom {
        height: 330px;
        background-color: #fff;
        position: relative;
        .statistics {
          font-size: 25rpx;
          font-weight: bold;
          padding-left: 40px;
          margin-top:-40px;
        }
      }
    }
    // 整个右面
    .right-All {
      .warn {
        font-weight: 600;
      }
      float: right;
      min-width: 300px;
      height: 100%;
      width: 300px;
      .right-top {
        .lingfont {
          font-weight: 600;
        }
        height: 300px;
        background-color: #fff;
        .remind {
          display: flex;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 20px;
          height: 50px;
          line-height: 50px;
        }
        .list {
          width: 100%;
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          .money {
            width: 40px;
            height: 20px;
            background-color: #e7f3ff;
            color: #309cff;
            font-size: 14px;
            text-align: center;
            line-height: 20px;
            float: left;
            margin-top: 10px;
            margin-left: 10px;
          }
          .font {
            padding-left: 60px;
          }
          .icon {
            padding-right: 20px;
          }
        }
      }
      .right-bottom {
        height: 250px;
        background-color: #fff;
        margin-top: 20px;
        .member {
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f5f5f5;
          margin-left: 10px;

          .boder {
            img {
              float: left;
              margin-top: 10px;
            }
            .wenzi {
              padding-left: 30px;
            }
          }

          .time {
            padding-right: 20px;
          }
        }
        .list-bottom {
          display: flex;
          justify-content: space-between;
          line-height: 50px;
          line-height: 50px;
        }
        .birthday {
          padding-left: 10px;
          font-weight: 600;
        }
        .ling {
          font-weight: 600;
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="Houres">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ data }">
        <!-- 显示数字 -->
        <div>
          <div class="calendar-day">
            <div style="text-align: center">
              <span class="everyDay">
                {{
                data.day.split("-").slice(2).join("-")
                }}
              </span>
            </div>
          </div>
        </div>
        <div v-for="(item,index) in HourList" :key="item.id" class="box-style">
          <div v-if="item.coursedate == data.day" class="dataes" @click="ClickDetail(index)">
            <div class="box-course">
              <p>{{ item.coursename }}</p>
              <div>
                <span class="time">
                  {{
                  $moment.dateFormat("HH:mm", new Date(item.starttime))
                  }}
                </span>
                <span>{{ item.teachername }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
    <el-dialog title="课程信息" :visible.sync="dialogVisible" width="60%">
      <HourList ref="hourChild"></HourList>
    </el-dialog>
  </div>
</template>

<script>
import HourList from "../../components/hour/HourList.vue";
export default {
  components: { HourList },
  name: "Hour",
  data() {
    return {
      dialogVisible: false,
      value: new Date(),
      // 列表
      HourList: []
    };
  },
  created() {
    // 初始化排课列表
    this.calendar(this.value);
  },
  mounted() {},
  methods: {
    // 初始化加载
    calendar(valmonth) {
      this.$http.get(
        "/coursetables/search",
        { month: this.$moment.dateFormat("yyyy-MM", valmonth), page: 1,psize:10000 },
        success => {
          this.HourList = success.data.list;
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
    }
  }
};
</script>

<style lang="less">
.Houres {
  .dataes {
    width: 126px;
    height: 63px;
    border-left: 6px solid #4381fc;
    border-radius: 3px;
    background-color: #f5f5f5;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-top: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 10px;
    padding-top:5px;
  }
  table {
    font-size: 14px !important;
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
</style>

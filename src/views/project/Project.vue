<template>
  <div>
    <div class="box-header">
      <!-- 输入框 -->
      <div class="place">
        <button class="btn">课程管理</button>
        <div class="triangle"></div>
        <el-button @click="dialogVisible = true">
          <i class="el-icon-folder-add"></i>&nbsp;添加班级
        </el-button>
      </div>
      <div class="select-box">
        <div class="text-box2">
          <input type="text" class="el-input__inner" />
        </div>
        <i class="el-icon-search search"></i>
      </div>
    </div>
    <table class="tab">
      <tr>
        <th class="textleft" width="49%" style="text-align:left">课程名称</th>
        <th width="17%">收费模式</th>
        <th width="17%">单价</th>
        <th width="17%">上课模式</th>
      </tr>
      <tr v-for="(item,index) in dataList" :key="index">
        <td style="text-align:left;clear:both; line-height:55px">
          <span class="table-s"></span>
          {{item.className}}
        </td>
        <td>{{item.mode}}</td>
        <td>{{item.money}}</td>
        <td>{{item.class}}</td>
      </tr>
    </table>
    <!-- 添加班级 -->
    <el-dialog title="增加班级" :visible.sync="dialogVisible" width="47%">
      <ProjectList></ProjectList>
      <span slot="footer" class="dialog-footer">
        <el-button class="button-box" type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入组件
import ProjectList from "../../components/project/ProjectList.vue";
export default {
  components: { ProjectList },
  data() {
    return {
      dialogVisible: false,
      dataList: [
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        },
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        },
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        },
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        },
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        },
        {
          className: "架子鼓基础班",
          mode: "按课收费",
          money: "500.00元、课时",
          class: "集体班"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
/* 表格 */
.table-s {
  float: left;
  width: 48px;
  height: 50px;
  background-image: url("../../assets/ico.png");
}
span:nth-of-type(1) {
  background-position: -82px -234px;
  margin-top: 18px;
  margin-left: 10px;
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
}
.tab th {
  background: #f5f6fa;
  height: 35px;
  text-align: center;
  font-weight: normal;
}
/* 输入框 */

.select-box {
  width: 420px;
  height: 31px;
  border: 1px solid #dee3e9;
  margin-left: 297px;
  margin-top: -42px;
  line-height: 28px;
  padding-left: 5px;
  float: left;
  background-color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #9ea4b0;
}
.text-box2 {
  width: 260px;
  position: relative;
  /* left: 90px; */
  top: -30px;
}

.el-input__inner {
  margin-top: 25px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
}
/* 搜索 */
.el-icon-search {
  position: absolute;
  left: 686px;
  top: 16px;
  font-size: 20px;
}

/* 按钮 */
/* 三角 */

.triangle {
  width: 0;
  height: 0;
  border-top: 19px solid transparent;
  border-left: 38px solid #dbdfe8;
  border-bottom: 19px solid transparent;
  position: absolute;
  left:99px;
  top:7px;
}
.place .btn {
  width: 100px;
  height: 36px;
  background-color: #dbdfe8;
  border: none;
  margin-right: 40px;
  outline:none; 
}
div.el-dialog__footer > span > button {
  background-color: #4281fc;
  color: #fff;
}
.box-header {
  width: 99.9%;
  height: 55px;
  background-color: #f0f1f5;
  border-right: 1px solid #dee3e9;
  border-bottom: 1px solid #dee3e9;
  position: relative;
}

.el-button {
  padding: 6px 15px;
  margin: 10px 15px;
  background-color: #fff;
  color: #9ea4b0;
  font-size: 14px;
}
.box-header .box2 {
  border: 1px solid #dee3e9;
  background-color: #fff;
  color: #9ea4b0;
  width: 100px;
  margin-left: -5px;
}
.el-icon-folder-add {
  font-weight: bold;
  font-size: 16px;
}
</style>
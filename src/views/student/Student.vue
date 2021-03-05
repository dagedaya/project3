<template>
  <div>
    <div class="box-header">
      <!-- 输入框 -->
      <div class="place">
        <button class="btn">学员管理</button>
        <div class="triangle"></div>
        <el-button @click="dialogVisible = true">
          <i class="el-icon-user"></i>&nbsp;添加学员
        </el-button>
        <el-button @click="course = true">
          <i class="el-icon-folder-add"></i>&nbsp;添加排课
        </el-button>
        <el-button>
          <i class="el-icon-delete"></i>&nbsp;删除
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
        <th width="2%">
          <input type="checkbox" name id />
        </th>
        <th width="20%">学生姓名</th>
        <th width="14%">性别</th>
        <th width="14%">所选课程</th>
        <th width="14%">购买总课时</th>
        <th width="14%">已上课时</th>
      </tr>
      <tr>
        <td>
          <input type="checkbox" name id />
        </td>
        <td>
          <span></span>
          李红
        </td>
        <td>女</td>
        <td>php</td>
        <td>10</td>
        <td>9</td>
      </tr>
    </table>

    <!-- 添加班级 -->
    <el-dialog title="添加学员" :visible.sync="dialogVisible" width="47%">
      <StudentList></StudentList>
      <span slot="footer" class="dialog-footer">
        <el-button class="button-box" type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>
    <!-- 添加排课 -->
    <el-dialog title="排课" :visible.sync="course" width="47%">
      <CourseList></CourseList>
      <span slot="footer" class="dialog-footer">
        <el-button class="button-box" type="primary" @click="course = false">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入组件
import StudentList from "../../components/student/StudentList.vue";
import CourseList from "../../components/student/CourseList.vue";
export default {
  components: { StudentList, CourseList },
  data() {
    return {
      // 切换状态
      cut:1,
      // 排课
      course : false,
      // 添加班级
      dialogVisible: false,
      dataList: []
    };
  },
  mounted() {
    this.loaddata();
  },
  methods: {
    loaddata() {
      this.$http.get(
        "/courses/list",
        { page: 1 },
        success => {
          this.dataList = success.data.list;
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    }
  }
};
</script>

<style scoped>
.el-icon-delete {
  font-weight: bold;
  font-size: 16px;
}
/* 表格 */
.tab tr td span {
  background-image: url("../../assets/ico.png");
  display: inline-block;
  width: 25px;
  height: 25px;
  background-position: -2px -635px;
  position: relative;
  top: 5px;
}
table > tr:nth-child(1) > th:nth-child(1) {
  text-align: left;
}
table > tr:nth-child(1) > th:nth-child(2) {
  text-align: left;
}
table > tr:nth-child(2) > td:nth-child(1) {
  text-align: left;
}
table > tr:nth-child(2) > td:nth-child(2) {
  text-align: left;
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
  height: 40px;
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
  margin-left: 486px;
  margin-top: -45px;
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
  left: 879px;
  top: 16px;
  font-size: 20px;
}

/* 按钮 */
/* 三角 */
.btn {
  font-size: 15px;
}
.triangle {
  width: 0;
  height: 0;
  border-top: 29px solid transparent;
  border-left: 34px solid #dbdfe8;
  border-bottom: 30px solid transparent;
  position: absolute;
  left: 99px;
  top: -3px;
}
.place .btn {
  width: 100px;
  height: 56px;
  background-color: #dbdfe8;
  border: none;
  margin-right: 40px;
  outline: none;
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
  margin: 6px 7px;
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

/* 小图标 */
.el-icon-folder-add {
  font-weight: bold;
  font-size: 16px;
}
.el-icon-user {
  font-weight: bold;
  font-size: 16px;
}
</style>
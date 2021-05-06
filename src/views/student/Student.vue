<template>
  <div class="studentes">
    <div class="box-header">
      <!-- 输入框 -->
      <div class="place">
        <button class="btn">学员管理</button>
        <div class="triangle"></div>
        <el-button @click="save">
          <i class="el-icon-user"></i>&nbsp;添加学员
        </el-button>
        <el-button @click="course = true">
          <i class="el-icon-folder-add"></i>&nbsp;添加排课
        </el-button>
        <el-button @click="handleClickDel">
          <i class="el-icon-delete"></i>&nbsp;删除
        </el-button>
      </div>
      <!-- 搜索 -->
      <div class="select-box">
        <div class="text-box2">
          <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            value-key="name"
            :clearable="true"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </div>
        <i class="el-icon-search search" @click="loaddata(1)"></i>
      </div>
    </div>
    <table class="tab">
      <tr>
        <th width="2%">
          <input type="checkbox" :checked="changeStatus" @click="changeAll" />
        </th>
        <th width="20%" class="stu">学生姓名</th>
        <th width="14%">性别</th>
        <th width="14%">所选课程</th>
        <th width="14%">购买总课时</th>
        <th width="14%">已上课时</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in dataList" :key="index">
        <td>
          <input type="checkbox" v-model="checkList" :value="item" />
        </td>
        <td class="stu">
          <template v-if="item.photo">
            <img :src="imgUrl+item.photo" alt width="25px" height="25px" class="imges" />
          </template> 
          <template v-else>
            <span class="title-tab"></span>
          </template>
          {{item.name}}
        </td>
        <td>{{item.sex}}</td>
        <td>php</td>
        <td>10</td>
        <td>9</td>
        <td class="cli-btn">
          <a href="javascript:;" @click="BuyCourse(index)">购课</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="javascript:;"
            @click="edit(index)"
          >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- 删除弹出确认按钮  // 气泡中确定按钮绑定click事件 -->
          <el-popconfirm title="这是一条数据确定删除吗？" @confirm="del(index)">
            <a href="javascript:;" slot="reference">删除</a>
          </el-popconfirm>
          <!-- <a href="javascript:;" @click="del(index)">删除</a> -->
        </td>
      </tr>
    </table>
    <!-- 分页 -->

    <el-pagination
      class="paging"
      background
      layout="total, prev, pager, next, jumper"
      :total="counts"
      :hide-on-single-page="true"
      :page-size="pageNum"
      @current-change="changeNumber"
    ></el-pagination>
    <!-- 添加班级 -->
    <div v-if="dialogVisible" class="stud_class">
      <el-dialog :title="status" :visible.sync="dialogVisible" width="50%">
        <StudentList ref="studentEdit" @studentChild="studentChange"></StudentList>
      </el-dialog>
    </div>
    <!-- 添加排课 -->
    <el-dialog title="添加排课" :visible.sync="course" width="80%">
      <CourseList></CourseList>
    </el-dialog>
    <!-- 购课 -->
    <el-dialog title="购课" class="pty-pro" :visible.sync="buyclass" width="80%">
      <BuyClass ref="BuyClass" @BuyChild="BuyChild"></BuyClass>
    </el-dialog>
  </div>
</template>

<script>
// 引入组件
import StudentList from "../../components/student/StudentList.vue";
import CourseList from "../../components/student/CourseList.vue";
import BuyClass from "../../components/student/BuyClass.vue";
export default {
  components: { StudentList, CourseList, BuyClass },
  data() {
    return {
      status: "",
      // 切换状态
      cut: 1,
      // 购课
      buyclass: false,
      // 排课
      course: false,
      // 添加班级
      dialogVisible: false,
      // 搜索内容
      search: "",
      // 循环数据列表
      dataList: [],
      checkList: [], // 选中列表
      changeStatus: false, // 是否全选
      // 学员id
      studentid: "",
      // 总条数
      counts: 0,
      // 每页显示多少条数据
      pageNum: 8,
      imgUrl:this.$config.imgUrl
    };
  },
  mounted() {},
  created() {
    this.loaddata(1);
  },
  methods: {
    loaddata(page) {
      this.$http.get(
        "/students/list",
        { page, psize: this.pageNum, name: this.search },
        success => {
          this.dataList = success.data.list;
          this.counts = success.data.counts;
          this.checkPage();
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },
    //处理 全选
    checkPage() {
      //定义状态
      let isselect = true;
      // 转化 选中列表
      let checkList = JSON.stringify(this.checkList);
      //  循环   当前列表
      for (let item of this.dataList) {
        // 装换    查找
        if (checkList.indexOf(JSON.stringify(item)) == -1) {
          isselect = false;
          break;
        }
      }
      //状态
      this.changeStatus = isselect;
    },
    // 当前页数
    changeNumber(page) {
      this.loaddata(page);
    },
    // 全选
    changeAll() {
      if (this.changeStatus) {
        console.log(this.changeStatus)
        this.checkList = [];
        this.changeStatus = false;
      } else {
        this.checkList = this.dataList;
        this.changeStatus = true;
      }
    },
    // 子传父
    studentChange() {
      this.loaddata();
      this.dialogVisible = false;
    },
    // 修改
    edit(index) {
      this.status = "修改成员";
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.studentEdit.form = JSON.parse(
          JSON.stringify(this.dataList[index])
        );
      }, 50);
    },
    // 添加课程标题
    save() {
      this.dialogVisible = true;
      this.status = "添加课程";
    },
    // 删除
    del(index) {
      this.$http.get(
        "/students/delete",
        { id: this.dataList[index].id },
        success => {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          // 初始化数据
          this.loaddata();
        },
        failure => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      );
    },
    // 批量删除
    handleClickDel() {
      console.log(this.checkList);
      for (var i in this.checkList) {
        console.log(i);
        this.$http.get(
          "/students/delete",
          { id: this.checkList[i].id },
          success => {
            this.$message({
              message: "恭喜你，删除成功",
              type: "success"
            });
            // 初始化数据
            this.loaddata();
          },
          failure => {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        );
      }
    },
    // 子传父
    BuyChild() {
      this.buyclass = false;
      this.loaddata(1);
    },
    // 购买课程
    BuyCourse(index) {
      console.log(index);
      this.buyclass = true;
      setTimeout(() => {
        this.$refs.BuyClass.BuyClass.studentid = this.dataList[index].id;
      }, 50);
    },
    // 搜索
    querySearchAsync(queryString, cb) {
      this.$http.get(
        "/students/list",
        { psize: 10000, name: queryString },
        success => {
          cb(success.data.list);
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },
    // 点击选中建议项时触发
    handleSelect(item) {
      // 获取班级id
      this.studentid = item.id;
      this.loaddata(1);
    }
  }
};
</script>
<style lang="less">
.studentes {
  .text-box2 {
    .el-input__inner {
      margin-top: 30px;
      height: 33px;
      margin-left: -2px;
      border: none;
      width: 400px;
    }
    .el-input .el-input__clear {
      margin-top: 17px;
    }
  }
  .stud_class {
    margin-top: 0 !important;
    position: absolute;
    margin: auto;
    left: 10%;
    top: 35px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
<style lang="less">
.studentes {
  .imges{
    border-radius: 50%;
  }
  .el-dialog {
    height: auto;
    left: 0%;
  }
  // 分页
  .paging {
    text-align: center;
    margin-top: 10px;
  }
  /* 滑过 */
  table tr:hover {
    background-color: #e8ebf0;
  }
  .cli-btn a {
    display: none;
    text-decoration: none;
  }
  table tr:hover .cli-btn a {
    display: block;
    float: left;
    padding-left: 10px;
    margin-left: 40px;
  }
  .box-header {
    .el-icon-delete {
      font-weight: bold;
      font-size: 16px;
    }
  }

  /* 表格 */
  .title-tab {
    background-image: url("../../assets/ico.png");
    display: inline-block;
    width: 25px;
    height: 25px;
    background-position: -2px -635px;
    position: relative;
    top: 5px;
  }

  table > tr > th:nth-child(2) {
    text-align: left;
  }
  table > tr:nth-child(2) > td:nth-child(2) {
    text-align: left;
  }
  table tr td:nth-of-type(2) {
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
    margin-left: 526px;
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
    .box2 {
      margin-top: 29px;
      margin-left: 30px;
      height: 33px;
    }
  }

  .el-input__inner {
    // margin-top: 25px;
    // border: none;
    background-color: rgba(0, 0, 0, 0);
  }
  /* 搜索 */
  .el-icon-search {
    position: absolute;
    left: 917px;
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
  .dialog-footer {
    .el-button {
      padding: 6px 15px;
      margin: 6px 7px;
      background-color: #fff;
      color: #9ea4b0;
      font-size: 14px;
    }
  }
  .el-button + .el-button {
    margin-left: 20px;
  }

  .box-header .box2 {
    border: none;
    background-color: #fff;
    color: #9ea4b0;
    width: 391px;
    height: 31px;
    margin-top: 30px;
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
}
</style>

<template>
  <div class="classroomes">
    <!-- 头部 -->
    <div class="box-header">
      <!-- 输入框 -->
      <div class="place">
        <button class="btn">教室管理</button>
        <div class="triangle"></div>
        <el-button @click="dialogVisible = true">
          <i class="el-icon-folder-add"></i>&nbsp;添加教室
        </el-button>
      </div>
      <!-- 搜索 -->
      <div class="text-box">
        <el-autocomplete
          style="border:none"
          class="el-input_inner student"
          v-model="classRoom.search"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入教室名称"
          @select="handleSelect"
          value-key="name"
          :clearable="true"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </div>
      <i class="el-icon-search search" @click="loaddata(1)"></i>
    </div>
    <!-- 表格 -->
    <table class="tab">
      <tr>
        <th class="textleft" width="30%" style="text-align:left">教室名称</th>
        <th width="30%">编辑</th>
        <th width="0%"></th>
        <th width="0%"></th>
        <th width="49%"></th>
      </tr>
      <tr v-for="(item,index) in this.classRoom.classroom" :key="index">
        <td style="text-align:left;clear:both; line-height:55px">
          <span>
            <i class="el-icon-s-platform"></i>
          </span>
          {{item.name}}
          <span class="table-s"></span>
        </td>
        <td class="cli-btn">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="javascript:;"
            @click="edit(index)"
          >修改</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-popconfirm title="这是一条数据确定删除吗？" @confirm="del(index)">
            <a href="javascript:;" slot="reference" class="delete">删除</a>
          </el-popconfirm>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <!-- 分页 -->
    <el-pagination
      class="paging"
      background
      layout="total, prev, pager, next, jumper"
      :total="counts"
      :hide-on-single-page="true"
      @current-change="chagneNumber"
      :page-size="pageNumber"
    ></el-pagination>
    <!-- 添加教室 -->
    <el-dialog title="添加教室" :visible.sync="dialogVisible" width="47%">
      <ClassroomList ref="classroomForm" @classroomChild="classroomChild"></ClassroomList>
    </el-dialog>
  </div>
</template>


<script>
// 引入组件
import ClassroomList from "../../components/classroom/ClassroomList";
export default {
  components: { ClassroomList },
  data() {
    return {
      // 总条数
      counts: 0,
      // 每页显示的条数
      pageNumber: 6,
      dialogVisible: false,
      classRoom: {
        // 教室列表
        classroom: [],
        // 搜索的内容
        search: "",
        // 课程id
        courseid: ""
      }
    };
  },
  mounted() {},
  created() {
    // 初始化教室
    this.loaddata(1);
  },
  methods: {
    // 获取教室数据
    loaddata(page) {
      this.$http.get(
        "/classrooms/list",
        {
          page: page,
          psize: this.pageNumber,
          name: this.classRoom.search,
          courseid: this.classRoom.courseid
        },
        success => {
          this.classRoom.classroom = success.data.list;
          // 总数据
          this.counts = success.data.counts;
        },
        failure => {
          console.log("获取教室数据失败");
        }
      );
    },
    // 当前页
    chagneNumber(page) {
      this.loaddata(page);
    },
    // 子传父
    classroomChild() {
      this.dialogVisible = false;
      // 初始化数据
      this.loaddata();
    },
    // 修改
    edit(index) {
      this.dialogVisible = true;
      // this.status = "修改课程";
      setTimeout(() => {
        this.$refs.classroomForm.form = JSON.parse(
          JSON.stringify(this.classRoom.classroom[index])
        );
      }, 50);
    },
    // 删除
    del(index) {
      this.$http.get(
        "/classrooms/delete",
        { id: this.classRoom.classroom[index].id },
        success => {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          // 初始化数据
          this.loaddata(1);
        },
        failrue => {
          this.$message({
            message: "恭喜你，删除失败",
            type: "error"
          });
        }
      );
    },
    // 搜索
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      this.$http.get(
        "/classrooms/list",
        { psize: this.pageNumber, name: queryString },
        success => {
          cb(success.data.list);
        },
        failure => {
          console.log("获取教室数据失败");
        }
      );
    },
    handleSelect(item) {
      console.log(item);
      this.classRoom.courseid = item.id;
      this.loaddata();
    }
  }
};
</script>
<style lang="less" scoped>
.el-dialog {
  margin-top: 0vh !important;
  position: absolute;
  top: 35px;
  /* bottom: 20px; */
  left: 25%;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="less">
.classroomes {
  div.text-box > div > div.el-input.el-input--suffix > input {
    border: none !important;
  }
  .student .el-input__inner {
    margin-top: px;
  }
}
</style>
</style>
<style lang="less">
.classroomes {
  // 操作显示和隐藏
  // 教室小图标
  .el-icon-s-platform {
    font-size: 20px;
    color: #409eff;
    padding-left: 3px;
    padding-right: 5px;
    position: relative;
    top: 3px;
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
    margin-left: 100px;
  }
  .box-header {
    .el-icon-delete {
      font-weight: bold;
      font-size: 16px;
    }
  }

  // 表单
  /* 表格 */
  // .table-s {
  //   float: left;
  //   width: 48px;
  //   height: 48px;
  //   background-image: url("../../assets/ico.png");
  // }
  span:nth-of-type(1) {
    // background-position: -82px -234px;
    // margin-left: 10px;
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

  // 搜索
  .text-box {
    width: 300px;
    height: 40px;
    background-color: #fff;
    position: absolute;
    left: 273px;
    top: 8px;
    border: 1px solid #dee3e9;
  }
  .text-box .student {
    width: 267px;
    height: 20px;
  }
  .search {
    position: absolute;
    left: 544px;
    top: 20px;
    font-size: 19px;
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
    margin-left: -11px;
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

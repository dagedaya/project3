<template>
  <div class="projectes">
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
        <th width="10%">收费模式</th>
        <th width="10%">单价</th>
        <th width="10%">上课模式</th>
        <th width="30%">编辑</th>
      </tr>
      <tr v-for="(item,index) in dataList" :key="index">
        <td style="text-align:left;clear:both; line-height:55px">
          <span class="table-s"></span>
          {{item.name}}
        </td>
        <td>{{item.pricetype}}</td>
        <td>{{item.price}}</td>
        <td>{{item.mode}}</td>
        <td class="cli-btn">
          <a href="javascript:;" @click="course=true">排课</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            href="javascript:;"
            @click="edit(index)"
          >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="javascript:;" @click="del(index)">删除</a>
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
      @current-change="chagneNumber"
      :page-size="pageNumber"
    ></el-pagination>
    <!-- 添加班级 -->
    <el-dialog :title="status" :visible.sync="dialogVisible" width="47%">
      <ProjectList ref="classForm" @PorListChild="proAdd"></ProjectList>
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
      // 总页数
      counts: 0,
      // 每页显示的条数
      pageNumber: 6,
      dialogVisible: false,
      dataList: [],
      // 切换状态
      status: "添加课程"
    };
  },
  mounted() {
    this.loaddata(1);
  },
  methods: {
    // 请求课程列表数据
    loaddata(page) {
      this.$http.get(
        "/courses/list",
        { page, psize: this.pageNumber },
        success => {
          this.dataList = success.data.list;
          // 总数据
          this.counts = success.data.counts;
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },
    // 当前页
    chagneNumber(page) {
      this.loaddata(page);
    },
    // 子传父
    proAdd() {
      this.dialogVisible = false;
      // 初始化数据
      this.loaddata();
    },
    // 删除
    del(index) {
      this.$http.get(
        "/courses/delete",
        { id: this.dataList[index].id },
        success => {
          this.$message({
            message: "恭喜你，删除成功",
            type: "success"
          });
          // 初始化数据
          this.loaddata();
        },
        failrue => {
          this.$message({
            message: "恭喜你，删除失败",
            type: "error"
          });
        }
      );
    },
    // 修改
    edit(index) {
      this.dialogVisible = true;
      this.status = "修改课程";
      setTimeout(() => {
        this.$refs.classForm.form = JSON.parse(
          JSON.stringify(this.dataList[index])
        );
      }, 50);
    }
  }
};
</script>

<style lang="less" scoped>
.projectes {
  // 分页
  .paging {
    text-align: center;
    margin-top: 10px;
  }
  /* 滑过 */
  table tr:hover {
    background-color: #e8ebf0;
  }
  table tr td a {
    text-decoration: none;
  }
  table tr:hover .cli-btn a {
    display: block;
    float: left;
    margin-left: 50px;
  }
  .cli-btn a {
    display: none;
  }
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
    margin-left: 302px;
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
    left: 686px;
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
    margin: 10px 34px;
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
}
</style>
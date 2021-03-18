<template>
  <div class="classes">
    <div class="box-header">
      <!-- 输入框 -->
      <div class="place">
        <el-button>
          <i class="el-icon-delete"></i>&nbsp;删除
        </el-button>
        <el-button @click="save()">
          <i class="el-icon-folder-add"></i>&nbsp;添加班级
        </el-button>
      </div>
      <!-- 下拉 -->
      <div class="select-box">
        <el-form ref="form" :model="form" label-width="0px">
          <el-form-item>
            <el-select v-model="ClassesFrom.searchListThis" placeholder="请选择课程" :clearable="true" @change="selectChange">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item,index) in ClassesFrom.courseData"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="text-box">
          <el-autocomplete
            v-model="ClassesFrom.search"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入课程"
            @select="handleSelect"
            :clearable="true"
            :trigger-on-focus="false"
            value-key="name"
          ></el-autocomplete>
        </div>
        <i @click="search()" class="el-icon-search search"></i>
      </div>
    </div>
    <table class="tab">
      <tr>
        <th class="textleft" width="20%" style="text-align:left">班级名称</th>
        <th width="10%">课程</th>
        <th width="10%">老師</th>
        <th width="10%">人数</th>
        <th width="10%">计划课时</th>
        <th width="10%">已排课时</th>
        <th width="10%">已上课时</th>
        <th width="18%">操作</th>
      </tr>
      <tr v-for="(item,index) in dataList" :key="index">
        <td style="text-align:left;clear:both; line-height:55px">
          <span class="table-s"></span>
          {{item.name}}
        </td>
        <td>{{item.coursename}}</td>
        <td>{{item.teacherslist}}</td>
        <td>{{item.students}}</td>
        <td>{{item.schcourses}}</td>
        <td>{{item.endcourses}}</td>
        <td>{{item.coursecounts}}</td>
        <td class="cli-btn">
          <a href="javascript:;" @click="couseInfo(item.id,item.courseid)">排课</a>
          <a href="javascript:;" @click="edit(index)">修改</a>
          <a href="javascript:;" @click="chart=true">图表</a>
          <a href="javascript:;" @click="del(index)">删除</a>
        </td>
      </tr>
    </table>
    <!-- 分页 -->
    <!-- <p style="color:red;margin-left:20px">总条数：{{counts}}条</p> -->
    <div>
      <el-pagination
        class="paging"
        background
        layout="total, prev, pager, next, jumper"
        :total="counts"
        :hide-on-single-page="true"
        @current-change="changeNumber"
        :page-size="pageNum"
      ></el-pagination>
    </div>
    <!-- 添加班级/修改班级 -->
    <div v-if="dialogVisible">
      <el-dialog :title="status" :visible.sync="dialogVisible" width="47%">
        <ClassesList ref="classForm" @ClassListChild="AddClass2"></ClassesList>
      </el-dialog>
    </div>
    <!-- 排课 -->
    <el-dialog title="排课" :visible.sync="course" width="80%">
      <CourseList :id="classid" :courseid="courseid"></CourseList>
    </el-dialog>
    <!-- 图表 -->
    <el-dialog title="课表" :visible.sync="chart" width="80%">
      <ChartList></ChartList>
    </el-dialog>
  </div>
</template>

<script>
import ClassesList from "../../components/classes/ClassesList.vue";
import CourseList from "../../components/classes/CourseList.vue";
import ChartList from "../../components/classes/ChartList.vue";

export default {
  components: { ClassesList, CourseList, ChartList },
  data() {
    return {
      form: {
        region: ""
      },
      // 图表
      chart: false,
      // 排课
      course: false,
      // 班级id
      classid: "",
      // 课程id
      courseid: "",
      // 添加班级
      dialogVisible: false,
      // 切换状态
      status: "",
      // 总条数
      counts: 0,
      // 每页显示多少条数据
      pageNum: 10000,
      // 主体列表
      dataList: [],
      // 搜索框
      keydata: "",
      ClassesFrom: {
        // 课程数据
        courseData: [],
        // 课程id
        searchListThis: "",
        // 内容
        search: ""
      }
    };
  },
  created() {
    // 主体（班级）
    this.loaddata(1);
    // 课程
    this.courseInfo();
  },
  mounted() {},
  methods: {
    // 搜索
    search() {
      this.loaddata();
    },
    // 当前页数
    changeNumber(page) {
      this.loaddata(page);
    },
    // 请求班级数据
    loaddata(page) {
      this.$http.get(
        "/classes/list",
        {
          page,
          psize: this.pageNum,
          name: this.keydata,
          courseid: this.ClassesFrom.courseid
        },
        success => {
          this.dataList = success.data.list;
          this.counts = success.data.counts;
        },
        failrue => {
          console.log("获取数据失败");
        }
      );
    },
    // 重新请求班级列表（子传父）
    AddClass2() {
      this.loaddata();
      this.dialogVisible = false;
    },
    // 子传父的值（班级id 和 课程id）
    couseInfo(id, courseid) {
      this.course = true;
      this.classid = id;
      this.courseid = courseid;
      console.log("fu", this.classid);
      console.log("fu", this.courseid);
    },
    // 删除课程接口
    del(index) {
      this.$http.get(
        "/classes/delete",
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
            message: "删除失败",
            type: "error"
          });
        }
      );
    },
    // 修改课程
    edit(index) {
      this.dialogVisible = true;
      this.status = "修改课程";
      setTimeout(() => {
        this.$refs.classForm.form = JSON.parse(
          JSON.stringify(this.dataList[index])
        );
      }, 50);
    },
    // 添加课程标题
    save() {
      this.dialogVisible = true;
      this.status = "添加课程";
    },
    // 请求课程接口
    courseInfo() {
      this.$http.get(
        "/courses/list",
        { page: 1 },
        success => {
          this.ClassesFrom.courseData = success.data.list;
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },
    // 搜索
    querySearchAsync(queryString, cb) {
      console.log(queryString);
      this.$http.get(
        "/classes/list",
        {
          psize:10000,
          name:queryString
        },
        success => {
          cb(success.data.list)
        },
        failrue => {
          console.log("获取数据失败");
        }
      );
    },
    // 点击选中建议项时触发
    handleSelect(item) {
      this.ClassesFrom.courseid =item.courseid;
      this.loaddata(1);
    },
    // 自动改变（change)
    selectChange(){
      this.ClassesFrom.courseid = this.ClassesFrom.searchListThis
      this.loaddata(1)
    }
  }
};
</script>
<style lang="less">
.classes {
  .text-box {
    margin-top: -28px;
    margin-left: 5px;
    width: 800px;
    .el-input__inner {
      width: 280px !important;
    }
    .el-input__icon {
      position: relative;
      left: 0px;
      top: -25px;
    }
  }
  .box-header {
    .select-box {
      .el-input__inner {
        height: 33px;
        position: relative;
        top: -5px;
        border: none;
        background-color: transparent;
        width: 155px;
      }
      .el-select {
        .el-input__icon {
          position: relative;
          left: -41px;
          top: -23px;
        }
      }
    }
  }
}
</style>
<style lang="less" socped>
/* 表格 */
.classes {
  // 分页
  .paging {
    text-align: center;
    margin-top: 10px;
  }
  .paging .el-pagination__total {
    margin-top: 0px;
  }
  .table-s {
    float: left;
    width: 48px;
    height: 50px;
    background-image: url("../../assets/ico.png");
  }
  span:nth-of-type(1) {
    background-position: -83px -339px;
    margin-top: 18px;
    margin-left: 10px;
  }
  /* 列表 */
  table tr td a {
    text-decoration: none;
  }
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
    width: 400px;
    height: 31px;
    border: 1px solid #dee3e9;
    margin-left: 260px;
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
  .text-box {
    width: 260px;
    position: relative;
    left: 90px;
    top: -30px;
  }

  div.box > div:nth-child(4) > div.box-2 > div > input {
    border: 1px solid #f5f5f5;
    margin-top: 3px;
    margin-left: -2px;
  }

  .text-box .el-input_inner {
    margin: 0;
    padding: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    margin-left: 22px;
    position: relative;
    top: -33px;
    width: 254px;
    height: 30px;
    outline: none;
  }
  .el-icon-search {
    position: absolute;
    left: 776px;
    top: 74px;
    font-size: 20px;
  }

  // 滑过
  table tr:hover {
    background-color: #e8ebf0;
  }
  table tr:hover .cli-btn a {
    display: block;
    float: left;
    margin-left: 10px;
    padding-left: 15px;
  }
  .cli-btn a {
    display: none;
  }

  /* 按钮 */
  div.el-dialog__footer > span > button {
    background-color: #4281fc;
    color: #fff;
  }
  .box-header {
    width: 99.9%;
    height: 55px;
    background-color: #f5f6fa;
    border-right: 1px solid #dee3e9;
    border-bottom: 1px solid #dee3e9;
  }

  .box-header .el-button {
    padding: 7px 12px;
    margin: 10px 15px;
    background-color: #fff;
    color: #9ea4b0;
    font-size: 14px;
  }
  .el-icon-delete {
    font-weight: bold;
    font-size: 16px;
  }
  .el-icon-folder-add {
    font-weight: bold;
    font-size: 16px;
  }

  .place {
    position: relative;
  }
  .Deladd {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .el-input__icon {
    position: absolute;
    left: -9px;
    top: -16px;
  }
}
</style>

<template>
  <div class="studentes">
    <div class="first-left">
      <!-- 搜索 -->
      <div class="search">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">学习</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">课程</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="text-box">
          <input type="text" class="el-input_inner" />
        </div>
        <i class="el-icon-search search"></i>
      </div>
      <!-- 表格 -->
      <div class="stu-tab">
        <el-table :data="tableData" style="width: 100%" class="stu-table">
          <el-table-column prop="date" width="40" v-model="changeStudent" :value="tableData">
            <el-checkbox></el-checkbox>
          </el-table-column>
          <el-table-column width="40">
            <span>
              <img src="../../assets/ico1.png" alt />
              <!-- {{data.$index}} -->
              <!-- {{data.row.name}} -->
            </span>
          </el-table-column>
          <el-table-column prop="name"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 已选表格 -->
    <div class="second-right">
      <span class="stu">已选学员(0)</span><span class="el-icon-delete del">清空</span>
            <div class="stu-tab">
        <el-table :data="select" style="width: 50%" class="stu-table">
          <el-table-column prop="date" width="40">
            <span>
              <img src="../../assets/ico1.png" alt width="30px" height="30px"/>
              <!-- {{data.$index}} -->
              <!-- {{data.row.name}} -->
            </span>
          </el-table-column>
          <el-table-column width="60" prop="name">
          </el-table-column>
          <el-table-column><i class="el-icon-delete"></i></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentList",
  data() {
    return {
      // 学员列表
      tableData: [],
      // 选中的学员列表
      changeStudent:[],
      select:[
        {
          data:1,
          name:"李红"
        }
      ]
    };
  },
  created() {
    this.initstudent();
  },
  mounted() {},
  methods: {
    // 学生列表数据
    initstudent() {
      this.$http.get(
        "/students/list",
        { psize: 100 },
        success => {
          console.log(success.data.list);
          this.tableData = success.data.list;
          console.log(this.tableData);
        },
        failure => {
          console.log("获取数据失败");
        }
      );
    },
    // 选中的学员
    selectStudent(){
      console.log(this.changeStudent)
    }
  }
};
</script>

<style lang="less">
.studentes {
  .first-left {
    float: left;
    width: 50%;
    .el-table::before {
      height: 0px;
    }
    // 滚轮
    .stu-table {
      height: 500px;
      overflow: auto;
    }
    .stu-table::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      border: 1px solid #dee3e9;
      border-radius: 5px;
    }
    .stu-table::-webkit-scrollbar-thumb {
      background-color: #a1a3a9;
      border-radius: 5px;
    }
    .el-checkbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 12px;
    left: 6px;
    position: absolute;
    top: 1px;
    width: 5px;
    transform-origin: center;
    }
    img {
      position: absolute;
      top: 11px;
      left: 5px;
    }
    .el-checkbox__inner {
      width: 20px;
      height: 20px;
    }
    .search {
      width: 400px;
      height: 32px;
      border: 1px solid #dee3e9;
      margin-left: 20px;
      .el-dropdown-link {
        line-height: 32px;
        margin-left: 4px;
        cursor: pointer;
      }
      .el-icon-search {
        width: 20px;
        height: 32px;
        position: absolute;
        font-size: 20px;
        left: 395px;
        top: 90px;
        border: none;
      }
      .text-box .el-input_inner {
        width: 267px;
        height: 27px;
        position: absolute;
        left: 132px;
        top: 85px;
        border: none;
        outline: none;
      }
    }
  }
  .second-right{
    height: 520px;
    .stu{
      margin-left:40px;
    }
    .del{
      margin-left:220px;
    }
    i{
      font-size:20px;
      margin-left:230px;
      display: none;
    }
    .el-table:hover i{
      display: block;
    }
  }
}
</style>
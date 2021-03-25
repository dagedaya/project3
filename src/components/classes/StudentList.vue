<template>
  <div class="studentes">
    <div class="first-left">
      <!-- 搜索 -->
      <div class="search">
        <el-select
          v-model="classFrom.searchListThis"
          placeholder="请选择"
          :clearable="true"
          @change="studentChange"
        >
          <el-option
            v-for="(item,index) in classFrom.searchList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="text-box">
          <el-autocomplete
            class="el-input_inner student"
            v-model="classFrom.search"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入学员名称"
            @select="handleSelect"
            value-key="name"
            :clearable="true"
            :trigger-on-focus="false"
          ></el-autocomplete>
        </div>
        <i class="el-icon-search search" @click="searchChange()"></i>
      </div>
      <!-- 表格 -->
      <div class="stu-tab">
        <el-table :data="tableData" style="width: 100%" class="stu-table">
          <el-table-column prop="date" width="40">
            <template slot-scope="item">
              <div>
                <el-checkbox-group v-model="changeStudent" @change="StudentAll">
                  <el-checkbox :label="item.row"></el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
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
      <span class="stu">已选学员({{changeStudent.length}})</span>
      <span class="el-icon-delete del" @click="changeStudent=[]">清空</span>
      <div class="stu-tab">
        <!-- {{changeStudent}} -->
        <el-table :data="changeStudent" style="width: 50%" class="stu-table2">
          <el-table-column prop="date" width="40">
            <span>
              <img src="../../assets/ico1.png" alt width="30px" height="30px" />
            </span>
          </el-table-column>
          <el-table-column width="100" prop="name"></el-table-column>
          <el-table-column>
            <template slot-scope="index">
              <i class="el-icon-delete" @click="changeStudent.splice(index.$index,1)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div>
      <el-button type="primary" class="submit save" @click="studentSubmit">确定</el-button>
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
      changeStudent: [],
      // 班级id
      classid: "",
      // 搜索
      classFrom: {
        searchList: [],
        // 班级id
        searchListThis: "",
        // 学生id
        studentid: "",
        // 搜索内容
        search: ""
      }
    };
  },
  props: {
    stuList: {
      type: Array
    }
    // classid: {
    //   type: Number
    // },
    // courseid:{
    //   type: Number
    // }
  },
  created() {
    // 初始化学生列表
    this.initstudent();
    // 初始化班级信息
    this.classAll();
  },
  mounted() {
    let arr = [];
    for (var i in this.stuList) {
      arr.push(this.stuList[i].id);
    }
    this.changeStudent = arr;
  },
  methods: {
    // 获取班级信息
    classAll() {
      this.$http.get(
        "/classes/list",
        { page: 1 },
        success => {
          this.classFrom.searchList = success.data.list;
        },
        failure => {
          console.log("班级信息获取失败");
        }
      );
    },
    // 学生列表数据
    initstudent() {
      this.$http.get(
        "/students/list",
        {
          psize: 100,
          classid: this.classFrom.searchListThis,
          studentid: this.classFrom.studentid,
          name: this.classFrom.search
        },
        success => {
          this.tableData = success.data.list;
        },
        failure => {
          console.log("获取数据失败");
        }
      );
    },
    // 选中的学员
    StudentAll(val) {
      this.changeStudent = val;
    },
    // change
    studentChange() {
      this.classid = this.classFrom.searchListThis;
      this.initstudent();
    },
    // 提交按钮
    studentSubmit() {
      console.log(this.changeStudent);
      this.$emit("changeStudent", this.changeStudent);
    },
    // 搜索
    querySearchAsync(queryString, cb) {
      // 输入的内容
      console.log(queryString);
      this.$http.get(
        "/students/list",
        { psize: 10000, name: queryString },
        success => {
          cb(success.data.list);
        },
        failure => {
          console.log("获取数据失败");
        }
      );
    },
    // 点击选中建议项时触发
    handleSelect(item) {
      this.classFrom.studentid = item.id;
      this.initstudent();
    },
    // 重新请求数据
    searchChange() {
      this.initstudent();
    }
  }
};
</script>
<style scoped>
.el-select .el-input .el-select__caret {
  color: #c0c4cc;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotateZ(180deg);
  cursor: pointer;
  /* margin-top: -30px; */
  position: relative;
  /* top: -19px; */
}
.el-dialog {
  margin-top: 0 !important;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  box-sizing: border-box;
  top: 30px;
  bottom: 30px;
  /* overflow-y: scroll; */
  height: 640px;
}
</style>
<style lang="less">
.student {
  .el-input__inner {
    border: none;
    height: 99%;
    margin-top: 8px;
  }
}

.studentes {
  .save {
    float: right;
    margin-top: 11px;
  }
  .first-left {
    .el-table::before {
      height: none;
    }
    float: left;
    width: 50%;
    height: 480px;
    // 滚轮
    .stu-table {
      height: 440px;
      overflow: auto;
      margin-top: 15px;
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
      .el-select {
        width: 90px;
        .el-input {
          height: 40px;
          .el-input__prefix,
          .el-input__suffix {
            top: -3px;
          }
          > input {
            height: 31px !important;
          }
        }
        .el-input__inner {
          border: none;
        }
      }
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
        left: 387px;
        top: 90px;
        border: none;
      }
      .text-box .student {
        width: 267px;
        height: 20px;
        position: absolute;
        left: 126px;
        top: 85px;
        border: none;
        outline: none;
      }
    }
  }

  .second-right {
    // 滚轮
    .stu-table2 {
      height: 440px;
      overflow: auto;
      margin-top: 30px;
    }
    .stu-table2::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      border: 1px solid #dee3e9;
      border-radius: 5px;
    }
    .stu-table2::-webkit-scrollbar-thumb {
      background-color: #a1a3a9;
      border-radius: 5px;
    }
    height: 480px;
    .stu {
      margin-left: 40px;
    }
    .del {
      margin-left: 220px;
      cursor: pointer;
    }
    i {
      font-size: 20px;
      margin-left: 230px;
      display: none;
    }
    .el-table .el-table__row:hover i {
      display: block;
    }
  }
}
</style>
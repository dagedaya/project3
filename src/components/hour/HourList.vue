<template>
  <div class="HourListes">
    <div v-if="first_edit">
      <i class="el-icon-edit" @click="first_edit=!first_edit"></i>
    </div>
    <div v-else>
      <a href="javascript:;" @click="first_edit=!first_edit">取消</a>
    </div>
    <div class="first">
      <b>基本信息</b>
      <td v-show="first_edit">
        <p>课程名称：{{courseInfo.classname}}</p>
        <p>主讲老师：{{courseInfo.teachername}}</p>
        <p>助教老师：{{courseInfo.assistantname}}</p>
        <p>教室：{{courseInfo.classrooms}}</p>
      </td>
      <td v-show="!first_edit">
        <el-form ref="form" :v-model="editList" label-width="80px">
          <p>
            <el-form-item label="主讲老师">
              <el-select v-model="editList.teacherid" placeholder="请选择主讲老师">
                <el-option
                  :label="item.name"
                  v-for="(item,index) in mainListes"
                  :key="index"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="助教老师">
              <el-select v-model="editList.assistant" placeholder="请选择助教老师">
                <el-option
                  :label="item.name"
                  v-for="(item,index) in teachinges"
                  :key="index"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="教室">
              <el-select v-model="editList.classrooms" placeholder="请选择教室">
                <el-option
                  :label="item.name"
                  v-for="(item,index) in classroomList"
                  :key="index"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="扣课">
              <el-select v-model="editList.pricecounts" placeholder="请选择扣课">
                <el-option value="shagn"></el-option>
              </el-select>
            </el-form-item>
          </p>
        </el-form>
      </td>
    </div>
    <div v-if="second_edit">
      <i class="el-icon-edit" @click="second_edit=!second_edit"></i>
    </div>
    <div v-else>
      <a href="javascript:;" @click="second_edit=!second_edit">取消</a>
    </div>
    <div class="second">
      <b>
        <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;
        上课时间
      </b>
      <p>{{courseInfo.coursedate}}({{courseInfo.week}})</p>
      <td v-show="second_edit">
        <p class="times">{{courseInfo.starttime}} - {{courseInfo.endtime}}</p>
      </td>
      <td v-show="!second_edit">
        <el-time-select
          class="start"
          placeholder="起始时间"
          v-model="editList.starttime"
          value="shang"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
        ></el-time-select>
        <el-time-select
          class="end"
          placeholder="结束时间"
          v-model="editList.endtime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }"
        ></el-time-select>
      </td>
    </div>
    <div class="third">
      <!-- 尾部部分 -->
      <div class="floor">
        <div class="box">
          <h3>选择学员({{studentList.length}})</h3>
          <span class="createUser" @click="dialogVisible=true">
            <span class="el-icon-user"></span>添加学员
          </span>
          <table>
            <tr>
              <td v-for="(item,index) in studentList" :key="index">
                <span class="elf userCap"></span>
                {{item.name}}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div>
      <div class="cancel" @click="cancel()">取消课程</div>
      <div class="edites" @click="submitForm()">修改课程</div>
    </div>
    <div style="clear:both"></div>
    <!-- 选择成员 -->
    <el-dialog
      title="选择学员"
      style="margin-top:0vh;margin-top:-70px;"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="60%"
    >
      <StudentList  @changeStudent="changeStudent"></StudentList>
    </el-dialog>
  </div>
</template>

<script>
import StudentList from "../classes/StudentList.vue";
export default {
  components: {
    StudentList
  },
  data() {
    return {
      // 选择学员
      dialogVisible: false,
      // 主讲老师
      mainListes: [],
      // 助教老师
      teachinges: [],
      // 教室
      classroomList: [],
      // 学生列表
      studentList: [],
      // 修改学生
      studentes: [],
      // 新增学员插班排课表单
      studentJoinForm: {
        classid: null,
        studentes: []
      },
      // 修改课程的信息
      editList: {},
      startTime: "",
      endTime: "",
      // 第一块修改
      first_edit: true,
      // 第二块修改
      second_edit: true,
      // 第三块修改
      thrid_edit: true,
      // 单个课程
      courseInfo: [],
      // //  模板定义
      // form: {}
    };
  },
  // 接收课表id
  props: {
    tableid: {
      type: Number
    }
  },
  created() {
    // 初始化单个课程
    this.single();
    // console.log(this.studentList);
    // 初始化主讲老师
    this.mainList();
    // 初始化助教老师
    this.teaching();
    // 初始化教室
    this.classrooms();
  },
  mounted() {},
  methods: {
    //单个课程
    single() {
      // console.log(this.tableid);
      this.$http.get(
        "/coursetables/get",
        { id: this.tableid },
        success => {
          this.courseInfo = success.data.model;
          this.studentList = success.data.students;
          // console.log(this.studentList);
          var students = [];
          for (var i in this.students) {
            // console.log("i啊", i);
            students.push({ id: this.students[i].id });
          }
          this.studentJoinForm.classid = success.data.model.classid;
          this.editList = {
            // 单个课程id
            id: this.courseInfo.id,
            classrooms: this.courseInfo.classname,
            // 单节课扣学员课时
            pricecounts: this.courseInfo.pricecounts,
            // 教师id
            teacherid: this.courseInfo.teacherid,
            // 助教id
            assistant: this.courseInfo.assistant,
            // 课程日期
            // coursedate: null,
            coursedate: "2021-03-21",
            // 开始日期
            starttime: this.courseInfo.starttime,
            // 结束日期
            endtime: this.courseInfo.endtime,
            // 学生列表
            studentes: this.studentList
          };
          // this.studentes = success.data.students;
          // console.log(this.editList);
        },
        fialure => {
          console.log("获取失败了");
        }
      );
    },
    // 修改单个课程
    submitForm() {
      // console.log("修改", this.editList);
      this.$http.post(
        "/coursetables/edit",
        this.editList,
        success => {
          // console.log(success);
          this.first_edit = !this.first_edit;
          this.second_edit = !this.second_edit;
          this.single();
        },
        fialure => {
          console.log("修改失败");
        }
      );
    },
    // 删除单个课程（取消排课）
    cancel() {
      this.$http.get(
        "/coursetables/delete",
        { id: this.tableid },
        success => {
          // console.log(success);
          this.$message.success("取消排课成功");
          this.$emit("hourChild");
        },
        failure => {
          console.log("取消排课失败");
        }
      );
    },
    //主讲老师
    mainList() {
      this.$http.get(
        "/teachers/list",
        { cat: 1, page: 1, psize: 10000 },
        success => {
          // console.log(success);
          this.mainListes = success.data.list;
        },
        failure => {
          console.log("主讲老师获取失败");
        }
      );
    },
    // 助教老师
    teaching() {
      this.$http.get(
        "/teachers/list",
        { cat: 2, page: 1, psize: 10000 },
        success => {
          // console.log(success);
          this.teachinges = success.data.list;
        },
        failure => {
          console.log("主讲老师获取失败");
        }
      );
    },
    // 教室
    classrooms() {
      this.$http.get(
        "/classrooms/list",
        { page: 1 },
        success => {
          // console.log(success);
          this.classroomList = success.data.list;
        },
        fialure => {
          console.log("获取教室信息失败");
        }
      );
    },
    // 添加学员
    changeStudent(list) {
      this.dialogVisible = false;
      for (var i in list) {
        // 下标
        // console.log(i)
        this.studentList.push(list[i]);
      }
      console.log(this.studentList);
    },  
  }
};
</script>
<style lang="less">
.HourListes {
  .el-dialog {
    margin-top: 0vh !important;
    position: relative;
    top: 35px;
    margin: 0px auto 50px;
    border-radius: 2px;
    box-sizing: border-box;
    width: 50%;
  }
  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* overflow: auto; */
    margin: 0;
  }
}
</style>
<style>
.el-input--suffix .el-input__inner {
  padding-right: 30px;
  width: 183px;
}
</style>
<style lang="less" scoped>
.HourListes {
  // 添加学员
  .createUser {
    cursor: pointer;
  }
  a {
    text-align: center;
    color: #409eff;
    font-size: 14px;
    text-decoration: none;
    position: relative;
    left: 1113px;
    top: 47px;
  }
}
.el-icon-edit {
  color: #409eff;
  position: relative;
  left: 1113px;
  font-size: 21px;
  top: 49px;
  /* display: none; */
}
</style>
<style lang="less" scoped>
.HourListes {
  // 按钮
  .edites {
    width: 100px;
    height: 33px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    border-radius: 5px;
    float: right;
    background-color: #2d67f6;
    margin-top: 8px;
    cursor: pointer;
  }
  .cancel {
    width: 100px;
    height: 33px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background-color: #2d67f6;
    line-height: 33px;
    border-radius: 5px;
    float: right;
    margin-top: 8px;
    margin-left: 20px;
    cursor: pointer;
  }
  // 时间
  .start {
    margin-left: 50px;
    margin-top: -10px;
  }
  .end {
    margin-top: -10px;
  }
  .first {
    height: 130px;
    background-color: #f5f5f5;
    b {
      clear: both;
      margin-left: 24px;
      line-height: 60px;
    }
    p {
      float: left;
      margin-left: 20px;
      margin-top: 0px;
    }
  }
  .second {
    height: 130px;
    background-color: #f5f5f5;
    margin: 10px 0px 10px 0px;
    b {
      clear: both;
      margin-left: -146px;
      line-height: 60px;
    }
    p {
      float: left;
      margin-left: 20px;
      margin-top: 60px;
    }
    .times {
      margin-top: 0px;
    }
  }
  .third {
    height: 150px;
    background-color: #f5f5f5;
    /* 引入精灵图 */
    .elf {
      width: 24px;
      height: 24px;
      background-image: url("../../assets/ico.png");
    }
    div.floor > div > div > div:nth-child(1) > span {
      display: inline-block;
      background-position: -2px -635px;
      margin-left: 20px;
    }
    div.floor > div > div > div:nth-child(2) > span {
      background-position: -2px -635px;
    }
    .el-input__suffix-inner .el-input__icon {
      height: none;
      top: 0;
    }
    .createTeacher {
      position: absolute;
      top: 81px;
      left: 150px;
    }
    .elf {
      width: 24px;
      height: 24px;
      background-image: url("../../assets/ico.png");
    }
    .userCap {
      display: inline-block;
      background-position: -2px -635px;
    }
    .box {
      margin-left: 30px;
      background-color: #f5f5f5;
    }
    .box h3 {
      display: inline-block;
      margin-right: 35px;
    }
    .box .user > div {
      margin-top: 30px;
      margin-right: 100px;
      float: left;
    }
    .floor {
      margin-top: 20px;
      background-color: #f5f5f5;
      clear: both;
    }
  }
}
</style>

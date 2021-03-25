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
        <el-form ref="form" :model="form" label-width="80px">
          <p>
            <el-form-item label="课程名称">
              <el-select v-model="form.name" placeholder="请选择活动区域">
                <el-option label="区域一" value="shang"></el-option>
                <el-option label="区域二" value="shang"></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="主讲老师">
              <el-select v-model="form.name" placeholder="请选择活动区域">
                <el-option label="区域一"></el-option>
                <el-option label="区域二"></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="助教老师">
              <el-select v-model="form.name" placeholder="请选择活动区域">
                <el-option label="区域一"></el-option>
                <el-option label="区域二"></el-option>
              </el-select>
            </el-form-item>
          </p>
          <p>
            <el-form-item label="教师">
              <el-select v-model="form.name" placeholder="请选择活动区域">
                <el-option label="区域一"></el-option>
                <el-option label="区域二"></el-option>
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
          v-model="startTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
        ></el-time-select>
        <el-time-select
          class="end"
          placeholder="结束时间"
          v-model="endTime"
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
          <h3>选择学员(0)</h3>
          <span class="createUser">
            <span class="el-icon-user"></span>添加学员
          </span>
          <div class="user" v-for="(item,index) in courseInfo.studentList" :key="index">
            <div>
              <span class="elf userCap"></span>
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="cancel">取消课程</div>
      <div class="edites">修改课程</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourList",
  data() {
    return {
      startTime: "",
      endTime: "",
      // 第一块修改
      first_edit: true,
      // 第二块修改
      second_edit: true,
      // 第三块修改
      thrid_edit: true,
      courseInfo: [],
      form: {
        name: ""
      }
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
  },
  mounted() {},
  methods: {
    //单个课程
    single() {
      console.log(this.tableid);
      this.$http.get(
        "/coursetables/get",
        { id: this.tableid },
        success => {
          console.log(success);
          this.courseInfo = success.data.model;
        },
        fialure => {
          console.log("获取失败");
        }
      );
    },
    // 课程信息
    
  }
};
</script>
<style>
.HourListes .el-input--suffix .el-input__inner {
  padding-right: 30px;
  width: 183px;
}
</style>
<style lang="less" scoped>
.HourListes {
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
.el-dialog {
    margin-top: 0vh !important;
    position: absolute;
    top: 35px;
    /* bottom: 20px; */
    left: 11%;
    display: flex;
    flex-direction: column;
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

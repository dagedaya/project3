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
        <p>
          <span>课程名称：</span>
          <el-input v-model="form.name"></el-input>
        </p>
        <p>
          <span>主讲老师：</span>
          <el-input v-model="form.name"></el-input>
        </p>
        <p>
          <span>助教老师：</span>
          <el-input v-model="form.name"></el-input>
        </p>
        <p>
          <span>教师：</span>
          <el-input v-model="form.name"></el-input>
        </p>
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
      <td v-show="!second_edit"></td>
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
      <div>
        <el-button class="cancels">修改</el-button>
        <el-button class="cancel">取消课程</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourList",
  data() {
    return {
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
    }
  }
};
</script>
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
.cancel {
  margin-top: 95px;
  text-align: center;
}
.cancels {
  margin-top: 95px;
  text-align: center;
  /* display: none; */
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

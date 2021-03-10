<template>
  <div class="HourListes">
    <div class="first">
      <b>基本信息</b>
      <p>课程名称：架子鼓课</p>
      <p>主讲老师：明明</p>
      <p>教师：202教师</p>
    </div>
    <div class="second">
      <b>
        <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;
        上课时间
      </b>
      <p>2021年3月1日(周一)</p>
      <p>13:30 - 14:15</p>
    </div>
    <div class="third">
      <!-- 尾部部分 -->
      <div class="floor">
        <div class="box">
          <h3>选择学员(0)</h3>
          <span class="createUser">
            <span class="el-icon-user"></span>添加学员
          </span>
          <div class="user">
            <div>
              <span class="elf userCap"></span>
              Jason
            </div>
            <div>
              <span class="elf userCap"></span>
              Jason
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HourList',
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.HourListes {
  .first {
    height: 130px;
    background-color: #f5f5f5;
    b {
      clear: both;
      margin-left: -359px;
      line-height: 60px;
    }
    p {
      float: left;
      margin-left: 20px;
      margin-top: 60px;
    }
  }
  .second {
    height: 130px;
    background-color: #f5f5f5;
    margin: 10px 0px 10px 0px;
    b {
      clear: both;
      margin-left: -238px;
      line-height: 60px;
    }
    p {
      float: left;
      margin-left: 20px;
      margin-top: 60px;
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

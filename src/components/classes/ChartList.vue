<template>
  <div class="chartes">
    <div class="left">
      <div class="top">
        <div class="header">
          <p class="title">架子鼓基础班2101</p>
        </div>
        <div class="content">
          <div class="inline">
            <h6>
              <span class="pro_one">课程：</span>架子鼓课
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">老师：</span>茜茜、老师傅
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">教室：</span>
            </h6>
          </div>
          <div class="inline">
            <h6>
              <span class="pro_one">人数：</span>2/30
            </h6>
          </div>
          <!-- 进度条 -->
          <el-progress :percentage="50" :color="colores" :stroke-width="15"></el-progress>
          <div class="inline">
            <h6>
              <span class="pro_one already">已上2节课</span>
              <span class="pro_one already2">已排4节课</span>
            </h6>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="one">
          <div class="inline2">
            <h6>
              <span class="pro_two">选择成员：</span>(2)
            </h6>
          </div>
          <i class="el-icon-user" style="color:blue"></i>
          <div class="block">
            <img src="../../assets/ico1.png" width="50px" height="50px" />
            <p>李四</p>
            <a href="javascript:;">已排3节，已上1节</a>
          </div>
          <div class="block">
            <img src="../../assets/ico1.png" width="50px" height="50px" />
            <p>李四</p>
            <a href="javascript:;">已排本班课节3，其中上了1节</a>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-calendar v-model="value"></el-calendar>
      <div class="clear">
        <div class="clear1"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Hour from "../../views/hour/Hour.vue"
export default {
  // components:{Hour},
  name: "ChartList",
  data() {
    return {
      colores: "#1bd67b",
      value: new Date()
    };
  },
  created(){
    this.student()
  },
  mounted() {},
  methods: {
    // 进度条
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    // 获取学生信息
    student(){
      this.$http.get('/students/list',{page:1,psize:10000},success=>{
        console.log(success)
      },failure=>{
        console.log('获取学生信息失败')
      })
    }
  }
};
</script>

<style lang="less">
.classes {
  .el-dialog__body {
    background-color: #f5f5f5;
  }
}
</style>
<style lang="less" scoped>
.chartes {
  .left {
    float: left;
    .top {
      width: 399px;
      height: 350px;
      background-color: #fff;
      border-radius: 10px;
      .header {
        height: 64px;
        background-color: #1890ff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .title {
          font-size:14px; 
          color: #fff;
          line-height: 64px;
          margin-left: 30px;
        }
      }
      .content {
        font-size:14px; 
        margin-top: -6px;
        margin-left: 30px;
        line-height: 12px;
        .pro_one {
          color: #7e8a9a;
        }
        .already {
          margin-left: 10px;
          margin-top: -19px;
        }
        .already2 {
          margin-left: 170px;
          margin-top: -19px;
        }
      }
    }
    .bottom {
      width: 400px;
      height: 250px;
      background-color: #fff;
      margin-top: 10px;
      border-radius: 10px;
      .one {
        width: 340px;
        height: 35px;
        margin-left: 30px;
        margin-top:20px;
        border-bottom: 1px solid #e5e5e5;
        font-size:14px; 
        line-height: 35px;
      }
      .pro_two {
        color: black;
      }
      h6 {
        color: #c5c3c4;
      }
      i {
        position: absolute;
        left: 360px;
        top: 477px;
        font-size: 20px;
      }
      .block img {
        float: left;
        margin-right: 10px;
      }
      .block p {
        width: 200px;
        height: -30px;
        line-height: 20px;
        overflow: hidden;
        color: #18adff;
        font-size:14px;
      }
      span {
        color: #948baa;
        font-size:14px;
      }
      a {
        text-decoration: none;
        font-size:14px;
        position: relative;
        left: 1px;
        top: -17px;
        color: #7da8d5;
      }
    }
  }
  .right {
    .clear {
      clear: both;
    }
    .clear1 {
      float: right;
    }
    width: 750px;
    margin-left: 425px;
    .el-calendar{
      border-radius: 10px;
    }
  }
}
</style>
<template>
<el-container>
  <el-header height="50px">
    <img src="@/assets/logo.png" alt="" class="logo">
    <h1>云教务管理系统</h1>
  </el-header>
  <el-container>
    <el-aside width="130px">
      <div class="el-div" v-for="(item,index) in elList" :key="index">
        <ul>
            <li>
              <span></span>
              <p>{{item.name}}</p>
            </li>
        </ul>
      </div>

    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      elList:[
        {
          path:'',
          name:'班级管理'
        },
        {
          path:'',
          name:"课程管理"
        },
        {
          path:'',
          name:'考勤管理'
        },
        {
          path:'',
          name:'课时管理'
        },
        {
          path:'',
          name:'学员管理'
        },
      ]
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
/* 清除页面边距 */
*{
  margin:0;
  padding: 0;
}
/* 左侧 */
ul li span{
  float: left;
  width:30px;
  height: 30px;
  background-image:url('../assets/ico.png');
  margin-left:45px;
  margin-top:20px;
}
ul li p{
  clear: both;
  margin-top:-90px;
  font-size:16px;
  color:#4f5f78
}
ul li span:nth-of-type(1){
    background-position: -9px -283px;
}
div:nth-child(2) > ul > li > span{
    background-position: -9px -94px;
}

div:nth-child(3) > ul > li > span{
    background-position: -9px -476px;
}
div:nth-child(4) > ul > li > span{
    background-position: -146px -95px;
}
div:nth-child(5) > ul > li > span{
    background-position: -88px -714px;
}
.el-div{
  width: 110px;
  height: 98px;
  text-align: center;
  /* background-color: #e8ebf0; */
  border-radius: 4px;
  margin-left:9px;
  margin-top: 20px;
  cursor: pointer;
}

/* logo */
.logo{
  margin-top: 6px;
}
.el-header img{
  float: left;
  margin-right: 10px;
} 
.el-header h1{
  margin-top:-5px;
}



/* element-ui 自带样式 */
.el-header{
  display: inline-block;
    background-color: #fff;
    line-height: 60px;
    border-bottom:1px solid #dee3e9;
  }
  
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 600px;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
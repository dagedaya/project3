<template>
<div>
  <div class="box-header">
    <!-- 输入框 -->
    <div class="place">
        <el-button><i class="el-icon-delete"></i>&nbsp;删除</el-button>
        <el-button><i class="el-icon-folder-add"></i>&nbsp;添加班级</el-button>
    </div>
    <div class="select-box">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">学习</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">课程</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="text-box">
      <input type="text" class="el-input__inner">
    </div>
    <i class="el-icon-search search"></i>
    </div>
  </div>
  <table class="tab">
      <tr>
        <th class="textleft" width="30%" style="text-align:left">班级名称</th>
        <th width="12%">课程</th>
        <th width="12%">老師</th>
        <th width="12%">人数</th>
        <th width="12%">计划课时</th>
        <th width="12%">已排课时</th>
        <th width="12%">已上课时</th>
    </tr>
    <tr v-for="(item,index) in dataList" :key="index">
      <td style="text-align:left;clear:both; line-height:55px">
        <span class="table-s"></span>{{item.className}}
        </td>
      <td>{{item.project}}</td>
      <td>{{item.teacher}}</td>
      <td>{{item.num}}</td>
      <td>{{item.plan}}</td>
      <td>{{item.already}}</td>
      <td>{{item.have}}</td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  data() {
    return {
      dataList:[
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
        },
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
        },
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
        },
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
        },
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
        },
        {
          className:"架子鼓基础班",
          project:'架子鼓课',
          teacher:'王老师',
          num:'0人',
          plan:'0课时',
          already:'25',
          have:'0'
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

<style>
.table-s{
  float: left;
  width:48px;
  height: 50px;
  background-image:url('../../assets/ico.png');

}
span:nth-of-type(1){
    background-position: -83px -339px;
    margin-top:18px;
    margin-left:10px;
}
/* 列表 */
.tab {
  width: 96%;
  margin-left:2%;
  margin-top:20px;
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
.select-box{
  width: 420px;
  height: 31px;
  border:1px solid #dee3e9;
  margin-left:263pxpx;
  margin-top:-42px;
  line-height: 28px;
  padding-left:5px;
  float: left;
  background-color: #fff;
}
.el-dropdown-link{
  cursor: pointer;
  color:#9ea4b0;
}
.text-box{
  width:260px;
  position: relative;
  left:90px;
  top:-30px;
}
.el-input__inner{
  border: none;
  background-color: rgba(0, 0, 0, 0);
}
.el-icon-search{
  position: absolute;
  left:780px;
  top:75px;
  font-size:20px;
}

  /* 按钮 */
.box-header{
  width:99.9%;
  height:55px;
  background-color:#f5f6fa;
  border-right:1px solid #dee3e9;
  border-bottom:1px solid #dee3e9;
}

.el-button{
  padding: 7px 12px;
  margin:10px 15px;
  background-color:#fff;
  color:#9ea4b0;
  font-size:14px;
}
.el-icon-delete{
  font-weight:bold;
  font-size:16px;
}
.box-header .box2{
  border:1px solid #dee3e9;
  background-color:#fff;
  color:#9ea4b0;
  width:100px;
  margin-left:-5px;
}
.el-icon-folder-add{
  font-weight:bold;
  font-size:16px;
}
.el-input__inner{
      border-left: none;
}
.place{
  position:relative;
}
.Deladd{
  position:absolute;
  top:0;
  left:0;
  z-index:999;
}
</style>
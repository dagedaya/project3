<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所选课程:">
      <el-select v-model="form.region" placeholder="请选择" class="inner">
        <el-option label="php" value="shanghai"></el-option>
        <el-option label="java" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="班级名称:">
      <el-input v-model="form.a" class="inner"></el-input>
    </el-form-item>
    <el-form-item label="计划课时:">
      <el-input v-model="form.name" class="inner"></el-input>&nbsp;&nbsp;课时
    </el-form-item>
    <div class="block">
      <span class="demonstration">日期:&nbsp;&nbsp;</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "0",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
    };
  },
  created(){

  },
  mounted() {},
  methods: {
    // 请求添加班级数据
    loaddata(){
      this.$http.post('/classes/ add',{courseid:0,coursename:0,name:0,startdate:'2021-10-20',enddate:'2021-10-20'},success =>{
        console.log(success)
      }),failrue =>{
        console.log('添加班级数据失败')
      }
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.inner {
  /* border: 1px solid #dee3e9; */
  width: 420px;
  border-radius: 4px;
}
.el-input__icon {
  line-height: 74px;
}


</style>
<template>
  <div>
    <el-form ref="form" :v-model="form" label-width="80px">
      <el-form-item label="所选课程:">
        <el-select class="inner" v-model="form.courseid">
          <template v-for="item in proList">
            <el-option :value="item.id" :label="item.name" :key="item.id">{{item.name}}</el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:">
        <el-input v-model="form.name" class="inner"></el-input>
      </el-form-item>
      <el-form-item label="计划课时:">
        <el-input v-model="form.coursecounts" class="inner"></el-input>&nbsp;&nbsp;课时
      </el-form-item>
      <el-form-item label="当前日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.startdate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.enddate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
        <el-button type="primary preservation" @click="AddClass">{{form.id==0||form.id==undefined?"添加":"修改"}}</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 课程列表
      proList: [],
      form: {
        // 课程id
        courseid: "",
        // 课程名称
        coursename: "",
        // 班级名称
        name: "",
        // 计划课时
        coursecounts: 0,
        // 当前时间
        startdate: "",
        // 结束时间
        enddate: ""
        // delivery: false,
        // type: [],
        // resource: "",
        // desc: ""
      },
      value1: "",
      value2: ""
    };
  },
  created() {
    // 调用所选的课程接口
    this.loaddata();
  },
  mounted() {},

  methods: {
    // 封装添加课程列表
    restModel() {
      this.form = [];
    },
    //所选的课程接口
    loaddata() {
      this.$http.get(
        "/courses/list",
        { page: 1 },
        success => {
          this.proList = success.data.list;
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },

    // 请求添加班级数据
    AddClass() {
      let that = this;
      let data = JSON.stringify(this.form);
      this.$http.post(
        "/classes/add",
        data,
        success => {
          // 添加成功
          this.restModel();
          that.$emit("ClassListChild");
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
        },
        failrue => {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      );
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped>
.inner {
  width: 420px;
  border-radius: 4px;
}
.el-input {
  border: 1px solid #f5f5f5;
}
</style>
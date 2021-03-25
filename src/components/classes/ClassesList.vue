<template>
  <div class="classesList">
    <el-form ref="form" :model="form" :rules="rules" label-width="90px">
      <el-form-item label="所选课程:" prop="courseid">
        <el-select class="inner" v-model="form.courseid">
          <template v-for="item in proList">
            <el-option :value="item.id" :label="item.name" :key="item.id">{{item.name}}</el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称:" prop="name">
        <el-input v-model="form.name" class="inner"></el-input>
      </el-form-item>
      <el-form-item label="计划课时:" prop="coursecounts">
        <el-input v-model="form.coursecounts" class="inner"></el-input>&nbsp;&nbsp;课时
      </el-form-item>
      <el-form-item label="当前日期" prop="startdate">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.startdate"
            :picker-options="OrderstartDate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束日期" prop="enddate">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            v-model="form.enddate"
            :picker-options="OrderstartDate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-button
        type="primary preservation"
        @click="AddClass(form)"
      >{{form.id==0||form.id==undefined?"添加":"修改"}}</el-button>
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
      },
      // 表单验证
      rules: {
        courseid: [{ required: true, message: "请选择", trigger: "change" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        coursecounts: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        startdate: [
          {
            required: true,
            message: "请选择开班日期",
            trigger: ["change", "blur"]
          }
        ],
        enddate: [
          {
            required: true,
            message: "请选择结班日期",
            trigger: ["change", "blur"]
          }
        ]
      },
      // 判断开始的日期不能大于结束的日期
      OrderstartDate: {
        disabledDate: time => {
          if (this.form.starttime) {
            console.log(time.getTime()) > new Date(this.form.enddate).getTime();
          }
        }
      },
      orderEndDate: {
        disabledDate: time => {
          if (this.form.endtime) {
            return (
              time.getTime() <
              new Date(this.form.startdate).getTime() - 86400000
            );
          }
        }
      }
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
      // 添加列表清空
      this.form = [];
    },
    // 所选的课程接口
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
    AddClass(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          const that = this;
          const data = JSON.stringify(this.form);
          this.$http.post(
            "/classes/add",
            data,
            success => {
              // 添加成功
              this.restModel();
              that.$emit("ClassListChild");
              // 弹框
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  float: right;
  margin-top: -20px;
}
</style>
<style lang="less" scoped>
.classesList {
  .inner {
    width: 420px;
    border-radius: 4px;
  }
}
</style>

<template>
  <div class="BuyClass">
    <div class="first">
      <div class="one">
        <p>合约类型</p>
        <input type="radio" name id />课时卡
        <input type="radio" name id checked />时段卡
      </div>
      <div class="two">
        <div class="start">
          <span>
            <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;签约日期
          </span>
          <br />
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>

        <div class="end">
          <span>&nbsp;&nbsp;&nbsp;结束日期</span>
          <br />
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div></div>
    </div>
    <div class="second">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="start1">
          <span class="pro">
            <i style="color:red">*</i>&nbsp;&nbsp;&nbsp;签约课程
          </span>
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <i class="el-icon-plus"></i>
        </div>
      </el-form>
      <div class="end2">
        <span>课时数</span>
        <span>课程单价</span>
        <span>课程金额</span>
        <el-input v-model="input" class="inp" placeholder="请输入内容"></el-input>
        <el-input v-model="input1" class="inp2" placeholder="请输入内容"></el-input>
        <el-input v-model="input2" class="inp3" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="third">
      <div class="one">
        <p>折扣方式</p>
        <input type="radio" name id checked />直减
        <input type="radio" name id />折扣
      </div>
      <div class="two">
        <span>优惠金额</span>
        <el-input v-model="input3" class="inp" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="fourth">
      <div class="one">
        <p>备注</p>
        <el-input type="textarea"></el-input>
      </div>
    </div>
    <div class="fifth">
      <div class="btn-left">
        <h4>总金额：<a href="javascript:;">￥15000</a></h4>
        <h4>已优惠：<a href="javascript:;">￥5000</a></h4>
      </div>
      <!-- 提交按钮 -->
      <div>
        <div class="btn">
          <el-button
            type="primary preservation"
            @click="course = false"
            style="background-color:#409EFF;color:#fff"
          >保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuyClass",
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      input3: "",
      formInline: {
        user: "",
        region: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.BuyClass {
  // 第一块
  .first {
    height: 120px;
    background-color: #f5f6fa;
    .one {
      padding-top: 25px;
      margin-left: 30px;
      float: left;
      p {
        margin-bottom: 30px;
        margin-top: -2px;
      }
    }
    .two {
      float: left;
      .start {
        float: left;
        margin-left: 40px;
        margin-top: 20px;
      }
      .end {
        float: right;
        margin-left: 15px;
        margin-top: 20px;
      }
      .el-input__icon:after {
        content: "";
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle;
        margin-top: 28px;
      }
      .el-input__inner {
        border: 1px solid #d0d0d0;
      }
    }
  }
  // 第二块
  .second {
    height: 120px;
    background-color: #f5f6fa;
    margin: 10px 0 10px 0;
    .el-input__icon {
      height: 135%;
      width: 25px;
      text-align: center;
      transition: all 0.3s;
      line-height: 41px;
      position: absolute;
      left: -38px;
      top: 10px;
    }
    .el-icon-plus {
      border: 1px solid #c8c8c8;
      font-size: 30px;
      margin-top: 63px;
    }
    .el-popper {
      min-width: 176.4px;
      transform-origin: center top;
      z-index: 2017;
      position: fixed;
      top: 92px;
      left: 196px;
    }
    .el-input__inner {
      width: 150px;
      border: 1px solid #c8c8c8;
      margin-top: 60px;
      margin-left: 30px;
    }
    .pro {
      position: absolute;
      left: 50px;
      top: 240px;
    }
    .end2 {
      float: right;
      span {
        margin-left: 154px;
        position: relative;
        top: -95px;
        left: -439px;
      }
      .inp {
        position: absolute;
        left: 260px;
        top: 212px;
      }
      .inp2 {
        position: absolute;
        left: 460px;
        top: 212px;
      }
      .inp3 {
        position: absolute;
        left: 660px;
        top: 212px;
      }
    }
  }
  .third {
    height: 120px;
    background-color: #f5f6fa;
    margin: 10px 0 10px 0;
    .one {
      padding-top: 25px;
      margin-left: 30px;
      float: left;
      p {
        margin-bottom: 30px;
        margin-top: -2px;
      }
    }
    .two {
      .el-input__inner {
        width: 150px;
        border: 1px solid #c8c8c8;
        margin-top: -40px;
        margin-left: 201px;
        position: relative;
        top: -20px;
      }
      span {
        display: block;
        margin-left: 211px;
        padding-top: 23px;
      }
    }
  }
  .fourth {
    height: 120px;
    background-color: #f5f6fa;
    margin: 10px 0 10px 0;
    .one{
      margin-left:29px;
      padding-top:10px;
    }
    .el-textarea__inner{
      width: 300px;
    }
  }
  .fifth {
    height: 60px;
    background-color: #f5f6fa;
    .btn {
      float: right;
      line-height: 40px;
      margin-right: 10px;
      padding: 9px 19px;
    }
    .btn-left {
      h4{
        float: left;
        margin-left:30px;
      }
      h4 a{
        text-decoration: none;
        color:red;
      }
    }
  }
}
</style>
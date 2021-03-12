<template>
  <div class="pay-course">
    <div class="connect">
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>合约类型</p>
          </div>
          <div class="connect-row-radio">
            <el-radio-group>
              <el-radio label="课时卡"></el-radio>
              <el-radio label="时段卡"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>
              <span style="color: red">*</span> 签约日期
            </p>
          </div>
          <div>
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>结束日期</p>
          </div>
          <div>
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
      </div>
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>
              <span style="color: red">*</span> 签约课程
            </p>
          </div>
          <div>
            <el-select v-model="date" placeholder="请选择课程">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-button class="create" icon="el-icon-plus"></el-button>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>签约日期</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="date"></el-input>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>签约日期</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="date"></el-input>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>
              <span style="color: red">*</span> 签约日期
            </p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="date"></el-input>
          </div>
        </div>
      </div>
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>合约类型</p>
          </div>
          <div class="connect-row-radio">
            <el-radio-group>
              <el-radio label="课时卡"></el-radio>
              <el-radio label="时段卡"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>签约日期</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="date"></el-input>
          </div>
        </div>
      </div>
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>签约日期</p>
          </div>
          <div class="connect-row-input">
            <el-input type="textarea" v-model="date"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <div class="money">
          <b>
            总金额：
            <span style="color: red">￥15000</span>
          </b>
        </div>
        <div class="money">
          <b>
            已优惠：
            <span style="color: red">￥5000</span>
          </b>
        </div>
      </div>
      <div class="submit">保存</div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
export default {
  name: "payCourse",
  data() {
    return {
      date: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
.studentes {
  .pty-pro {
    .el-dialog__body {
      padding: 15px 0 0 0;
      background-color: #f5f6fa;
    }
  }
}
.pay-course {
  .el-input__inner {
    border: 1px solid #d0d0d0;
  }
}
</style>
<style lang="less" scoped>
.pay-course {
  .connect {
    padding-right: 30px;
    padding-left: 23px;
    .connect-row {
      background-color: #fff;
      padding-left: 30px;
      padding-top: 25px;
      padding-bottom: 25px;
      margin-bottom: 20px;
      > .connect-row-rows {
        display: inline-block;
        margin-right: 21px;
        .el-select {
          width: 175px;
        }
        .create {
          padding: 0;
          width: 40px;
          height: 40px;
          margin-left: 5px;
        }
        .title {
          margin-bottom: 10px;
        }
        .connect-row-radio {
          padding-top: 10px;
          margin-right: 50px;
        }
        .connect-row-input {
          .el-input {
            width: 200px;
          }
        }
      }
    }
  }
  .footer {
    height: 55px;
    border-top: 2px solid #e9e9e9;
    .submit {
      width: 180px;
      height: 48px;
      background-color: #4385f5;
      text-align: center;
      line-height: 48px;
      font-size: 19px;
      color: #fff;
      float: right;
      margin-top: 7px;
      margin-bottom: 5px;
      margin-right: 30px;
      border-radius: 4px;
    }
    // display: inline-block;
    .money {
      float: left;
      line-height: 55px;
      padding-left: 32px;
    }
  }
}
</style>
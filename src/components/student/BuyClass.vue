<template>
  <div class="pay-course">
    <div class="connect">
      <div class="connect-row">
        <!-- 二 -->
        <div class="connect-row-rows">
          <div class="title">
            <p>合约类型</p>
          </div>
          <div class="connect-row-radio">
            <el-radio-group v-model="BuyClass.ordertype">
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
              <el-date-picker
                v-model="BuyClass.beigindate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
          <div class="connect-row-rows" v-show="BuyClass.ordertype!='课时卡'">
            <div class="title">
              <p>结束日期</p>
            </div>
            <div>
              <el-date-picker
                v-model="BuyClass.enddate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
      </div>
      <!-- 三 -->
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>
              <span style="color: red">*</span> 签约课程
            </p>
          </div>
          <div>
            <el-select v-model="date" placeholder="请选择课程">
              <el-option
                v-for="(item,index) in dataList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button class="create" icon="el-icon-plus"></el-button>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>课时数</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="BuyClass.coursecounts" type="number"></el-input>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>课程单价</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="BuyClass.price" type="number"></el-input>
          </div>
        </div>
        <div class="connect-row-rows">
          <div class="title">
            <p>
              <span style="color: red">*</span> 课程金额
            </p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="BuyClass.sumprice" type="text"></el-input>
          </div>
        </div>
      </div>
      <!-- 四 -->
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>折扣方式</p>
          </div>
          <div class="connect-row-radio">
            <el-radio-group v-model="BuyClass.discounttype">
              <el-radio label="直减"></el-radio>
              <el-radio label="折扣"></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="connect-row-rows" v-if="BuyClass.discounttype==='直减'">
          <div class="title">
            <p>优惠金额</p>
          </div>
          <div class="connect-row-input">
            <el-input
              v-model="BuyClass.discountprice"
              type="number"
              min="0"
              max="BuyClass.sumprice"
            ></el-input>
          </div>
        </div>
        <div class="connect-row-rows" v-else>
          <div class="title">
            <p>优惠金额</p>
          </div>
          <div class="connect-row-input">
            <el-input v-model="BuyClass.discountper" type="number" min="0" max="BuyClass.sumprice"></el-input>&nbsp;&nbsp;&nbsp;%
          </div>
        </div>
      </div>
      <!-- 五 -->
      <div class="connect-row">
        <div class="connect-row-rows">
          <div class="title">
            <p>备注</p>
          </div>
          <div class="connect-row-input">
            <el-input type="textarea" v-model="BuyClass.remarks"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div>
        <div class="money">
          <b>
            总金额：
            <span style="color: red">￥{{total}}</span>
          </b>
        </div>
        <div class="money">
          <b>
            已优惠：
            <span style="color: red">￥{{sale}}</span>
          </b>
        </div>
      </div>
      <div class="submit" @click="BuyCourse">保存</div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
export default {
  name: "payCourse",
  data() {
    return {
      // 课程列表数据
      dataList: [],
      date: "",
      // 真实数据
      BuyClass: {
        // 学员id
        studentid: "922",
        // 合约类型
        ordertype: "课时卡",
        // 签约日期
        beigindate: "2021-03-10",
        // 结束日期
        enddate: "2021-03-31",
        // 课程id
        courseid: "86",
        // 课时数
        coursecounts: 2,
        // 课程单价
        price: 5,
        // 课程金额
        sumprice: "0",
        //打折类型
        discounttype: "直减",
        // 折扣
        discountper: 0,
        // 直减
        discountprice: 0,
        // 备注
        remarks: ""
      },
      //优惠价格
      sale:'',
    };
  },
  created() {
    this.loaddata();
  },
  mounted() {},
  // 计算属性
  computed: {
    total(){
      //课时数
      var coursecounts = this.BuyClass.coursecounts
      //课时单价
      var price = this.BuyClass.price
      // 课程金额 = 课时数*课时单价
      this.BuyClass.sumprice = coursecounts * price
      //课程金额
      var sumprice = this.BuyClass.sumprice
      // 打折类型
      if(this.BuyClass.discounttype == '直减'){
        this.sale = this.BuyClass.discountprice
        return sumprice-this.BuyClass.discountprice
      }else{
        this.sale = sumprice-sumprice*(this.BuyClass.discountper/100)
        return sumprice*(this.BuyClass.discountper/100)
      }
    }
  },
  //监听
  watch:{
    // 监听课程金额
    'BuyClass.sumprice':{
      // 该回调将会在侦听开始之后被立即调用
      handler:function(newVal,oldVal){
        // 总金额 = 单价 * 数量
        if(this.BuyClass.coursecounts==""){ //课时数为空
          this.BuyClass.price=newVal/this.BuyClass.coursecounts
        }else{
          this.BuyClass.coursecounts=newVal / this.BuyClass.price
        }
      }
    }
  },
  methods: {
    // 请求课程列表数据
    loaddata() {
      this.$http.get(
        "/courses/list",
        { page: 1 },
        success => {
          this.dataList = success.data.list;
        },
        failrue => {
          console.log("请求数据失败");
        }
      );
    },
    // 购买课程
    BuyCourse() {
      console.log(JSON.stringify(this.BuyClass))
      this.$http.post(
        "/students/addorder",
        this.BuyClass,
        success => {
          console.log(success);
          this.$message({
            message: "学员购课成功",
            type: "success"
          });
          this.$emit("BuyChild");
        },
        failrue => {
          console.log("购买课程获取失败");
        }
      );
    }
  }
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
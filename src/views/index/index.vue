<template>
  <div class="home">
    <div class="title">首页</div>
    <!-- 整个页面 -->
    <div class="main">
      <!-- 整个左面 -->
      <div class="left-All">
        <!-- 左上 -->
        <div class="left-top">
          <div class="today">
            今日数据变动
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
          <div class="add">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
          <div class="add add1">
            <div class="student">新增学员</div>
            <p class="zier">0&nbsp;&nbsp;<span class="student">(人)</span></p>
          </div>
        </div>
        <!-- 左下 -->
        <div class="left-bottom">
          下面
        </div>
      </div>
      <!-- 整个右面 -->
      <div class="right-All">
        <!-- 右上面 -->
        <div class="right-top">
          <div class="remind">
            <div>事项提醒</div>
            <div>0</div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
          <div class="list">
            <div>
              <div class="money">欠费</div>
              <div class="font">有0位学员课时低于2</div>
            </div>
            <div class="icon">></div>
          </div>
        </div>
        <!-- 有下面 -->
        <div class="right-bottom">
          <div class="list-bottom">
            <div>
              <div class="birthday">生日学员</div>
            </div>
            <div class="ling">0<span>></span></div>
          </div>
          <div class="member">
            <div class="boder">
              <img src="../../assets/ico1.png" style="width:20px;height:20px" />
              <div class="wenzi">钟尚阳</div>
            </div>
            <div class="time">2021-04-21</div>
          </div>
          <div class="member">
            <div class="boder">
              <img src="../../assets/ico1.png" style="width:20px;height:20px" />
              <div class="wenzi">钟尚阳</div>
            </div>
            <div class="time">2021-04-21</div>
          </div>
          <div class="member">
            <div class="boder">
              <img src="../../assets/ico1.png" style="width:20px;height:20px" />
              <div class="wenzi">钟尚阳</div>
            </div>
            <div class="time">2021-04-21</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.home {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .title {
    margin-left: 10px;
    height: 74px;
    line-height: 74px;
    font-size: 20px;
  }
  .main {
    height: 580px;
    margin-left: 10px;
    display: flex;
    // 整个左面
    .left-All {
      z-index: 999;
      // min-width: 300px;
      height: 100%;
      flex: 1;
      margin-right: 320px;
      .left-top {
        height: 220px;
        margin-bottom: 20px;
        background-color: #fff;
        .today {
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #f5f5f5;
          margin-left: 34px;
          margin-right: 34px;
        }
        .add {
          float: left;
          .zier {
            color: #f54d40;
          }
          .student {
            color: #a47678;
          }
          width: 170px;
          height: 130px;
          border-right: 1px solid #f5f5f5;
          text-align: center;
          line-height: 30px;
          padding-top: 50px;
        }
        .add1 {
          border: none;
        }
      }
      .left-bottom {
        height: 330px;
        background-color: #fff;
      }
    }
    // 整个右面
    .right-All {
      position: fixed;
      right: 8px;
      height: 100%;
      width: 300px;
      .right-top {
        height: 300px;
        background-color: #fff;
        .remind {
          display: flex;
          justify-content: space-between;
          padding-left: 20px;
          padding-right: 20px;
          height: 50px;
          line-height: 50px;
        }
        .list {
          width: 100%;
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          .money {
            width: 40px;
            height: 20px;
            background-color: #e7f3ff;
            color: #309cff;
            font-size: 14px;
            text-align: center;
            line-height: 20px;
            float: left;
            margin-top: 10px;
            margin-left: 10px;
          }
          .font {
            padding-left: 60px;
          }
          .icon {
            padding-right: 20px;
          }
        }
      }
      .right-bottom {
        height: 250px;
        background-color: #fff;
        margin-top: 20px;
        .member {
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f5f5f5;
            margin-left: 10px;

          .boder {
            img {
              float: left;
              margin-top: 10px;
            }
            .wenzi {
              padding-left: 30px;
            }
          }

          .time {
            padding-right: 20px;
          }
        }
        .list-bottom {
          display: flex;
          justify-content: space-between;
          line-height: 50px;
          line-height: 50px;
        }
        .birthday {
          padding-left: 20px;
        }
        .ling {
          padding-right: 20px;
        }
      }
    }
  }
}
</style>
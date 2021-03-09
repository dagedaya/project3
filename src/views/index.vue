<template>
  <div class="indexes">
    <el-container>
      <!-- 头部 -->
      <el-header height="50px">
        <img src="@/assets/logo.png" alt class="logo" />
        <h1>云教务管理系统</h1>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside width="130px">
          <div
            class="el-div"
            v-for="(item,index) in elList"
            :key="index"
            @click="addClass(index)"
            :class="index==status?'changeClass':''"
          >
            <ul>
              <li>
                <span :style="index==status?item.check.backgroundPos:item.checkNo.backgroundPos"></span>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </el-aside>
        <!-- 主要部分 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧栏默认
      status: 0,
      elList: [
        {
          path: "/classes",
          name: "班级管理",
          // 选中
          check: {
            backgroundPos: "backgroundPosition:-9px -183px"
          },
          // 未选中
          checkNo: {
            backgroundPos: "backgroundPosition:-9px -283px"
          }
        },
        {
          path: "/project",
          name: "课程管理",
          // 选中
          check: {
            backgroundPos: "background-position:-82px -234px"
          },
          // 未选中
          checkNo: {
            backgroundPos: "background-position:-9px -94px"
          }
        },
        {
          path: "/work",
          name: "考勤管理",
          // 选中
          check: {
            backgroundPos: "background-position:-9px -382px"
          },
          // 未选中
          checkNo: {
            backgroundPos: "background-position:-9px -476px"
          }
        },
        {
          path: "/hour",
          name: "课时管理",
          // 选中
          check: {
            backgroundPos: "background-position:-146px -1px"
          },
          // 未选中
          checkNo: {
            backgroundPos: "background-position:-146px -95px"
          }
        },
        {
          path: "/student",
          name: "学员管理",
          // 选中
          check: {
            backgroundPos: "background-position:-2px -714px"
          },
          // 未选中
          checkNo: {
            backgroundPos: "background-position:-88px -714px"
          }
        }
      ]
    };
  },
  // 防止页面刷新
  created() {
    for (var i = 0; i < this.elList.length; i++) {
      if (this.elList[i].path == this.$route.path) {
        this.status = i;
      }
    }
  },
  mounted() {},
  methods: {
    // 路由跳转
    addClass(val) {
      this.status = val;
      this.$router.push({
        path: this.elList[val].path
      });
    }
  }
};
</script>

<style lang="less" scoped>
.indexes {
  /* 清除页面边距 */
  * {
    margin: 0;
    padding: 0;
  }
  /* 左侧 */
  ul li span {
    float: left;
    width: 30px;
    height: 30px;
    background-image: url("../assets/ico.png");
    margin-left: 45px;
    margin-top: 20px;
  }
  ul li p {
    clear: both;
    margin-top: -90px;
    font-size: 16px;
    color: #4f5f78;
  }
  ul li span:nth-of-type(1) {
    background-position: -9px -283px;
  }
  div:nth-child(2) > ul > li > span {
    background-position: -9px -94px;
  }

  div:nth-child(3) > ul > li > span {
    background-position: -9px -476px;
  }
  div:nth-child(4) > ul > li > span {
    background-position: -146px -95px;
  }
  div:nth-child(5) > ul > li > span {
    background-position: -88px -714px;
  }
  .el-div {
    width: 110px;
    height: 98px;
    text-align: center;
    border-radius: 4px;
    margin-left: 9px;
    margin-top: 20px;
    cursor: pointer;
  }
  .changeClass {
    background-color: #e8ebf0;
  }
  .changeClass p {
    color: #3f81fb;
  }

  /* logo */
  .logo {
    margin-top: 6px;
  }
  .el-header img {
    float: left;
    margin-right: 10px;
  }
  .el-header h1 {
    margin-top: -5px;
  }

  /* element-ui 自带样式 */
  .el-header {
    display: inline-block;
    background-color: #fff;
    line-height: 60px;
    border-bottom: 1px solid #dee3e9;
  }

  .el-aside {
    border-right: 1px solid #dee3e9;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 600px;
    box-shadow: 5px 0px 6px #dee3e9;
    z-index: 9;
  }

  .el-main {
    padding: 0;
    background-color: #fefefe;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
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
}
</style>
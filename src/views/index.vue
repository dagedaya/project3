<template>
  <div class="indexes">
    <el-container>
      <!-- 头部 -->
      <el-header height="60px">
        <img src="@/assets/logo.png" alt class="logo" />
        <h1>云教务管理系统</h1>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="校区：" class="cap_header">
            <el-select v-model="form.region" placeholder="请选择校区">
              <el-option
                :label="item.title"
                v-for="(item, index) in campusList"
                :key="index"
                :clearable="true"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-menu class="el-menu-demo" mode="horizontal">
          <img
            src="../assets/个人中心.png"
            alt
            width="25"
            height="25"
            class="center"
          />
          <el-submenu index="2">
            <template slot="title">个人中心</template>
            <el-menu-item index="2-1" @click="dialogVisible = true"
              >账号信息</el-menu-item
            >
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3" @click="loginOut()"
              >退出登录</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside width="130px">
          <div
            class="el-div"
            v-for="(item, index) in elList"
            :key="index"
            @click="addClass(index)"
            :class="index == status ? 'changeClass' : ''"
          >
            <ul>
              <li>
                <span
                  :style="
                    index == status
                      ? item.check.backgroundPos
                      : item.checkNo.backgroundPos
                  "
                ></span>
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </div>
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <p class="set">其他设置</p>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/classroom">教室管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/teacher">教师管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/campus">校区管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/account">账号管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/slideshow">轮播图管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/state">动态管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主要部分 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 账号信息 -->
    <el-dialog title="账号信息" :visible.sync="dialogVisible" width="50%">
      <accountInformation></accountInformation>
    </el-dialog>
  </div>
</template>

<script>
import accountInformation from "../../src/components/index/accountInformation.vue";
export default {
  components: { accountInformation },
  data() {
    return {
      // 账号信息
      dialogVisible: false,
      // 表头
      form: {},
      // 校区信息
      campusList: [],
      isCollapse: true,
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
    // 初始化校区信息
    this.campus();
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 路由跳转
    addClass(val) {
      this.status = val;
      this.$router.push({
        path: this.elList[val].path
      });
    },
    // 获取校区信息
    campus() {
      this.$http.get(
        "/campus/list",
        { page: 1 },
        success => {
          console.log(success);
          this.campusList = success.data.list;
        },
        failure => {
          console.log("获取信息失败");
        }
      );
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("token");
      this.$router.push({
        path: "/login"
      });
      this.$message({
        message: "请先登录",
        type: "success"
      });
    }
  }
};
</script>
<style>
.el-submenu__title {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none;
}
.el-menu--collapse .el-submenu {
  position: relative;
  left: 29px;
  top: 11px;
}
</style>
<style lang="less" scoped>
.indexes {
  .center {
    margin-top: 18px;
    position: relative;
    left: 22px;
    outline: none;
  }
  .el-menu-demo {
    clear: both;
    float: right;
    margin-top: -59px;
    height: 55px;
    margin-right: 23px;
  }
  .cap_header {
    float: right;
    margin-right: 190px;
    margin-top: 10px;
  }
  .set {
    color: #4f5f78;
    margin-top: -31px;
    margin-left: -21px;
  }
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
    height: 90px;
    text-align: center;
    border-radius: 4px;
    margin-left: 5px;
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
    margin-top: 11px;
    margin-left: 5px;
  }
  .el-header img {
    float: left;
    margin-right: 10px;
  }
  .el-header h1 {
    margin-top: -1px;
    float: left;
  }

  /* element-ui 自带样式 */
  .el-header {
    display: inline-block;
    background-color: #fff;
    line-height: 60px;
    border-bottom: 1px solid #dee3e9;
    position: fixed;
    width: 100%;
    z-index: 999;
    top: -2px;
  }

  .el-aside {
    border-right: 1px solid #dee3e9;
    background-color: #ffffff;
    color: #333;
    text-align: center;
    height: 100%;
    position: fixed;
    box-shadow: 5px 0px 6px #dee3e9;
    z-index: 9;
    margin-top: 50px;
    overflow: hidden;
  }

  .el-main {
    padding: 0;
    background-color: #fefefe;
    color: #333;
    margin-left: 130px;
    /* text-align: center; */
    /* line-height: 160px; */
    margin-top: 50px;
    overflow: hidden;
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

<template>
  <div class="state">
    <!-- 头部 -->
    <div class="box-header">
      <p>动态数目（8个）</p>
      <div type="button" class="btn" @click="dialogVisible = true">添加</div>
    </div>
    <!-- 表格 -->
    <table class="tab">
      <tr>
        <th class="textleft" width="40%">标题</th>
        <th width="10%" class="textth">动态分类</th>
        <th width="20%" class="time">发布时间</th>
        <th width="10%">启用状态</th>
        <th width="10%">设为主页</th>
        <th width="15%" class="handle">操作</th>
      </tr>
      <tr>
        <td class="text-first">
          <img src="@/assets/images/state.png" style="width:108px;height:71px" alt="" class="swiperInfo">
          <div class="text-font">
            <h4>动作讲解</h4>
            <p>动作要领</p>
          </div>
        </td>
        <td class="textth-text">少儿跆拳道</td>
        <td class="text-time">2021-04-01 17:35</td>
        <td></td>
        <td></td>
        <td class="cli-btn">
          <a href="javascript:;" class="a_del">编辑</a>
        </td>
      </tr>
    </table>

    <!-- 分页 -->
    <!-- <el-pagination
      class="paging"
      background
      layout="total, prev, pager, next, jumper"
      :total="counts"
      @current-change="chagneNumber"
      :hide-on-single-page="true"
      :page-size="pageNumber"
    ></el-pagination> -->

    <template v-if="dialogVisible">
      <el-dialog title="添加动态" :visible.sync="dialogVisible" width="80%">
        <stateList ref="account" @accountChild="accountChild"></stateList>
      </el-dialog>
    </template>
  </div>
</template>


<script>
// 引入组件
import stateList from "../../components/state/stateList.vue";
export default {
  components: { stateList },
  data() {
    return {
      // 账号id
      id: "",
      // 总条数
      counts: 0,
      // 每页显示的条数
      pageNumber: 6,
      //当前页
      page: 1,
      dialogVisible: false,
      account: {
        // 账号列表
        accountList: [],
        // 搜索的内容
        search: ""
      }
    };
  },
  mounted() {},
  created() {
    // 初始化账号
    this.loaddata(1);
  },
  methods: {
    // 当前页
    chagneNumber(page) {
      this.page = page;
      this.loaddata(page);
    },
    // 获取账号数据
    loaddata(page) {
      this.$http.get(
        "/company/list",
        { page: page, psize: this.pageNumber },
        success => {
          this.account.accountList = success.data.list;
          this.counts = success.data.counts;
        },
        failure => {
          console.log("获取账号数据失败");
        }
      );
    },
    // 修改
    edit(index) {
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.account.form = JSON.parse(
          JSON.stringify(this.account.accountList[index])
        );
      }, 50);
    },
    // 删除
    del(index) {
      this.$http.get(
        "/company/delete",
        { id: this.account.accountList[index].id },
        success => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 请求账号列表数据
          this.loaddata();
        },
        failure => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        }
      );
    },
    // 子传
    accountChild(page) {
      this.dialogVisible = false;
      this.pass = false;
      this.loaddata(page);
    },
    // 搜索
    querySearchAsync(queryString, cb) {
      console.log(queryString);
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="less">
.accountes {
  div.text-box > div > div.el-input.el-input--suffix > input {
    border: none !important;
  }
  .el-dialog {
    margin-top: 0 !important;
    position: absolute;
    margin: auto;
    left: 25%;
    top: 35px;
    display: flex;
    flex-direction: column;
  }
  .el-pagination__total {
    margin-top: 0 !important;
  }
}
</style>
<style lang="less">
.state {
  // 分页
  .paging {
    text-align: center;
    margin-top: 10px;
  }
  /* 滑过 */
  table tr:hover {
    background-color: #e8ebf0;
  }
  .cli-btn a {
    display: none;
    text-decoration: none;
  }
  table tr:hover .cli-btn a {
    display: block;
    float: left;
    margin-right: 20px;
  }
  .box-header {
    p {
      padding-left: 30px;
      line-height: 55px;
    }
    .btn {
      width: 120px;
      height: 40px;
      background-color: #fd665b;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      border-radius: 3px;
      float: right;
      margin-top: -63px;
      margin-right: 30px;
      cursor: pointer;
    }
  }

  // 表单
  /* 表格 */
  .a_del {
    text-decoration: none;
  }
  span:nth-of-type(1) {
    background-position: -82px -234px;
    margin-top: 18px;
    margin-left: 10px;
  }
  /* 列表 */
  .tab {
    display: table;
    width: 96%;
    margin-left: 2%;
    margin-top: 20px;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #f4f4f4;
    .time{
      text-align: left;
    }
    .text-first {
      text-align: left;
      clear: both;
      line-height: 10px;
      h4{
        font-size: 18px;
      }
      p{
        font-size: 14px;
        color:#989a99;
      }
    }
    .textleft {
      text-align: left;
      padding-left: 100px;
    }
    .text-time{
      color:#68667e;
    }
    .textth {
      text-align: left;
    }
    .handle {
      text-align: left;
    }
    .textth-text {
      color: #6f6f6f;
      text-align: left;
    }
  }
  .swiperInfo {
    display: table-cell;
    vertical-align: middle;
    padding: 10px 0px 10px 100px;
    float: left;
  }
  .text-font{
    margin-left: 220px;
  }
  .tab th {
    border-bottom: solid 1px #fea500;
    text-align: center;
  }
  .tab td{  
    border-bottom: 1px solid #ececec;
  }
  .tab th {
    background: #f5f6fa;
    height: 35px;
    text-align: center;
    font-weight: normal;
  }

  .box-header {
    width: 99.9%;
    height: 55px;
    background-color: #f0f1f5;
    border-right: 1px solid #dee3e9;
    border-bottom: 1px solid #dee3e9;
    position: relative;
  }
}
</style>

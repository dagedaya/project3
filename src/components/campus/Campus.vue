<template>
  <div class="campuses">
    <!-- 头部 -->
    <div class="box-header">
      <p>校区管理</p>
      <div type="button" class="btn" @click="dialogVisible=true">添加校区</div>
    </div>
    <!-- 表格 -->
    <table class="tab">
      <tr>
        <th class="textleft" width="30%" style="text-align:left">校区</th>
        <th width="15%">地址</th>
        <th width="15%">校区电话</th>
        <th width="15%">校区座机</th>
        <th width="15%">修改校区</th>
        <th width="15%">操作</th>
      </tr>
      <tr v-for="(item,index) in form.campusList" :key="index">
        <td style="text-align:left;clear:both; line-height:55px">
          {{item.title}}
          <!-- <span class="table-s"></span> -->
        </td>
        <td>{{item.province}}{{item.city}}{{item.area}}</td>
        <td>{{item.tel}}</td>
        <td>{{item.mobile}}</td>
        <td>
          <i class="el-icon-edit" @click="edit(index)"></i>
        </td>
        <td class="cli-btn">
          <!-- 删除弹出确认按钮  // 气泡中确定按钮绑定click事件 -->
          <el-popconfirm title="这是一条数据确定删除吗？" @confirm="del(index)">
            <a href="javascript:;" slot="reference">删除</a>
          </el-popconfirm>
        </td>
      </tr>
    </table>
    <!-- 分页 -->
    <el-pagination
      class="paging"
      background
      layout="total, prev, pager, next, jumper"
      :total="counts"
      :hide-on-single-page="true"
      @current-change="chagneNumber"
      :page-size="pageNumber"
    ></el-pagination>
    <!-- 添加教室 -->
    <el-dialog title="添加校区" :visible.sync="dialogVisible" width="50%">
      <camPusAdd ref="cumpusChild" @campuschild="campuschild"></camPusAdd>
    </el-dialog>
  </div>
</template>


<script>
// 引入组件
import camPusAdd from "../../components/campus/camPusAdd.vue";
export default {
  components: { camPusAdd },
  data() {
    return {
      // 总条数
      counts: 0,
      // 每页显示的条数
      pageNumber: 6,
      dialogVisible: false,
      form: {
        // 校区列表
        campusList: [],
        // 搜索的内容
        search: ""
      }
    };
  },
  mounted() {},
  created() {
    // 初始化校区数据
    this.loaddata(1);
  },
  methods: {
    // 当前页
    chagneNumber(page) {
      this.loaddata(page);
    },
    // 获取校区数据
    loaddata(page) {
      this.$http.get(
        "/campus/list",
        { page },
        success => {
          this.form.campusList = success.data.list;
          this.counts = success.data.counts;
        },
        failure => {
          console.log("添加校区数据失败");
        }
      );
    },
    // 子传
    campuschild() {
      this.dialogVisible = false;
      this.loaddata();
    },
    // 修改
    edit(index) {
      this.dialogVisible = true;
      setTimeout(() => {
        this.$refs.cumpusChild.form = JSON.parse(
          JSON.stringify(this.form.campusList[index])
        );
      }, 50);
    },
    //删除
    del(index) {
      console.log(this.form.campusList[index].id);
      this.$http.get(
        "/campus/delete",
        { id: this.form.campusList[index].id },
        success => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.loaddata();
        },
        failure => {
          this.$message({
            message: "删除成功",
            type: "error"
          });
        }
      );
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
.classroomes {
  div.text-box > div > div.el-input.el-input--suffix > input {
    border: none !important;
  }
}
.campuses {
  .el-dialog {
    margin-top: 0 !important;
    position: absolute;
    margin: auto;
    left: 25%;
    top: 35px;
    // bottom: 20px;
    display: flex;
    flex-direction: column;
  }
}
</style>
<style lang="less">
.campuses {
  // 分页
  .paging {
    text-align: center;
    margin-top: 10px;
  }
  .el-icon-edit {
    color: #1890ff;
  }
  /* 滑过 */
  table tr:hover {
    background-color: #e8ebf0;
  }
  .cli-btn a {
    display: none;
    text-decoration: none;
    position: relative;
    top: -11px;
  }
  table tr:hover .cli-btn a {
    display: block;
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
    width: 96%;
    margin-left: 2%;
    margin-top: 20px;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tab td,
  .tab th {
    border-bottom: solid 1px #ececec;
    text-align: center;
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

<template>
  <div class="center">
    <el-table ref="filterTable" :data="stuData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%" border>
      <el-table-column prop="sno" label="学号" sortable column-key="sno" align="center"></el-table-column>
      <el-table-column prop="sname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="class" label="班级" align="center"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        total: 0,
        pagesize: 4,
        currentPage: 1,
        stuData: [],
      }
    },
    created() {
      // 获取token;数据sno=111&spassword=333
      const token = sessionStorage.getItem('token');
      // 构造URL 的查询字符串对象
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      // 获取tno数据
      param.append("tno", searchtoken.get("tno"));
      this.$api.postData('/tor/stulist', param)
      .then(res => {
        this.stuData = res;
        this.total = res.length;
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
</script>

<style>

</style>
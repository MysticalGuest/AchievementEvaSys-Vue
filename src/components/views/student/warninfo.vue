<template>
  <div class="center">
    <el-table ref="filterTable" :data="warnData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="cno" label="课程号" sortable column-key="courseId">
      </el-table-column>
      <el-table-column prop="cname" label="课程名">
      </el-table-column>
      <el-table-column prop="warning" label="预警状态"
        :filters="[{text: '预警', value: '预警'}, {text: '未预警', value: '未预警'}]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.warning == '预警' ? 'danger' : 'primary'" disable-transitions>{{scope.row.warning}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total:0,//数据个数
        pagesize:8,//每页的数据条数
        currentPage:1,//默认开始页面
        warnData: []
      }
    },
    created(){
    	// 获取token;数据sno=111&spassword=333
    	const token = sessionStorage.getItem('token');
    	// 构造URL 的查询字符串对象
    	const searchtoken = new URLSearchParams(token);
    	let param = new URLSearchParams();
    	// 获取sno数据
    	param.append("sno", searchtoken.get("sno"));
    	this.$api.postData('/stu/warninfo',param)
    	.then(res => {
        this.warnData=res;
        this.total = res.length;
    	})
    	.catch(err => {
    	  console.log(err);
    	});
    },
    methods:{
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      filterTag(value, row) {
        return row.warning === value;
      },
    }
  }
</script>

<style>
  .el-pagination{
    padding-top:10px;
    margin: 0 auto;
  }
</style>

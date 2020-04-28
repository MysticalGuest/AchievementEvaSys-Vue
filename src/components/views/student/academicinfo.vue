<template>
  <div class="center">
    <div class="transition-box" style="background-color: #CC5A5A;">个人评价达成度：{{indiv_score}}</div>

    <div class="transition-box">指标点评价达成度</div>
    <el-table ref="filterTable"
      :data="indexContentData.slice((currentPage-1) * pagesize, currentPage * pagesize)"
      border style="width: 100%">
      <el-table-column prop="index_detail_id" label="指标点序号" align="center" sortable column-key="courseId">
      </el-table-column>
      <el-table-column prop="index_detail_content" label="指标点内容" header-align="center" align="left">
      </el-table-column>
      <el-table-column prop="score" label="指标点分数" align="center">
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total_index"
      @current-change="current_change">
    </el-pagination>

    <div class="transition-box">课程达成度</div>
    <el-table ref="filterTable" :data="courseAchieveData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="cno" label="课程号" sortable column-key="courseId">
      </el-table-column>
      <el-table-column prop="cname" label="课程名">
      </el-table-column>
      <el-table-column prop="credit" label="课程学分">
      </el-table-column>
      <el-table-column prop="ca_name" label="课程负责人">
      </el-table-column>
      <el-table-column prop="tperiod" label="课时">
      </el-table-column>
      <el-table-column prop="nature" label="课程类型"
        :formatter="formatter"
        :filters="[{text: '必修课程', value: '必修课程'}, {text: '选修课程', value: '选修课程'}]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.nature == '必修课程' ? 'primary' : 'success'" disable-transitions>{{scope.row.nature}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="查看课程详细成绩">
        <template slot-scope="scope">
          <el-button @click="showStuScoreDetail(scope.row)" type="primary" icon="el-icon-info" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total_index"
      @current-change="current_change">
    </el-pagination>

    <!-- 展示对话框 -->
    <el-dialog title="课程详细信息" :visible.sync="dialogTableVisible">
      <p>课程达成度：{{courseAchievement}}</p>
      <el-table :data="detailData">
        <el-table-column property="course_detail_name" label="课程教学大纲"></el-table-column>
        <el-table-column property="index_detail_id" label="指标点id"></el-table-column>
        <el-table-column property="index_detail_content" label="指标点内容"></el-table-column>
        <el-table-column property="index_score" label="分值"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        total:0,//数据个数
        total_index:0,
        pagesize:8,//每页的数据条数
        currentPage:1,//默认开始页面
        indiv_score:0,
        indexContentData: [],
        courseAchieveData: [],
        dialogTableVisible: false,
        courseAchievement: 0,
        detailData:[]
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
    	this.$api.postData('/stu/courseinfo',param)
    	.then(res => {
        console.log("res.indexContentData:"+res.indexContentData);
        this.indiv_score = res.indiv_score;
        // 指标点评价达成度表格数据
        this.indexContentData = res.indexContentData;
        // 课程达成度表格数据
        this.courseAchieveData = res.courseAchieveData;
        this.total_index = res.indexContentData.length;
    	})
    	.catch(err => {
    	  console.log(err);
    	});
    },
    methods:{
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.nature === value;
      },
      showStuScoreDetail(row) {
        // this.pageTag = row.cno
        this.dialogTableVisible = true
        // StudentApi.getCourseDetailScore(this.$store.state.id, row.cno).then(res => {
        //    this.gridData = res.tableData
        //    this.courseScore = res.score
        // })
        const token = sessionStorage.getItem('token');
        const searchtoken = new URLSearchParams(token);
        let param = new URLSearchParams();
        param.append("sno", searchtoken.get("sno"));
        param.append("cno", row.cno);
        this.$api.postData('/stu/courseDetailInfo',param)
        .then(res => {
          // console.log("res.indexContentData:"+res.indexContentData);
          // 课程详细信息表格数据
          this.detailData = res;
          // this.total_index = res.indexContentData.length;
        })
        .catch(err => {
          console.log(err);
        });
      },
    }
  }
</script>

<style>
  .el-pagination{
    padding-top:10px;
    margin: 0 auto;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 50px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding-top: 15px;
    box-sizing: border-box;
  }
</style>

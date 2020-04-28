<template>
  <div class="center teacoucenter">
    <el-button style="margin-top:10px" type="warning" @click="informVisble = !informVisble">查看通知</el-button>
    <el-table ref="filterTable" :data="courseData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="cno" label="课程号" sortable column-key="courseId"></el-table-column>
      <el-table-column prop="cname" label="课程名"></el-table-column>
      <el-table-column prop="credit" label="课程学分"></el-table-column>
      <el-table-column prop="ca_name" label="课程负责人"></el-table-column>
      <el-table-column prop="tperiod" label="课时"></el-table-column>

      <el-table-column prop="nature" label="课程类型"
        :filters="[{text: '必修课程', value: '必修课程'}, {text: '选修课程', value: '选修课程'}]"
        :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.nature == '必修课程' ? 'primary' : 'success'" disable-transitions>{{scope.row.nature}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="primary" icon="el-icon-message" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 0 auto;margin-top: 20px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
      </el-pagination>
    </div>
    <!-- 展示对话框 -->
    <el-dialog title="课程详细信息" :visible.sync="dialogTableVisible">
      <el-table :data="detailData">
        <el-table-column property="course_detail_name" label="课程教学大纲" width="150"></el-table-column>
        <el-table-column property="index_detail_id" label="指标点id" width="200"></el-table-column>
        <el-table-column property="index_detail_content" label="指标点内容" width="200"></el-table-column>
      </el-table>
      <el-button style="margin-top:10px" type="primary" @click="showStu">查看选课学生名单</el-button>
      <el-dialog width="30%" title="选课学生名单" :visible.sync="innerVisible" append-to-body>
        <el-table :data="stuData">
          <el-table-column property="sno" label="学号" width="150" sortable></el-table-column>
          <el-table-column property="sname" label="姓名" width="150"></el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>


    <el-dialog width="30%" title="通知" :visible.sync="informVisble" append-to-body>
      <el-card class="box-card">
        <h1>{{inform}}</h1>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        multipleSelection: [],
        total: 0,
        pagesize: 4,
        currentPage: 1,
        courseData: [],

        //以下是详细信息数据
        detailData: [], //gridData放置详细信息
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        outerVisible: false,
        //内层对话框数据
        stuData: [],
        innerVisible: false,
        pageTag: '' ,//用来存放查看学生选课的课程号

        inform:"",
        informVisble:false
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
      this.$api.postData('/tea/courseinfo',param)
      .then(res => {
        this.courseData = res;
        this.total = res.length;
      })
      .catch(err => {
        console.log(err);
      });


      // console.log("sdsd")
    },
    methods:{
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      filterTag(value, row) {
        return row.nature === value;
      },
      showDetail(row) {
        this.dialogTableVisible = true;
        let param = new URLSearchParams();
        // 获取tno数据
        param.append("cno", row.cno);
        this.$api.postData('/tea/detailinfo', param)
        .then(res =>{
          this.detailData = res;
        })
        .catch(err => {
          console.log(err);
        });
      },
      showStu() {
        this.innerVisible = true
        // TeacherApi.getCourseStu(this.pageTag).then(res => {
        //   this.stuData = res.tableData
        // })

      }
    }
  }
</script>

<style>
  .teacoucenter{
    width: 850px
  }
</style>

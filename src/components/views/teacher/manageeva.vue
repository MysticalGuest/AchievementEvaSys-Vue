<template>
  <div class="center teamancenter">
    <el-row class="rowheader">
      <el-col :span="6"><h3>一键导入成绩</h3></el-col>
      <el-col :span="12"><h4 style="color: red;">只能上传模板格式的Excel文件</h4></el-col>
      <el-col :span="6"><el-button type="info" @click="downloadfile()">下载成绩模板</el-button></el-col>
    </el-row>
    <el-row>
      <el-table ref="filterTable" :data="courseData.slice((currentPage-1) * pagesize, currentPage * pagesize)" border>
        <el-table-column prop="cno" label="课程号" sortable column-key="courseId" align="center" width="100px">
        </el-table-column>
        <el-table-column prop="cname" label="课程名" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="10">
                <el-button type="success" icon="el-icon-edit" @click="showStu(scope.row)" plain>登记成绩</el-button>
              </el-col>
              <el-col :span="14">
                <el-upload name="file" :data="{cno:scope.row.cno}" class="upload-demo" ref="upload" action="http://148.70.15.23:8000/gradeTemplate/"
                  :auto-upload="true" :show-file-list="false" :on-success="upload">
                  <el-button slot="trigger" type="primary" plain="">选取文件并上传</el-button>
                </el-upload>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
      </el-pagination>
    </el-row>

    <!-- 登记学生成绩,一级对话框 -->
    <el-dialog title="登记学生成绩" :visible.sync="outerVisible">
      <el-table :data="stuData">
        <el-table-column property="sno" label="学号" sortable></el-table-column>
        <el-table-column property="sname" label="姓名"></el-table-column>
        <el-table-column prop="approval_status" label="审核状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" icon="el-icon-search" circle @click="stuIndex(scope.row)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="register(scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 学生对应课程成绩,二级对话框 -->
    <el-dialog width="30%" :title="stuIndexTitle" :visible.sync="indexDetailVisible" append-to-body>
      <el-table :data="indexDetailData" style="width: 100%">
        <el-table-column prop="index_detail_id" label="指标点id"></el-table-column>
        <el-table-column prop="appraisal_value" label="评价值"></el-table-column>
        
      </el-table>
    </el-dialog>

    <!-- 登记学生这门课的成绩,二级对话框 -->
    <el-dialog width="30%" :title="registerGradeTitle" :visible.sync="registerGradeVisible" append-to-body>
      <!-- 选择要登记的指标点 -->
      <el-select v-model="value" placeholder="请选择指标点登记">
        <el-option v-for="item in index_options"
          :key="item.index_detail_id"
          :label="item.label"
          :value="item.state">
          <span style="float: left">{{ item.index_detail_id}}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.state}}</span>
        </el-option>
      </el-select>
      <!-- <div class="block"> -->
        <el-slider v-model="score" show-input>
        </el-slider>
      <!-- </div> -->
      <el-button type="primary" plain @click="commit()">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        courseData:[],
        total: 0,
        pagesize: 4,
        currentPage: 1,
        stuData: [],
        outerVisible: false,

        selectCourse : "",

        // stuIndex对话框
        indexDetailVisible: false,
        stuIndexTitle: "",
        indexDetailData:[],

        //  registerGrade对话框
        registerGradeVisible: false,
        registerGradeTitle:"",

        // 登记对话框下拉框数据
        index_options: [],
        // 这个值是el-option标签必须的初始值,否则会出问题
        value: '',
        // 这个值是el-slider标签必须的初始值,否则会出问题
        score:0
      }
    },
    methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      showStu(row) {
        this.outerVisible = true;
        // 记录用户选择表格中那一行的课程名,后面会用到
        this.selectCourse = row.cname;
        let param = new URLSearchParams();
        // 获取cno数据
        param.append("cno", row.id);
        this.$api.postData('/tea/stuofcourse', param)
        .then(res =>{
          this.stuData = res;
        })
        .catch(err => {
          console.log(err);
        });
      },
      // 学生选这门课对应指标点分值
      stuIndex(row) {
        this.stuIndexTitle = "[" + row.sname + "]" + "在[" + this.selectCourse + "]的成绩";
        this.indexDetailVisible = true;
        let param = new URLSearchParams();
        // 获取tno数据
        param.append("sno", row.sno);
        param.append("cno", row.cno);
        this.$api.postData('/tea/teaIndexDetailState', param)
        .then(res => {
          this.indexDetailData = res;
        })
        .catch(err => {
          console.log(err);
        });
      },
      register(row){
        if (row.approval_status == "已审核") {
          this.$notify.error({
            title: '错误',
            message: '审核完成，不可修改'
          });
        } else {
          this.registerGradeVisible = true;
          this.registerGradeTitle = "登记[" + row.sname + "]" + "在 [" + this.selectCourse + "] 的成绩";
          let param = new URLSearchParams();
          // 获取tno数据
          // param.append("sno", row.sno);
          param.append("cno", row.cno);
          this.$api.postData('/tea/registerGrade', param)
          .then(res => {
            this.index_options = res;
          })
          .catch(err => {
            console.log(err);
          });
        }
      },
      // 上传文件成功后:on-success回调函数,返回成功与否
      upload(res, file){
        // if (res.message == "success") {
        //   this.$notify({
        //     title: '成功',
        //     message: '成绩已经上传',
        //     type: 'success'
        //   });
        //   TeacherApi.getCourseStu(this.pageTag).then(res => {
        //     this.stuData = res.tableData
        //   })
        // } else {
        //   this.$notify.error({
        //     title: '错误',
        //     message: '成绩上传失败，请联系管理员'
        //   });
        // }
      },
      commit() {
        // TeacherApi.postIndexDetailScore(this.pageTag, this.pageSno, this.value, this.score).then(res => {
        //   // if (res.status == 200) {
        //   if (res.message == "success") {
        //     this.$notify({
        //       title: '成功',
        //       message: '分值已经录入系统',
        //       type: 'success'
        //     });
        //     TeacherApi.getCourseStu(this.pageTag).then(res => {
        //       this.stuData = res.tableData
        //     })
        //   } else {
        //     this.$notify.error({
        //       title: '错误',
        //       message: '分值录入失败，请联系管理员'
        //     });
        //   }
        // })
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
      this.$api.postData('/tea/courseinfo', param)
      .then(res => {
        this.courseData = res;
        this.total = res.length;
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
</script>

<style>
  /* .teamancenter{
    width: 100%;
  } */
  .el-row{
    width: 100%;
  }
  .el-pagination{
    padding-top:10px;
    margin: 0 auto;
  }
  .rowheader{
    border: 1px solid rgba(236, 13, 43, 0.2);
    border-radius: 4px;
    margin-bottom:10px
  }
  .rowheader > .el-col > .el-button{
    margin-top: 10px;
  }
</style>

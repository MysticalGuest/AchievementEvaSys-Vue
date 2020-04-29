<template>
  <div class="center teamancenter">
    <el-row>
      <div style="width: 20%;float: left;">
        <h3>一键导入成绩</h3>
        <el-button type="warning" @click="downloadfile()">下载成绩模板</el-button>
        <h4 style="color: red;">只能上传模板格式的Excel文件</h4>
      </div>
      <div style="width: 80%;float: right;">
        <el-table ref="filterTable" :data="courseData.slice((currentPage-1) * pagesize, currentPage * pagesize)" border>
          <el-table-column prop="cno" label="课程号" sortable column-key="courseId" align="center">
          </el-table-column>
          <el-table-column prop="cname" label="课程名" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-edit" @click="showStu(scope.row)" style="float: left;"></el-button>
              <el-upload name="file" :data="{cno:scope.row.cno}" class="upload-demo" ref="upload" action="http://148.70.15.23:8000/gradeTemplate/"
                :auto-upload="true" :show-file-list="false" :on-success="upload">
                <el-button slot="trigger" type="primary">选取文件并上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
        </el-pagination>
      </div>
    </el-row>

    <!-- 对话框 -->
    <el-dialog title="登记学生成绩" :visible.sync="outerVisible">
      <el-table :data="stuData">
        <el-table-column property="sno" label="学号" sortable></el-table-column>
        <el-table-column property="sname" label="姓名"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" icon="el-icon-search" circle @click="showStudIndex(scope.row)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="editStu(scope.row)"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog width="30%" :title="innerTitleInfo" :visible.sync="indexDetailVisible" append-to-body>
      <el-table :data="indexDetailData" style="width: 100%">
        <el-table-column prop="index_detail_id" label="指标点id" width="180">
        </el-table-column>
        <el-table-column prop="appraisal_value" label="分值" width="180">
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog width="30%" :title="innerTitle" :visible.sync="innerVisible" append-to-body>
      <el-select v-model="value" clearable placeholder="请选择指标点登记">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.state }}</span>
        </el-option>
      </el-select>
      <div class="block">
        <el-slider v-model="score" show-input>
        </el-slider>
      </div>
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
        indexDetailVisible: false
      }
    },
    methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      showStu(row) {
        this.outerVisible = true;
        let param = new URLSearchParams();
        // 获取tno数据
        param.append("cno", row.id);
        this.$api.postData('/tea/stuofcourse', param)
        .then(res =>{
          this.stuData = res;
        })
        .catch(err => {
          console.log(err);
        });
      },
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
  .teamancenter{
    width: 850px
  }
  .el-pagination{
    padding-top:10px;
    margin: 0 auto;
  }
</style>

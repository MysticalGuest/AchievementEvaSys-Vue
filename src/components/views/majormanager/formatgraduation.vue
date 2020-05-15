<template>
  <div class="center">
    <el-card class="box-card">
      <el-timeline class="text item">
        <el-timeline-item v-for="(activity, index) in activities"
          :key="index" :icon="activity.icon" :type="activity.type"
          :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
      <el-button type="success" @click="last">上一步</el-button>
      <el-button type="success" @click="next">下一步</el-button>
    </el-card>

    <!-- 第一步 格式化毕业要求 -->
    <el-card class="formatindex" v-if="showindex">
      <el-row>
        <h3>一键导入excel格式化毕业要求</h3>
        <el-col :span="7">
          <el-button type="warning" @click="downloadIndexTemplate()">下载毕业要求模板</el-button>  
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="indexDialogVisible = true">添加毕业要求</el-button>
        </el-col>
        <el-col :span="10">
          <el-upload
            name="textfield"
            :limit="1"
            class="upload-demo"
            ref="upload"
            action="DOMAIN:PORT/indexTemplate/"
            :auto-upload="false">
              <el-button slot="trigger" type="primary">选取文件</el-button>
            <el-col :span="10">
              <el-button type="success" @click="submitUpload">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传模板格式的Excel文件</div>
            </el-col>
          </el-upload>
        </el-col>
      </el-row>

      <!-- 毕业要求表格 -->
      <el-table ref="filterTable" :data="indexData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
        <el-table-column prop="index_id" label="毕业要求ID" sortable column-key="courseId"></el-table-column>
        <el-table-column prop="index_name" label="毕业要求名"></el-table-column>
        <el-table-column prop="index_content" label="毕业要求内容" width="200"></el-table-column>
        <el-table-column fixed="right" label="移除">
          <template slot-scope="scope">
            <el-button @click="removeIndex(scope.row)" type="danger" icon="el-icon-remove" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="totalIndex" @current-change="current_change"></el-pagination>
      <!-- 添加毕业要求对话框 -->
      <el-dialog width="30%" title="添加毕业要求" :visible.sync="indexDialogVisible" append-to-body center>
        <p>输入新的毕业要求的名称</p>
        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 10}" v-model="newIndexName">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <p>输入新的毕业要求的内容</p>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model="newIndexContent">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="indexDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitIndex">确 定</el-button>
        </span>
      </el-dialog>
      
    </el-card>
    <!-- 第一步 格式化毕业要求 结束 -->

    <!-- 第二步 格式化指标点 -->
    <el-card class="formatindexdetail" v-if="showdetail">
      <el-select v-model="indexvalue" placeholder="请选择一个毕业要求">
        <el-option
          v-for="item in indexData"
          :key="item.index_id"
          :label="item.index_name"
          :value="item.index_id">
          <span style="float: left">{{ item.index_name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.index_id }}</span>
        </el-option>
      </el-select>

      <el-button type="primary" @click="addIndexDetail">添加指标点</el-button>

      <el-table ref="filterTable" :data="indexDetailData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
        <el-table-column prop="index_detail_id" label="指标点ID" sortable column-key="courseId">
        </el-table-column>
        <el-table-column prop="index_detail_content" label="指标点内容">
        </el-table-column>
        <el-table-column fixed="right" label="移除">
          <template slot-scope="scope">
            <el-button @click="removeIndexDetail(scope.row)" type="danger" icon="el-icon-remove" circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="totalIndexDetail" @current-change="current_change">
      </el-pagination>

      <el-dialog width="30%" title="添加指标点" :visible.sync="indexDetailDialogVisible" append-to-body center>
        <div style="margin: 20px 0;"></div>
        <p>输入新的指标点的内容</p>
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model="newIndexDetailContent">
        </el-input>
        <p></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="indexDetailDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitIndexDetail">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <!-- 第二步 格式化指标点 结束 -->

    <!-- 第三步 分配指标点课程 -->
    <el-card class="formatcourse" v-if="showcourse">

      <el-row>
        <h3>一键导入excel分配课程指标点</h3>
        <el-col :span="12">
          <el-button type="warning" @click="downloadCourseTemplate()">下载课程模板</el-button>  
        </el-col>
        <el-col :span="12">
          <el-upload
            name="textfield"
            :limit="1"
            class="upload-demo"
            ref="upload"
            action="DOMAIN:PORT/courseTemplate/"
            :auto-upload="false">
              <el-button slot="trigger" type="primary">选取文件</el-button>
            <el-col :span="10">
              <el-button type="success" @click="submitUpload">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传模板格式的Excel文件</div>
            </el-col>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-select v-model="courseindexvalue" placeholder="请选择一个指标点">
            <el-option v-for="item in indexDetailData" :key="item.index_detail_id" :value="item.index_detail_id">
              <span style="float: left">{{ item.index_detail_id }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="showCourse()">添加课程</el-button>
        </el-col>
      </el-row>

      <el-table ref="filterTable" :data="courseData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
        <el-table-column prop="cno" label="课程id" column-key="courseId">
        </el-table-column>
        <el-table-column prop="cname" label="课程名">
        </el-table-column>
        <el-table-column fixed="right" label="移除">
          <template slot-scope="scope">
            <el-button @click="removeCourse(scope.row)" type="danger" icon="el-icon-remove" circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :total="totalCourse" @current-change="current_change">
      </el-pagination>

      <el-dialog width="30%" title="添加课程" :visible.sync="outerVisible" append-to-body>
        <el-table ref="filterTable" :data="gridData.slice((currentPage1-1) * pagesize1, currentPage1 * pagesize1)" style="width: 100%">
          <el-table-column prop="cno" label="课程id" sortable width="180" column-key="courseId">
          </el-table-column>
          <el-table-column prop="cname" label="课程名" width="180">
          </el-table-column>
          <el-table-column prop="weight" label="权重" width="180">
          </el-table-column>
          <el-table-column fixed="right" label="添加" width="100">
            <template slot-scope="scope">
              <el-button @click="addCourse(scope.row)" type="primary" icon="el-icon-plus" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <p></p>
        <el-pagination background layout="prev, pager, next" :total="total1" @current-change="current_change1">
        </el-pagination>
      </el-dialog>
    </el-card>
    <!-- 第三步 分配指标点课程 结束 -->
    
  </div>
</template>

<script>
  // 基本滑块验证组件
  // import dragVerify from "@/components/views/common/dragVerify";
  // export default {
  //   components:{
  //     dragVerify
  //   }
  // }

  export default {
    data() {
      return {
        activities: [{
          content: '第一步 格式化毕业要求',
          size: 'large',
          type: 'success',
        }, {
          content: '第二步 格式化指标点',
          type: 'info',
        }, {
          content: '第三步 分配指标点课程',
          type: 'info',
          size: 'large'
        }],
        count: 0,

        // v-if
        showindex: true,
        showdetail: false,
        showcourse: false,

        // 第一步 格式化毕业要求
        totalIndex: 0,
        currentPage: 1,
        pagesize: 4,
        indexData: [],  // 存放毕业要求
        indexDialogVisible: false,
        newIndexName:'',   // 新的毕业要求的名称
        newIndexContent:'',   // 新的毕业要求的内容

        // 第二步 格式化指标点
        newIndexDetailContent:"",
        totalIndexDetail: 0,
        // currentPage: 1,
        pagesize: 4,
        indexDetailData: [],//存指标点内容
        indexDetailDialogVisible: false,
        // index: [{
        //   index_id: '1',
        //   index_name: '名称'
        // }],
        indexvalue: '',   // el-select标签v-model绑定值

        // 第三步 分配指标点课程
        totalCourse: 0,
        // currentPage: 1,
        pagesize: 4,
        courseData: [], //存课程
        index: [], //保存指标点的id的数组
        courseindexvalue: '',
        gridData: [], //新增加的课程
        outerVisible: false,
        total1: 0,
        currentPage1: 1,
        pagesize1: 4
      }
    },
    components: {
      // FormatIndex,
      // FormatIndexDetail,
      // FormatCourse
    },
    methods: {
      // 上一步按钮
      last(){
        if(this.count == 1) {
          this.showindex = true;
          this.showdetail = false;
          this.showcourse = false;
          this.activities[1].type = "info"
        } else if(this.count==2){
          this.showindex = false;
          this.showdetail = true;
          this.showcourse = false;
          this.activities[2].type = "info"
        }
        if(this.count != 0)
          this.count -=1;
      },
      // 下一步按钮
      next() {
        if (this.count == 0) {
          this.showindex = false;
          this.showdetail = true;
          this.showcourse = false;
          this.activities[1].type = "success"
        } else if (this.count == 1) {
          this.showindex = false;
          this.showdetail = false;
          this.showcourse = true;
          this.activities[2].type = "success"
        }
        if(this.count < 2)
          this.count += 1;
      },
      // 获取毕业要求表格数据
      getIndex(){
        this.$api.postData('/mam/getIndex','')
        .then(res => {
          this.indexData = res;
          this.totalIndex = res.length;
        })
        .catch(err => {
          console.log(err);
        });
      },
      /* 
      第一步 格式化毕业要求 方法集
      */
      current_change(currentPage) {
        this.currentPage = currentPage;
      },
      submitIndex(){
        if(this.newIndexName == ""){
          this.$notify.error({
            title: '失败',
            message: '指标点名不能为空',
          });
          return;
        }
        if(this.newIndexContent == ""){
          this.$notify.error({
            title: '失败',
            message: '内容不能为空',
          });
          return;
        }
        let param = new URLSearchParams();
        param.append("newIndexName", this.newIndexName);
        param.append("newIndexContent", this.newIndexContent);
        this.$api.postData('/mam/submitIndex', param)
        .then(res =>{
          if(res.message == "success"){
            this.$notify({
              title: '成功',
              message: '毕业要求已录入！',
              type: 'success'
            });
            // 新添加数据后,刷新表格
            this.getIndex();
            // 自动退出对话框
            this.indexDialogVisible=false;
          } else {
            this.$notify.error({
              title: '失败',
              message: '录入失败，请联系管理员',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      removeIndex(row){
        let param = new URLSearchParams();
        param.append("index_id", row.index_id);
        this.$api.postData('/mam/removeIndex', param)
        .then(res =>{
          if(res.message == "success"){
            this.$notify({
              title: '成功',
              message: '移除成功！',
              type: 'success'
            });
            // 新添加数据后,刷新表格
            this.getIndex();
          } else {
            this.$notify.error({
              title: '失败',
              message: '移除失败，请联系管理员',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      // 上传文件处理方法
      submitUpload() {
        this.$refs.upload.submit();
      },
      downloadIndexTemplate(){
        window.open("DOMAIN:PORT/downloadIndexTemplate/")
      },
      /* 
      第一步 格式化毕业要求 结束
      */

      /* 
      第二步 格式化指标点 方法集
      */
      current_change(currentPage) {
        this.currentPage = currentPage
      },
      getIndexDetail(value){
        let param = new URLSearchParams();
        param.append("index_id", value);
        this.$api.postData('/mam/getIndexDetail',param)
        .then(res => {
          this.indexDetailData = res;
          this.totalIndexDetail = res.length;
        })
        .catch(err => {
          console.log(err);
        });
      },
      addIndexDetail(){
        if(this.indexvalue !=""){
          this.indexDetailDialogVisible = true;
        }
        else{
          this.$notify.error({
            title: '失败',
            message: '请选择一个毕业要求！',
          });
        }
      },
      submitIndexDetail(){
        if(this.newIndexDetailContent == ""){
          this.$notify.error({
            title: '失败',
            message: '内容不能为空',
          });
          return;
        }
        let param = new URLSearchParams();
        // 选择的毕业要求值
        param.append("indexdetailvalue", this.indexdetailvalue);
        param.append("newIndexDetailContent", this.newIndexDetailContent);
        this.$api.postData('/mam/submitIndexDetail', param)
        .then(res =>{
          if(res.message == "success"){
            this.$notify({
              title: '成功',
              message: '指标点已录入！',
              type: 'success'
            });
            // 新添加数据后,刷新表格
            this.getIndexDetail(this.indexdetailvalue);
            // 自动退出对话框
            this.indexDetailDialogVisible=false;
          } else {
            this.$notify.error({
              title: '失败',
              message: '录入失败，请联系管理员',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      removeIndexDetail(row){
        let param = new URLSearchParams();
        // 选择的毕业要求值
        param.append("indexdetailvalue", this.indexdetailvalue);
        param.append("index_detail_id", row.index_detail_id);
        this.$api.postData('/mam/removeIndexDetail', param)
        .then(res =>{
          if(res.message == "success"){
            this.$notify({
              title: '成功',
              message:'移除成功',
              type: 'success'
            });
            // 新添加数据后,刷新表格
            this.getIndexDetail(this.indexdetailvalue);
            // 自动退出对话框
            this.indexDetailDialogVisible=false;
          } else {
            this.$notify.error({
              title: '失败',
              message: '移除失败，请联系管理员',
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      },
      /* 
      第二步 格式化指标点 结束
      */

      /* 
      第三步 分配指标点课程 方法集
      */
      current_change(currentPage) {
        this.currentPage = currentPage
      },
      current_change1(currentPage) {
        this.currentPage1 = currentPage
      },
      removeCourse(row) {
        SPApi.removeCourse(this.value, row.cno).then(res => {
          if (res.message == "success") {
            this.$notify({
              title: '成功',
              message: '移除成功',
              type: 'success'
            });
            SPApi.getCourse(this.value).then(res => {
              this.tableData = res.tableData
              this.total = (Math.ceil(this.gridData.length / this.pagesize)) * 10
            })
          } else {
            this.$notify.error({
              title: '失败',
              message: '移除失败，请联系管理员',
            });
          }
        })
      },
     //获取没有的课程
     showCourse(row) {
       this.outerVisible = true
        SPApi.showCourse(this.value).then(res=>{
          this.gridData = res.tableData
          this.total1 = (Math.ceil(this.gridData.length / this.pagesize1)) * 10
        })
     },
     addCourse(row) {
       SPApi.addCourse(this.value, row.cno).then(res=>{
         if (res.message == "success") {
           this.$notify({
             title: '成功',
             message: '添加成功',
             type: 'success'
           });
           SPApi.showCourse(this.value).then(res=>{
             this.gridData = res.tableData
             this.total1 = (Math.ceil(this.gridData.length / this.pagesize1)) * 10
           });
           SPApi.getCourse(this.value).then(res => {
             this.tableData = res.tableData
             this.total = (Math.ceil(this.tableData.length / this.pagesize)) * 10
           });
         } else {
           this.$notify.error({
             title: '失败',
             message: '添加失败，请联系管理员',
           });
         }
       })
     },
     downloadCourseTemplate(){
       window.open("DOMAIN:PORT/downloadCourseTemplate/")
     },
     exportfile(){
       window.open("DOMAIN:PORT/downloadCourse/")
     },
     // 上传文件处理方法
     submitUpload() {
       this.$refs.upload.submit();
     }
      /* 
      第三步 分配指标点课程 结束
      */
    },
    created(){
      /* 
      第一步 格式化毕业要求
      */
      this.getIndex();
      /* 
      第一步 格式化毕业要求 结束
      */

      /* 
      第二步 格式化指标点
      */
      // SPApi.getIndex().then(res=>{
      //   this.index = res.tableData
      // })
      /* 
      第二步 格式化指标点 结束
      */

     /* 
      第三步 分配指标点课程
      */
      // SPApi.allIndextDetail().then(res => {
      //     this.index = res.tableData
      //   })
      /* 
      第三步 分配指标点课程 结束
      */
    },
    watch:{
      // 第二步 格式化指标点
      indexvalue(val){    // 监听el-select标签绑定的v-model值的变化
        
        this.getIndexDetail(val);
      }
      // 第三步 分配指标点课程
      // value(val) {
      //   SPApi.getCourse(this.value).then(res => {
      //     this.tableData = res.tableData
      //     this.total = (Math.ceil(this.tableData.length / this.pagesize)) * 10
      //   })
      // }
    }
  }
</script>

<style>
  /* .center{
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  } */
  /* .el-container{
    width: 100%;
  } */
  .formatindex{
    width: 100%;
  }
  .formatindexdetail{
    width: 100%;
  }
  .formatcourse{
    width: 100%;
  }
</style>
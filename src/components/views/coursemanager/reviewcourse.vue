<template>
  <div class="center">
    <el-table :data="reviewData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="cno" label="课程id" sortable column-key="courseId">
      </el-table-column>
      <el-table-column prop="cname" label="课程名">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="checkCourse(scope.row)" type="warning">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p></p>
    <div style="margin: 0 auto;margin-top: 30px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
      </el-pagination>
    </div>

    <!-- 展示对话框 -->
    <el-dialog width="30%" :title="outertitle" :visible.sync="outerVisible" append-to-body>
      <el-table :data="classData">
        <el-table-column property="class_name" label="班级" sortable></el-table-column>
        <el-table-column prop="state" label="登记状态"
          :filters="[{text: '登记完成', value: '登记完成'}, {text: '登记缺失', value: '登记缺失'},{text: '审核完成', value: '审核完成'}]"
          :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state == '审核完成' ? 'primary' : 'danger'" disable-transitions>{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="reviewCourse(scope.row)" type="primary">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--审核成绩部分-->
    <el-dialog :title="innertitle" :visible.sync="innerVisible" width="30%">
      <p></p>

      <el-select v-model="choose" placeholder="请选择一个指标点">
        <el-option v-for="item in indexdetail" :key="item.index_detail_id" :label="item.index_detail_id" :value="item.index_detail_id">
          <span style="float: left">{{ item.index_detail_id }}</span>
        </el-option>
      </el-select>

      <p></p>

      <div id="myChart" :style="{width: '350px', height: '300px'}"></div>
      <p>平均分：{{avg}}</p>
      <p>最高分：{{max}}</p>
      <p>最低分：{{min}}</p>
      <p></p>
      <el-button v-on:click="reviewScore($event)" type="success" id="pass" value="审核通过">审核通过</el-button>
      <el-button @click="informVisible = true" type="danger" id="fail" value="审核失败">撤销审核</el-button>
    </el-dialog>

    <el-dialog title="通知" :visible.sync="informVisible" width="30%">
      <p>输入通知教授这门课教授的消息</p>
      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 10}" v-model="textarea" />
      <p></p>
      <el-button v-on:click="reviewScore($event)" type="success" id="" value="撤销审核">撤销审核</el-button>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        total: 0,
        pagesize: 4,
        currentPage: 1,
        reviewData:[],

        // outer对话框属性
        outerVisible:false,
        classData:[],
        outertitle:'',
        // 记录选中的课程
        selectCourse:'',
        // 记录选中课程的cno,后面传参
        selectCno:'',

        // inter对话框属性
        innerVisible:false,
        innertitle:'',
        indexdetail:[],
        choose: "",

        selectClass:'',

        avg: 0,
        min: 0,
        max: 0,

        informVisible:false,
        textarea: "",
      }
    },
    methods:{
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      filterTag(value, row) {
        return row.state === value;
      },
      checkCourse(row){
        // 记录选中的课程
        this.selectCourse = row.cname
        this.outertitle = "审核 [" + row.cname + "] 的成绩";
        this.outerVisible = true;
        let param = new URLSearchParams();
        // 获取tno数据
        param.append("cno", row.cno);
        this.$api.postData('/com/classOfcourse', param)
        .then(res => {
          this.classData = res;
          this.total = res.length;
        })
        .catch(err => {
          console.log(err);
        });
      },
      reviewCourse(row){
        // 记录班级,图表要用
        this.selectClass = row.class_name;
        if (row.state == "登记缺失") {
          // this.innerVisible = false;
          this.$notify.error({
            title: '错误',
            message: '登记缺失不可审核！'
          });
        } else {
          this.innerVisible = true;
          this.innertitle = "审核[" + row.class_name + "]班级在[" + this.selectCourse + "]";
          // 获得指标点
          let param = new URLSearchParams();
          // 获取cno数据
          param.append("cno", this.selectCno);
          this.$api.postData('/com/courseIndexDetail', param)
          .then(res => {
            this.indexdetail = res;
            this.total = res.length;
          })
          .catch(err => {
            console.log(err);
          });
          // 绘制图表
          let chartparam = new URLSearchParams();
           // CAApi.getCourseReview(this.index[0].index_detail_id, row.classno, this.pageTag).then(res => {
          //   this.avg = res.avg
          //   this.max = res.max
          //   this.min = res.min
          //   var xdata = []
          //   var ydata = res.ydata
          //   this.drawLine(xdata, ydata)
          // })
          param.append("index_detail_id", this.indexdetail[0].index_detail_id);
          param.append("classno", row.claaano, this.selectCno);
          this.$api.postData('/com/courseIndexDetail', param)
          .then(res => {
            this.indexdetail = res;
            this.total = res.length;
          })
          .catch(err => {
            console.log(err);
          });
        }
      },
      drawLine(xdata, ydata) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: this.selectClass + '班学生成绩分布'
          },
          tooltip: {},
          xAxis: {
            data: xdata
          },
          yAxis: {},
          series: [{
            name: '分数',
            type: 'bar',
            data: ydata
          }]
        });
      },
    },
    created(){
      // 获取token;数据sno=111&spassword=333
      const token = sessionStorage.getItem('token');
      // 构造URL 的查询字符串对象
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      // 获取tno数据
      param.append("tno", searchtoken.get("tno"));
      this.$api.postData('/com/courselist', param)
      .then(res => {
        this.reviewData = res;
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
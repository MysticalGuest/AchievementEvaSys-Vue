<template>
  <div class="center">
    <div class="transition-box" style="background-color: #CC5A5A;">课程平均分</div>

    <el-select v-model="value" placeholder="请选择一个指标点">
     <el-option v-for="item in indexdetail" :key="item.index_detail_id" :value="item.index_detail_id">
       <span style="float: left">{{ item.index_detail_id }}</span>
     </el-option>
    </el-select>
    <p>返回该指标点下每门课的平均值</p>
    <p></p>

    <el-table ref="filterTable" :data="tableData.slice((currentPage-1) * pagesize, currentPage * pagesize)" style="width: 100%">
      <el-table-column prop="cno" label="课程id" sortable column-key="courseId">
      </el-table-column>
      <el-table-column prop="cname" label="课程名">
      </el-table-column>
      <el-table-column prop="score" label="平均分">
      </el-table-column>
    </el-table>
    <div style="margin: 0 auto;margin-top: 30px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
      </el-pagination>
    </div>

    <hr/>
    <div class="transition-box" style="background-color: #CC5A5A;">班级平均个人评价值</div>
    <p>计算公式：(∑某个班每个同学个人评价值)/这个班人数</p>
    <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
    <hr/>
    <div class="transition-box" style="background-color: #CC5A5A;">年级个人毕业评价值</div>
    <p>计算公式：(∑全年级每个同学个人评价值)/全年级人数</p>
    <el-progress type="circle" v-model="percentage" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        total: 0,
        currentPage: 1,
        pagesize: 4,
        tableData: [], //存课程
        percentage:0,
        value:'',
        indexdetail:[],
      }
    },
    methods:{
      current_change(currentPage) {
        this.currentPage = currentPage
      }
    },
    created() {
      // 获取所有指标点
      this.$api.postData('/mam/getAllIndexDetail','')
      .then(res => {
        this.indexdetail = res;
      })
      .catch(err => {
        console.log(err);
      });
      // 获取整个年级个人评价值平均分
      this.$api.postData('/mam/getAvg','')
      .then(res => {
        console.log("d000"+res.avg);
        this.percentage = res.avg;
      })
      .catch(err => {
        console.log(err);
      });
    },
  }
</script>

<style>
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
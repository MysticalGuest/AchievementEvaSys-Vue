<template>
  <div>
    <myheader :name="name"
              :index1="index1" :index2="index2" :index3="index3" :index4="index4"
              :route1="route1" :route2="route2" :route3="route3"></myheader>
    <myside :name="name" :department="stuclass"></myside>
    <!-- <mycenter></mycenter> -->
    <!-- 路由匹配到的组件将显示在这里 -->
    <router-view />
  </div>
</template>

<script>
  import Vue from 'vue';
  import api from '@/api/api.js';
  Vue.prototype.$api = api;

  import myheader from '../common/header.vue'

  import myside from '../common/side.vue'

  export default {
  	data() {
  		return {
  			name: "",
        route1: "",
        index1: "",
        route2: "",
        index2: "",
        route3: "",
        index3: "",
        index4: "退出系统",
        stuclass: ""
  		}
  	},
  	components: {
  		myheader,
      myside
  	},
  	methods: {
  	},
  	created() {
      const token = sessionStorage.getItem('token');
      console.log("token:::"+token);
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      param.append("sno", searchtoken.get("sno"));
      this.$api.postData('/stu/interface',param)
      .then(res => {
        console.log("stuinterfaceres::::"+res.route1);
        this.name = res.name;
        this.stuclass=res.stuclass;
        this.route1 = res.route1;
        this.index1 = res.index1;
        this.route2 = res.route2;
        this.index2 = res.index2;
        this.route3 = res.route3;
        this.index3 = res.index3;
      })
      .catch(err => {
        console.log(err);
      });


  	}
  }
</script>

<style>
  .center {
    position: relative;
    margin:0 auto;
    padding: 20px;
    top: 100px;
    border: 1px solid rgba(133,153,171,0.2);
    -webkit-box-shadow: 0 2px 26px 0 rgba(133,153,171,0.1);
    box-shadow: 0 2px 26px 0 rgba(133,153,171,0.1);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: #fff;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    /* margin-bottom: 20px; */
    width: 600px;
    text-align:center;
  }
</style>

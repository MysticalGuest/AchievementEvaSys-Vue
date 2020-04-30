<template>
  <div>
    <myheader :name="name" :role="role"
              :index1="index1" :index2="index2" :index3="index3" :index4="index4"
              :route1="route1" :route2="route2" :route3="route3"></myheader>
    <myside :name="name" :department="department" :visible="visible"></myside>
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
        role: "",
        route1: "",
        index1: "",
        route2: "",
        index2: "",
        route3: "",
        index3: "",
        index4: "退出系统",
        department: "",
        // 右side可见性
        visible: true
  		}
  	},
  	components: {
  		myheader,
      myside
  	},
  	methods: {
      // 拦截路由访问页面方式
      specifyRouteIntercept(){
        // 正则匹配
        var pattern = /\/[\w+]+\/+[\w+]/;
        console.log(pattern.test(this.$route.path));
        console.log("router!!!:"+this.$route.path);
        if(!pattern.test(this.$route.path)){   //正则匹配url:'/stu'和'/stu/'等,给后台报404
          this.$router.replace({
            name: 'page404',
            query: {
                redirect: this.$router.currentRoute.fullPath
            }
          })
        }
      },
      // 指定页面隐藏右side
      hideRightSide(path){
        // 指定页面隐藏右side  path=='/tea/manageeva'
        if(path=='/tea/courseinfo'){
          console.log("++++----");
          this.visible = false;
        }
        else{
          this.visible = true;
        }
      }
  	},
  	created() {
      // 获得oken
      const token = sessionStorage.getItem('token');
      // 构建URLSearchParamsd对象
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      // 动态路由
      let url="";
      if(searchtoken.get("role")=="student"){
        // 获取sno值
        param.append("sno", searchtoken.get("sno"));
        url = "/stu/interface";
      }
      else if(searchtoken.get("role")=="teacher"){
        // 获取tno值
        param.append("tno", searchtoken.get("tno"));
        url = "/tea/interface";
      }
      this.$api.postData(url,param)
      .then(res => {
        this.name = res.name;
        this.role = res.role;
        this.department=res.department;
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

      // 拦截路由访问页面方式
      this.specifyRouteIntercept();

      // 指定页面隐藏右side
      this.hideRightSide(this.$route.path);


  	},
    // 监听,当路由发生变化的时候执行
    watch: {
      $route: {
        handler: function(val, oldVal){
          // 拦截路由访问页面方式
          this.specifyRouteIntercept();

          // 指定页面隐藏右side
          this.hideRightSide(this.$route.path);
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>

<style>
  .center {
    position: relative;
    margin:0 auto;
    padding: 15px;
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
    width: 600px;
    text-align:center;
  }
</style>

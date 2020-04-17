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
  import myheader from '../common/header.vue'

  import myside from '../common/side.vue'
  import '@/assets/css/style-side.css'

  // import mycenter from '../common/center.vue'

  export default {
  	data() {
  		return {
  			name: "肖梦杰",
        route1: "courseinfo",
        index1: "课程信息",
        route2: "warning",
        index2: "预警通知",
        route3: "modifyinfor",
        index3: "修改信息",
        index4: "退出系统",
        stuclass: "软件工程"
  		}
  	},
  	components: {
  		myheader,
      myside
  	},
  	methods: {
  		// getInfo() {
  		// 	TeacherApi.getInfo(3).then(res => {
  		// 		this.$store.commit('modify', res.id)
  		// 		this.name = res.name
  		// 		this.id = res.id
  		// 	})
  		// }
  	},
  	created() {
  		// this.getInfo()
  	}
  }
</script>

<style>
  .center {
    position: relative;
    margin:0 auto;
    padding: 20px;
    top: 50px;
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

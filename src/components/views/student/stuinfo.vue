<template>
  <!-- center -->
  <div class="center">
  	<div class="post__head">
  		<a href="#" class="post__head-img">
  			<img src="@/assets/img/user_black.png" alt="">
  		</a>
  		<div class="post__head-title">
  			<h5>姓名：{{name}}</h5>
  			<p>学号：{{sno}}</p>
  		</div>
  	</div>

  	<div class="post__wrap">
  		<div class="post__company">
  			<i class="icon ion-ios-briefcase"></i>
  			<span>学院：{{academy}}</span>
  		</div>
  	</div>

  	<h2 class="post__title">基本信息</h2>

  	<div class="post__options">
  		<span>身份证号：</span>
  		<p>{{IDnum}}</p>
      <span>出生日期:</span>
      <p>{{birth}}</p>
      <span>民族：</span>
      <p>{{nation}}</p>
  	</div>
    <div class="post__options">
    	<span>政治面貌：</span>
    	<p>中国共产主义青年团团员</p>
      <span>生源地：</span>
      <p>湖北</p>
      <span>学生类别：</span>
      <p>普通本科生</p>
    </div>
    <div class="post__options">
    	<span>电子邮箱：</span>
    	<p>融入</p>
      <span>家庭地址：</span>
      <p>融入</p>
      <span>手机号码：</span>
      <p>融入</p>
    </div>

  	<div class="post__description">
  		<!-- <p>房鼎益老师于第18周星期一第5-6节在3210上的计算机网络课程调课到由尹小燕老师在第18周星期五第5-6节3206上课</p> -->
  		<a href="#">更多</a>
  	</div>

  	<div class="post__tags">
  		<a href="#">HTML</a>
  		<a href="#">CSS</a>
  		<a href="#">PHP</a>
  	</div>

  	<div class="post__stats">
  		<div>
  			<a class="post__likes" href="#"><i class="icon ion-ios-heart"></i><span>15</span></a>
  			<a class="post__comments" data-toggle="collapse" href="#collapse1" role="button" aria-expanded="false" aria-controls="collapse1"><i class="icon ion-ios-text"></i><span>0</span></a>
  		</div>

  		<div class="post__views">
  			<i class="icon ion-ios-eye"></i><span>班级：{{classnum}}班</span>
  		</div>
  	</div>
  </div>

  <!-- end center -->
</template>

<script>
  import '@/assets/css/style-center.css'

  export default {
    data() {
      return {
        sno:'',
        name:'',
        stuclass:'',
        academy:''
      }
    },
    methods: {

    },
    created() {
      const token = sessionStorage.getItem('token');
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      param.append("sno", searchtoken.get("sno"));
      this.$api.postData('/stu/info',param)
      .then(res => {
        console.log("stuinfo::::"+res);
        this.sno=res.sno;
        this.name = res.name;
        this.stuclass=res.stuclass;
        this.academy=res.academy;
      })
      .catch(err => {
        console.log(err);
      });
    },
    mounted(){
        console.log("rrrrr");
        // console.log("9999"+this.store.token);
    }
  }
</script>

<style>
</style>

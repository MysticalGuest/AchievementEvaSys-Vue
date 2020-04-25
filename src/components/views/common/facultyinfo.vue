<template>
  <div class="center">
  	<div class="post__head">
  		<a href="#" class="post__head-img">
  			<img src="@/assets/img/user_black.png" alt="">
  		</a>
  		<div class="post__head-title">
  			<h5>姓名：{{name}}</h5>
  			<!-- <p>学号：{{sno}}</p> -->
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
  		<span>身份证号</span>
  		<p>{{IDnum}}</p>
      <span>出生日期</span>
      <p>{{birth}}</p>
      <span>民族</span>
      <p>{{nation}}</p>
  	</div>
    <div class="post__options">
    	<span>政治面貌</span>
    	<p>{{political}}</p>
      <span>籍贯</span>
      <p>{{origin}}</p>
      <span>学位</span>
      <p>{{degree}}</p>
    </div>
    <div class="post__options">
    	<span>电子邮箱</span>
    	<p>{{email}}</p>
      <span>家庭地址</span>
      <p>{{address}}</p>
      <span>手机号码</span>
      <p>{{phone}}</p>
    </div>

  	<div class="post__description">
  		<!-- <p>房鼎益老师于第18周星期一第5-6节在3210上的计算机网络课程调课到由尹小燕老师在第18周星期五第5-6节3206上课</p> -->
  		<a href="#">更多</a>
  	</div>

  	<div class="post__tags">
  		<a href="#">学籍信息</a>
  		<a href="#">奖惩信息</a>
  		<a href="#">成绩信息</a>
  	</div>

  	<div class="post__stats">
  		<div>
  			<a class="post__likes" href="#"><i class="icon ion-ios-heart"></i><span>15</span></a>
  			<a class="post__comments" data-toggle="collapse" href="#collapse1" role="button" aria-expanded="false" aria-controls="collapse1"><i class="icon ion-ios-text"></i><span>0</span></a>
  		</div>

  		<div class="post__views">
  			<i class="icon ion-ios-eye"></i><span>办公室：院楼{{officenum}}</span>
  		</div>
  	</div>
  </div>
</template>

<script>
  import '@/assets/css/style-center.css'

  export default {
    data() {
      return {
        // sno:'',
        name:'',
        department:'',
        academy:'',
        officenum:'',
        IDnum:'',
        birth:'',
        nation:'',
        political:'',
        origin:'',
        scategory:'',
        email:'',
        address:'',
        phone:'',
        classnum:''
      }
    },
    created() {
      // 获取token;数据sno=111&spassword=333
      const token = sessionStorage.getItem('token');
      // 构造URL 的查询字符串对象
      const searchtoken = new URLSearchParams(token);
      let param = new URLSearchParams();
      // 获取sno数据
      param.append("tno", searchtoken.get("tno"));
      this.$api.postData('/tea/info',param)
      .then(res => {
        this.sno=res.sno;
        this.name = res.name;
        this.department = res.department;
        this.academy = res.academy;
        this.officenum = res.officenum;
        this.IDnum = res.IDnum;
        this.birth = res.birth;
        this.nation = res.nation;
        this.political = res.political;
        this.origin = res.origin;
        this.degree = res.degree;
        this.email = res.email;
        this.address = res.address;
        this.phone = res.phone;
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
</script>

<style>
</style>

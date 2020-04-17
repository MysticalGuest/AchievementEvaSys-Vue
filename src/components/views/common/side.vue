<template>
  <div class="side">
    <!-- user -->
    <div class="user">
    	<div class="user__head">
    		<div class="user__img">
    			<img src="@/assets/img/user_black.png" alt="">
    		</div>
    	</div>
    	<div class="user__title">
    		<h2>{{name}}</h2>
    		<p>{{department}}</p>
    	</div>
    	<div class="user__btns">
    		<a href="#" class="user__btn user__btn--blue"><span>课表</span></a>
    		<a href="#" class="user__btn user__btn--orange"><span>成绩</span></a>
    	</div>
    	<ul class="user__stats">
    		<li>
    			<p>排名</p>
    			<span>26</span>
    		</li>
    		<li>
    			<p>年级</p>
    			<span>2017</span>
    		</li>
    	</ul>
    </div>
    <!-- end user -->

    <!-- sidebox -->
    <div class="sidebox sidebox--desk">
    	<h4 class="sidebox__title">消息</h4>
    	<div class="sidebox__content">
    		<div class="sidebox__job">
    			<div class="sidebox__job-title">
    				<a href="#">调课体醒</a>
    				<span>2019-12-17 15:44:52</span>
    			</div>
    			<p class="sidebox__job-description">
            房鼎益老师于第18周星期一第5-6节在3210上的计算机网络课程调课到由尹小燕老师在第18周星期五第5-6节3206上课，请各位同学相互告知！
    			</p>
    		</div>

    		<div class="sidebox__job">
    			<div class="sidebox__job-title">
    				<a href="#">调课体醒</a>
    				<span>2019-12-17 15:44:52</span>
    			</div>
    			<p class="sidebox__job-description">
            房鼎益老师于第18周星期一第5-6节在3210上的计算机网络课程调课到由尹小燕老师在第18周星期五第5-6节3206上课
    			</p>
    		</div>

    		<div class="sidebox__job">
    			<div class="sidebox__job-title">
    				<a href="#">调课体醒</a>
    				<span>2019-12-10 15:44:52</span>
    			</div>
    			<p class="sidebox__job-description">
            房鼎益老师于第18周星期一第5-6节在3210上的计算机网络课程调课到由尹小燕老师在第18周星期五第5-6节3206上课
    			</p>
    		</div>
    	</div>
    	<a href="#" class="sidebox__more">View more</a>
    </div>
    <!-- end sidebox -->
  </div>

</template>

<script>
  export default {
  	props: ["name", "department"]
  }
</script>

<style>
</style>

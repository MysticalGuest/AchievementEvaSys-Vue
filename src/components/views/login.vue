<template>
  <div id="login_vue">
    <div class="title">
      <h1 class="theme">毕业要求达成度评价系统</h1>
    </div>
    <div class="login_warp">
      <div class="loginbox fl">
        <div class="login_header">
          <span @click="cur=0" :class="{active:cur==0}">学生登录</span>
          <span @click="cur=1" :class="{active:cur==1}">教师登录</span>
        </div>
        <div class="login_content">
          <div v-show="cur==0" class="Cbody_item">
            <form v-on:submit.prevent="loginValidate">
              <div class="form_item"><input type="text" ref="input_sno" name="sno" v-bind:class="isActive?'sno':'sno change'" placeholder="学号" autocomplete="off"></div>
              <div class="form_item"><input type="password" ref="input_spassword" name="spassword" v-bind:class="isActive?'spassword':'spassword change'" placeholder="密码"></div>
              <div class="form_item">
                <div class="fl"><input type="checkbox">记住密码</div>
                <div class="fr"><a href="javascript:;">找回密码</a></div>
              </div>
              <div class="clear"></div>
              <div class="form_item">
                <input type="submit" name="" value="登录">
              </div>
            </form>

          </div>
          <div v-show="cur==1" class="Cbody_item">
            <div class="form_item"><input type="text" name="tno" placeholder="教工号" autocomplete="off"></div>
            <div class="form_item"><input type="password" name="tpassword" placeholder="密码"></div>
            <div class="form_item">
            </div>
            <div class="clear"></div>
            <div class="form_item">
              <input type="submit" name="" value="登录">
            </div>

          </div>
        </div>
      </div>
      <div class="loginrslider fl">
        <img src="@/assets/img/dbg.png" />
      </div>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue';
	import api from '@/api/api.js';
  //自己写的样式
  import '@/assets/css/style-login.css'
  Vue.prototype.$api = api;
	export default {
		name:"login_vue",
		data(){
			return {
				cur:0, //默认选中第一个tab
				sno:"0",
				spassword:"0",
				booldata:"",
				isActive:true,
			}
		},
		created(){
			// this.loginValidate("first");	// 在页面渲染完成即加载
		},
		methods:{
			loginValidate(flag){
				if(flag!="first"){
					this.sno = this.$refs.input_sno.value;
					this.spassword = this.$refs.input_spassword.value;
					if(this.sno==""){
						this.$refs.input_sno.placeholder="请输入学号！";
						this.isActive = false;
						return false;
					}
					if(this.spassword==""){
						this.$refs.input_spassword.placeholder="请输入密码！";
						this.isActive = false;
						return false;
					}

				}
				let param = new URLSearchParams();
				param.append("sno", this.sno);
				param.append("spassword", this.spassword);
				this.$api.postData('/login/',param)
				.then(response => {
					this.booldata = response;
					if(response=="True"){
						this.$router.push({ path: '/stuinterface'});
						const sessionSno = this.sno;
						sessionStorage.setItem('sno', sessionSno);
					}
					else if(response=="False"){
						this.$refs.input_spassword.value = "";
						this.$refs.input_spassword.placeholder='密码错误！';
						this.isActive = false;
					}
				});
			}
		},
		// 组件内路由--进入组件时
		beforeRouteEnter(to, form, next){
			window.document.body.className="login_body"
			next();
		},
		beforeRouteLeave(to, form, next){
			window.document.body.className="";
			next();
		}
	}

</script>

<style>
	.login_body {
		background-image: url('../../assets/img/mainBg.jpg');
		filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/img/mainBg.jpg', sizingMethod='scale');
		background-position: right bottom;
		background-attachment: fixed;
		background-repeat: no-repeat;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
		background-size: cover;

	}
</style>

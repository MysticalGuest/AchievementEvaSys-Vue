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
            <form v-on:submit.prevent="loginValidate(cur)">
              <div class="form_item"><input type="text" ref="input_sno" name="sno" v-bind:class="stuisActive?'sno':'sno change'" placeholder="学号" autocomplete="off"></div>
              <div class="form_item"><input type="password" ref="input_spassword" name="spassword" v-bind:class="stuisActive?'spassword':'spassword change'" placeholder="密码"></div>
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
            <form v-on:submit.prevent="loginValidate(cur)">
              <div class="form_item"><input type="text" ref="input_tno" name="tno" v-bind:class="teaisActive?'tno':'tno change'" placeholder="教工号" autocomplete="off"></div>
              <div class="form_item"><input type="password" ref="input_tpassword" name="tpassword" v-bind:class="teaisActive?'spassword':'spassword change'" placeholder="密码"></div>
              <div class="form_item">
              </div>
              <div class="clear"></div>
              <div class="form_item">
                <input type="submit" name="" value="登录">
              </div>
            </form>
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
  Vue.prototype.$api = api;

  //自己写的样式
  import '@/assets/css/style-login.css'

	export default {
		name:"login_vue",
		data(){
			return {
				cur:0, //默认选中第一个tab
				sno:"",
				spassword:"",
				stuisActive:true,
        teaisActive:true,
			}
		},
		created(){
			// this.loginValidate("first");	// 在页面渲染完成即加载
		},
		methods:{
      // flag即为this.cur值,用来识别入口Tab
			loginValidate(flag){
        console.log("flag:"+flag);
        let param = new URLSearchParams();
				if(flag==0){  // 学生登录入口
					this.sno = this.$refs.input_sno.value;
					this.spassword = this.$refs.input_spassword.value;
					if(this.sno==""){
						this.$refs.input_sno.placeholder="请输入学号！";
						this.stuisActive = false;
						return false;
					}
					if(this.spassword==""){
						this.$refs.input_spassword.placeholder="请输入密码！";
						this.stuisActive = false;
						return false;
					}
          param.append("sno", this.sno);
          param.append("spassword", this.spassword);
				}
        else if(flag==1){   // 教工登录入口
          this.tno = this.$refs.input_tno.value;
          this.tpassword = this.$refs.input_tpassword.value;
          if(this.tno==""){
          	this.$refs.input_tno.placeholder="请输入教工号！";
          	this.teaisActive = false;
          	return false;
          }
          if(this.tpassword==""){
          	this.$refs.input_tpassword.placeholder="请输入密码！";
          	this.teaisActive = false;
          	return false;
          }
          param.append("tno", this.tno);
          param.append("tpassword", this.tpassword);
        }

        this.$api.postData('/login',param)
				.then(response => {
          console.log("response:"+response);
					if(response=="student"){              // 学生
						this.$router.push({ path: '/stu/interface'});
            //将用户token保存到vuex中
            this.$store.commit('changeLogin',{token: param });
					}
          else if(response=="teacher"){         // 教师
            this.$router.push({ path: '/tea/interface'});
            this.$store.commit('changeLogin',{token: param });
          }
          else if(response=="coursemanager"){   // 课程负责人
            this.$router.push({ path: '/com/interface'});
            this.$store.commit('changeLogin',{token: param });
          }
          else if(response=="majormanager"){    // 专业负责人
            this.$router.push({ path: '/mam/interface'});
            this.$store.commit('changeLogin',{token: param });
          }
          else if(response=="tutor"){           // 导员
            this.$router.push({ path: '/tor/interface'});
            this.$store.commit('changeLogin',{token: param });
          }
					else if(response==false){
            console.log("curafter:"+flag);
            if(flag == 0){        // 学生入口
              this.$refs.input_spassword.value = "";
              this.$refs.input_spassword.placeholder='密码错误！';
              this.stuisActive = false;
            }
						else if(flag == 1){  // 教工入口
						  this.$refs.input_tpassword.value = "";
						  this.$refs.input_tpassword.placeholder='密码错误！';
						  this.teaisActive = false;
						}
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

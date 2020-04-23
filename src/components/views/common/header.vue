<template>
  <header class="header" id="myheader">
    <div class="header__content">
      <!-- header logo -->
      <a href="#" class="header__logo">
        <img src="@/assets/img/achieve.png" alt="">
        <h1>毕业管理系统</h1>
      </a>
      
      <!-- end header logo -->

      <!-- header nav -->
      <ul class="header__nav">
        <li class="header__nav-item">
          <router-link to="interface" class="header__nav-link">首页</router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:route1}" class="header__nav-link">{{index1}}</router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:route2}" class="header__nav-link">{{index2}}</router-link>
        </li>
        <li class="header__nav-item">
          <router-link :to="{path:route3}" class="header__nav-link">{{index3}}</router-link>
        </li>
        <li class="header__nav-item">
          <a href="javascript:void(0)" class="header__nav-link" @click="logout()">{{index4}}</a>
        </li>
      </ul>
      <!-- end header nav -->

      <!-- header search -->
      <form action="#" class="header__search">
        <input class="header__search-input" type="text" placeholder="Search...">
        <a class="header__search-button" type="button">
          <!-- <span class="glyphicon glyphicon-search"></span> -->
        </a>
      </form>
      <!-- end header search -->
      <div class="header__profile">
        <a class="dropdown-toggle header__profile-btn" href="#" role="button" id="dropdownMenuProfile" aria-haspopup="true" aria-expanded="false">
          <img src="@/assets/img/user.png" alt="">
          <span>{{name}}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
  import '@/assets/css/style-header.css'

  export default {
    name:"myheader",
    props: ["name", "index1", "index2", "index3","index4", "route1", "route2", "route3"],
    data() {
    	return {
        // getroute1:
    	}
    },
  	methods: {
  		logout(){
        // 从sessionStorage删除所有保存的数据
        sessionStorage.clear();
        this.$router.push({ path: '/login'});
      }
  	}
  }
</script>

<style>
</style>

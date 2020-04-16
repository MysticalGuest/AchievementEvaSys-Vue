<template>
  <header class="header">
  	<div class="container">
  		<div class="row">
  			<div class="col-7 col-md-9 col-lg-8 col-xl-9">
  				<div class="header__content">
  					<!-- header logo -->
  					<a href="#" class="header__logo">
  						<img src="@/assets/img/logo1.svg" alt="">
  					</a>
  					<!-- end header logo -->

  					<!-- header nav -->
  					<ul class="header__nav">
  						<li class="header__nav-item">
  							<a href="#" class="header__nav-link">首页</a>
  						</li>
  						<li class="header__nav-item">
  							<a href="#" class="header__nav-link">成绩</a>
  						</li>
  						<li class="header__nav-item">
  							<a href="#" class="header__nav-link">页面</a>
  						</li>
  						<li class="header__nav-item">
  							<a href="#" class="header__nav-link">页面</a>
  						</li>
  						<li class="header__nav-item">
  							<a href="#" class="header__nav-link">页面</a>
  						</li>
  					</ul>
  					<!-- end header nav -->

  					<!-- header search -->
  					<form action="#" class="header__search">
  						<input class="header__search-input" type="text" placeholder="Search...">
  						<a class="header__search-button" type="button">
  							<span class="glyphicon glyphicon-search"></span>
  						</a>
  					</form>
  					<!-- end header search -->
  				</div>
  			</div>

  			<div class="col-5 col-md-3 col-lg-4 col-xl-3">
  				<div class="header__content header__content_end">
  					<div class="header__profile">
  						<a class="dropdown-toggle header__profile-btn" href="#" role="button" id="dropdownMenuProfile" aria-haspopup="true" aria-expanded="false">
  							<img src="@/assets/img/user.png" alt="">
  							<span>{{name}}</span>
  						</a>
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  </header>
</template>

<script>
  export default {
  	props: ["name"],

  	methods: {
  		handleOpen(key, keyPath) {
  			console.log(key, keyPath);
  		},
  		handleClose(key, keyPath) {
  			console.log(key, keyPath);
  		}
  	}
  }
</script>

<style>
</style>

<template>
  <header :name="name">87878</header>
</template>

<script>
  import header from '../common/header.vue'
  import '@/assets/css/style-header.css'

  export default {
  	data() {
  		return {
  			name: "肖梦杰"
  		}
  	},
  	components: {
  		header
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
</style>

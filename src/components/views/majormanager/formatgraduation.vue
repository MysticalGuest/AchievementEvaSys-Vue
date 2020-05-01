<template>
  <div class="center">
    12345
    <el-row>
      <drag-verify
      ref="dragVerify"
      :isPassing.sync="isPassing2"
      text="请按住滑块拖动"
      successText="验证通过"
      handlerIcon="el-icon-d-arrow-right"
      successIcon="el-icon-circle-check"
      >
    </drag-verify>
    </el-row>
    
  </div>
</template>

<script>
  // 基本滑块验证组件
  import dragVerify from "@/components/views/common/dragVerify";
  export default {
    components:{
      dragVerify
    }
  }
</script>

<style>

</style>
<template>
    <div class="web">
        333333333333333
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'web',
    components: {
        
    }
}
</script>

<style lang='scss' scoped>
  body {
    font-size:0.28rem;/*设置主体的字体大小*/
  }
  #app {
   .web {
    color:red;  /*scss的语法*/
   }
  }
</style>
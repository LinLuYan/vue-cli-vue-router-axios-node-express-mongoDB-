<template>
  <div id="app">
     <div class="main">
       <router-view></router-view>
     </div>
  </div>
</template>

<script>
//import Hello from './components/Hello'
export default {
    name: 'app',
    components: {
        //Hello
    }
}
</script>

<style>
body {font-family: 'Helvetica Neue','Hiragino Sans GB','WenQuanYi Micro Hei','Microsoft Yahei',sans-serif;font-size: 12px;} 
body,p,ul,li {padding: 0px; margin: 0px; } 
ul li {list-style: none; } 
*:focus {outline: 0 !important; } 
.h1, .h2, .h3, .h4, .h5, .h6 {margin: 0; } 
a {color: #363f44; text-decoration: none; cursor: pointer; }
a:hover,
a:focus {color: #141719; text-decoration: none; } 
textarea {resize: none; -webkit-appearance: none; } 
</style>
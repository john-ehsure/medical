<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './scss/common.scss';
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    text-align: center;
    color: #333;
    font-size:14px;
    line-height:1.7;
    position: absolute;
    left:0px;
    top:0px;
    right:0px;
    bottom:0px;
    width:100%;
    height:100%;
  }
</style>

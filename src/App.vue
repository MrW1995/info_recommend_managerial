<template>
  <div id="app">
    <div class="header">
      <HeaderMenu></HeaderMenu>
    </div>
    <div class="main">
      <router-view/>
    </div>
    <div class="footer">
      <FooterBar></FooterBar>
    </div>
  </div>
</template>

<script>
  import FooterBar from './components/FooterBar/FooterBar'
  import HeaderMenu from './components/HeaderMenu/HeaderMenu'
  export default {
   components:{
     FooterBar,
     HeaderMenu
   }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  .header
    height 60px
  .main
    text-align center
    height 528px
  .footer
    height 42.1px
</style>

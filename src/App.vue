<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
  import axiosConfig from './api/config.js'
  import utils from './utils/utils.js'

  export default {
    name: 'app',
    created () {
      axiosConfig.config()
      utils.getWxConfig()
      utils.initTalkingData('7ED4436BCE714509BA556107BBFB5D9B','','1.0')
    }
  }
</script>

<style lang="less">
  @import './common/reset.less';
  @import './common/public';

  .font-size(@size){
    font-size: @size;
    line-height: @size;
  }
  #app{
    // height: 100%;
    z-index: 9;
    overflow-x: hidden;
    // overflow: hidden;
  }
  .tip-info-wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: .1rem .15rem;
    min-width: .9rem;
    color: #fff;
    border-radius: .1rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, .5);
    transform: translate3d(-50%, -50%, 0);
    z-index: 999;
  }
  #loading{
    position: fixed;
    top: 50%;
    left: 50%;
    @width: .18rem;
    width: @width;
    height: @width;
    background: url("@{image}new-loading.gif") no-repeat center / contain;
    transform: translate3d(-50%, -50%, 0);
    z-index: 999;
  }
  .fade-enter-active, .fade-leave-active{
    transition: @transition;
    // transform-origin: right bottom;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0;
    // transform: scale3d(0, 0, 0)
  }
</style>

<template>
  <div id="app">
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
    },
    mounted () {
    wx.ready(() => {
      utils.wxShare({
        title: '\u8499\u725b\u4e13\u5bb6\u5fae\u8bfe\u5802',
        desc: '\u6700\u5177\u4eb2\u548c\u529b\u7684\u533b\u751f\uff0c\u5206\u4eab\u6700\u5b9e\u7528\u7684\u77e5\u8bc6\uff0c\u8ba9\u4f60\u53d8\u6210\u6700\u7701\u5fc3\u7684\u5988\u5988\u3002',
        link: `${window.location.href}?share=1`,
        imgUrl: 'http://mn.dev.ziseyiliao.com/spa/share_image@2x.png',
        success () {
          this.shareShow && (this.shareShow = false)
        }
        })
      })
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
    z-index: 9;
    overflow-x: hidden;
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
    transition: all 0.5s ease     
  }
  .fade-enter, .fade-leave-active{
    opacity: 0
  }
</style>

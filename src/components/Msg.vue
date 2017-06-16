<template>
  <div class="message">
    <div class="content">
      <header class="message-hd">
        预约成功
      </header>
      <p class="message-bd">直播课程预约成功，课程开始30分钟前、5分钟前，您将受到微信公众号的参课提醒消息，请留意微信消息。</p>
      <p class="message-except">如果您觉得课程不错，欢迎邀请更多小伙伴跟您一起来听课哟  <span class="tip">(点击右上角分享) ~~</span></p>
      <div class="button" @click="hide">我知道了</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Msg',
    methods: {
      hide () {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../common/public.less';

  .message{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    &:before{
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .4);
    }
    .content{
      position: absolute;
      top: 50%;
      left: 50%;
      padding: .4rem .3rem .3rem;
      width: 3.15rem;
      border-radius: .12rem;
      border: 2px solid #99E7BA;
      box-sizing: border-box;
      background: #fff;
      transform: translate3d(-50%, -50%, 0);
      z-index: 2;
      .message-hd{
        color: #2D9B3D;
        .font-size(.2rem);
        text-align: center;
      }
      .message-bd, .message-except{
        line-height: .22rem;
      }
      .message-bd{
        margin: .19rem 0 .08rem;
      }
      .message-except{
        color: #999;
        .tip{
          color: #2D9B3D;
        }
      }
      .button{
        padding: .14rem 0;
        margin: .45rem auto 0;
        width: 1.56rem;
        color: #fff;
        text-align: center;
        .font-size(.2rem);
        font-weight: 600;
        background: url("@{imageUrl}button_green@3x.png") no-repeat center / contain;
      }
    }
  }
</style>

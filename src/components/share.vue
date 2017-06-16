<template>
  <div class="share">
    <p>点击右上角</p>
    <p>分享给好友</p>
    <p>邀请好友一起来看直播~</p>
  </div>
</template>
<script>
  export default {
    name: 'share'
  }
</script>
<style lang="less" scoped>
  @import '../common/public.less';

  .share{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: .9rem 0 0;
    color: #fff;
    text-align: center;
    .font-size(.20rem);
    line-height: .30rem;
    background: rgba(0, 0, 0, .7) url("@{imageUrl}share_path.png") no-repeat top .2rem right .3rem;
    background-size: .75rem .75rem;
  }
</style>

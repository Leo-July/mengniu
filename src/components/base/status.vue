<template>
  <header class="status" :class="{'live': parseInt(data) === 1}">{{ data | status}}</header>
</template>
<script>
  export default {
    name: 'status',
    props: {
      data: {
        type: Number,
        default: 0
      }
    },
    filters: {
      status (value) {
        return parseInt(value) === 0 ? '直播预告' : '正在直播'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/public.less';
  
  .status{
    padding: .05rem 0 .04rem;
    width: .78rem;
    .font-size(.12rem);
    text-align: center;
    color: #fff;
    border-radius: .21rem;
    background: #2D9B3D;
    &.live{
      background: #F8BA43;
      background-image: linear-gradient(to right, #F9DE5F, #F7982A);
    }
    &:before{
      @width: 4px;
      content: "";
      display: inline-block;
      margin-right: 2px;
      width: @width;
      height: @width;
      vertical-align: middle;
      border-radius: @width;
      background: #fff;
    }
  }
</style>

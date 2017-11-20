<template>
  <header v-if="time === 0" class="status" :class="{'live': parseInt(data) === 1}">{{ data | status }}</header>
  <header v-else class="status" :class="{'live': parseInt(data) === 1}">{{ data | status}}:  {{ time | week }}</header>
</template>

<script>
  export default {
    name: 'status',
    props: {
      data: {
        type: Number,
        default: 0
      },
      time: {
        type: Number,
        default: 0
      }
    },
    filters: {
      status (value) {
        return parseInt(value) === 0 ? '课程预告' : '正在直播'
      },
      week (value) {
        value = new Date (parseInt(value) * 1000)
        let week = ['日', '一', '二', '三', '四', '五', '六']
        console.log(value.getDay())
        return `${value.getMonth() + 1}月${value.getDate()}日周${week[value.getDay()]}`
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/public.less';
  
  .status{
    float: left;
    padding: .05rem .1rem .04rem;
    .font-size(.12rem);
    text-align: center;
    color: #fff;
    white-space: pre;
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

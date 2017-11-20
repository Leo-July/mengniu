<template>
  <h2 class="title">
    <img :src="imgUrl" class="text-img"></img>
  </h2>
</template>

<script>
export default {
  name: 'title',
  props: {
    imgUrl: {
      type: String,
      default: 'this title'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../common/public.less';

  .title{
    position: relative;
    margin: 0 .44rem .23rem;
    height: .3rem;
    text-align: center;
    background: url("@{imageUrlDep}title_bg@3x.png") no-repeat center / contain;
    z-index: 2;
    .text-img{
      width: 1.12rem;
    }
  }
</style>

<template>
  <h2 class="title">
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: 'title',
  props: {
    text: {
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
    .font-size(.28rem);
    font-weight: 500;
    text-align: center;
    color: #2D9B3D;
    background: url("@{imageUrlDep}title_bg@3x.png") no-repeat center / contain;
    z-index: 2;
  }
</style>

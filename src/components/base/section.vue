<template>
  <h3 class="section">
    {{ text }}
  </h3>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'section'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/public';
  
  .section{
    padding: .3rem 0 .15rem .32rem;
    margin-bottom: .15rem;
    color: #2D9B3D;
    .font-size(.16rem);
    font-weight: 500;
    border-bottom: 1px dashed #ccc;
    background: url("@{imageUrlDep}section_icon@3x.png") no-repeat left bottom .12rem;
    background-size: .23rem;
  }
</style>

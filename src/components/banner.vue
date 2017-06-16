<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide><img src="../assets/banner1@2x.png" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/banner2@2x.png" alt=""></swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'carrousel',
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          loop: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
          effect: 'fade',
          fade: {
            crossFade: false
          }
        }
      }
    }
  }
</script>
<style lang="less">
  .banner{
    // height: 2.84rem;
    overflow: hidden;
    .swiper-container{
      height: 100%;
      .swiper-pagination-bullets{
        .swiper-pagination-bullet{
          @width: .08rem;
          width: @width;
          height: @width;
          background: #fff!important;
          opacity: 1;
          &.swiper-pagination-bullet-active{
            background: #2D9B3D!important;
          }
        }
      }
    }
  }
</style>


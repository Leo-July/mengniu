<template>
  <div class="list">

    <!--往期视频-->
    <my-title v-if="videoData.length > 0" text="往期视频"></my-title>
    <ul class="past video-past">
      <list-item v-for="item in videoData" :data = "item" class="looked"></list-item>
    </ul>

    <!--音频回放-->
    <my-title v-if="audioData.length > 0" text="音频回放"></my-title>
    <ul class="past audio-past">
      <list-item v-for="item in audioData" :data = "item" class="listened"></list-item>
    </ul>
  </div>
</template>
<script>
  import ListItem from './base/ListItem.vue'
  import myTitle from './base/Title.vue'

  export default {
    name: 'list',
    props: {
      videoData: {
        type: Array,
        default () {
          return [{
            'link': '//baidu.com',
            'title': '格价米论力单党',
            'head': 'http://dummyimage.com/64x64',
            'name': 'cname',
            'professionTitle': '职称',
            'hospitalName': '医院',
            'startTime': '1978.12.05',
            'visited': 3726
          }]
        }
      },
      audioData: {
        type: Array,
        default () {
          return [{
            'link': '//baidu.com',
            'title': '格价米论力单党',
            'head': 'http://dummyimage.com/64x64',
            'name': 'cname',
            'professionTitle': '职称',
            'hospitalName': '医院',
            'startTime': '1978.12.05',
            'visited': 3726
          }]
        } }
    },
    components: {
      ListItem,
      myTitle
    }
  }
</script>
<style lang="less" scoped>  
  @import '../common/public.less';

  .list{
    position: relative;
    padding: .6rem 0 0;
    background: url("@{imageUrl}repeat_bg@2x.png") repeat-y center top 1.85rem / cover;
    &:before, &:after{
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    &:before{
      top: 0;
      height: 1.85rem;
      background: url("@{imageUrl}top_bg@2x.png")no-repeat center / cover;
      // background: red;
    }
    &:after{
      bottom: -1.45rem;
      height: 4.13rem;
      background: url("@{imageUrl}bottom_bg@2x.png")no-repeat center / cover;
    }
    .past{
      position: relative;
      z-index: 2;
    }
  }
</style>

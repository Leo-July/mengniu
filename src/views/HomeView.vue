<template>
  <div class="home">
    <!--banner-->
    <banner class="banner"></banner>

    <!--视频直播-->
    <video-live class="video-live"></video-live>

    <!--nav 标签-->
    <my-nav @setCurrent="setCurrent" :current="current"></my-nav>

    <!--往期视频/音频-->
    <my-list :videoData="videoData" :audioData="audioData"></my-list>

  </div>
</template>
<script>
  import promise from '../api/fetch.js'
  import banner from '../components/banner'
  import videoLive from '../components/VideoLive'
  import myNav from '../components/Nav'
  import myList from '../components/List'

  export default {
    name: 'home',
    // beforeRouteLeave (to, from, next) {
    //   this.loadFetch = true
    // },
    components: {
      banner,
      videoLive,
      myNav,
      myList
    },
    data () {
      return {
        // liveData: {}, // 视频直播数据
        videoData: [], // 标签视频列表数据
        audioData: [], // 标签音频列表数据
        current: -1 // 标签当前下标
      }
    },
    methods: {
      getListData (type, tag) {
        promise.fetch({
          // url: 'list',
          url: 'index.php?a=Course&m=getCourseList',
          // data: { type, tag }
          data: {type}
        }).then(res => {
          if (type === 0) {
            this.videoData = res.data.content
          } else {
            this.audioData = res.data.content
          }
        })
      },
      setCurrent (value) {
        this.current = value
        this.getListData(0)
        this.getListData(1)
      }
    },
    created () {
      // 标签视频列表请求接口
      let current = sessionStorage.getItem('current')
      this.current = current ? parseInt(current) : -1
      this.getListData()
      this.getListData()
    }
  }
</script>

<style lang="less" scoped>
  .home{
    background: #fff;
    .banner{
      position: relative;
      z-index: 3;
    }
    .video-live{
      margin-top: -.19rem;
    }
  }
</style>

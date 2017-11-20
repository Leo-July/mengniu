<template>
  <div class="home">
    <div>
      <!--banner-->
      <banner class="banner"></banner>

      <!--视频直播-->
      <video-live class="video-live"></video-live>

      <!--nav 标签-->
      <my-nav @setCurrent="setCurrent"></my-nav>

      <!--往期视频/音频-->
      <!-- <my-list :videoData="videoData" :audioData="audioData" @initBScroll="initBScroll"></my-list> -->
      <my-list :videoData="videoData" :audioData="audioData"></my-list>
    </div>


  </div>
</template>
<script>
  import promise from '../api/fetch.js'
  import banner from '../components/banner'
  import videoLive from '../components/VideoLive'
  import myNav from '../components/Nav'
  import myList from '../components/List'
  import utils from '@/utils/utils'

  export default {
    name: 'home',
    components: {
      banner,
      videoLive,
      myNav,
      myList
    },
    data () {
      return {
        videoData: [], // 标签视频列表数据
        audioData: [] // 标签音频列表数据
      }
    },
    methods: {
      getListData (opt) {
        promise.fetch({
          url: 'index.php?a=Course&m=getCourseList',
          data: opt
        }).then(res => {
          if (opt.type === 0) {
            this.videoData = res.data.content || []
          } else {
            this.audioData = res.data.content || []
          }
        })
      },
      setCurrent (value) {
        if(value !== '全部'){
          this.getListData({type: 0, tag: value})
          this.getListData({type: 1, tag: value})
        } else {
          this.getListData({type: 0})
          this.getListData({type: 1})
        }
      }
    },
    mounted () {
      utils.addEvent('首页到达')
      wx.ready(() => {
        let domain = utils.getDomain()
        utils.wxShare({
          title: '\u8499\u725b\u4e13\u5bb6\u5fae\u8bfe\u5802',
          desc: '\u6700\u5177\u4eb2\u548c\u529b\u7684\u533b\u751f\uff0c\u5206\u4eab\u6700\u5b9e\u7528\u7684\u77e5\u8bc6\uff0c\u8ba9\u4f60\u53d8\u6210\u6700\u7701\u5fc3\u7684\u5988\u5988\u3002',
          link: `${domain}/index.php?shared=1`,
          imgUrl: `${domain}/spa/mengniu/share_image@2x.png`,
          success () {
            utils.addEvent('分享成功')
          }
        })
      })
      console.log(this.$route.query.from)

      if (window.location.href.indexOf('shared=1')>-1) {
        utils.addEvent('分享页面到达（首页）')
        console.log('分享页面到达（首页）')
      }
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

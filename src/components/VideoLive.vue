<template>
  <div class="video-live">
    <div class="bg">
      <img :src="liveData.bgUrl" alt="">
    </div>
    <div class="inner">
      <!--标题-->
      <my-title text="视频直播"></my-title>
      <!--内容-->
      <div class="content">
        <a class="link" @click="jump">

          <div class="desc">
            <status :data="status" class="status"></status>
            <h3 class="title">“{{ liveData.title }}”</h3>
            <p v-if="liveData.startTime" class="date">{{ liveData.startTime | time}}</p>
            <p class="video-icon"></p>
          </div>

          <!--主讲人信息-->
          <div class="speaker">
            <figure class="portrait">
              <img :src="liveData.head" alt="">
            </figure>
            <div class="info">
              <p class="info-text">主讲人：{{ liveData.name }} {{ liveData.professionTitle }}</p>
              <p class="info-text">{{ liveData.hospitalName }} {{ liveData.departmentName }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import myTitle from './base/Title'
  import status from './base/status'
  import promise from '@/api/fetch'

  export default {
    name: 'videoLive',
    components: {
      myTitle,
      status
    },
    data () {
      return {
        status: 2, // 直播状态
        liveData: {}
      }
    },
    filters: {
      time (value) {
        value = new Date(parseInt(value) * 1000)
        return `${value.getFullYear()}.${value.getMonth() + 1}.${value.getDate()}`
      }
    },
    methods: {
      setStatus () {
        let now = new Date().getTime()
        if (now > this.liveData.startTime * 1000) {
          this.status = 1
        } else {
          this.status = 0
        }
      },
      jump () {
        let courseId = this.liveData.id
        if (parseInt(this.status) === 1) { // 视频直播状态，请求记录接口和跳链接
          promise.fetch({
            url: 'index.php?a=Course&m=lockCourse',
            data: {courseId}
          }).then(res => {
            (parseInt(res.data.code) === 1) && (location.href = this.liveData.link)
          }).catch(error => {
            console.log(error)
          })
        } else { // 视频预告状态 跳到预告详情
          this.$router.push({
            path: '/foreshow',
            query: {courseId}
          })
        }
      }
    },
    created () {
      // 视频直播/预告请求接口
      promise.fetch({
        // url: 'live'
        url: 'index.php?a=Course&m=getBanner'
      }).then(res => {
        this.liveData = res.data.content
        this.setStatus()
      }).catch(error => {
        console.log(error)
      })
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/public.less";

  .video-live{
    position: relative;
    background: rgba(0, 0, 0, .5);
    z-index: 2;
    .bg{
      position: absolute;
      top: 1.13rem;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      width: 3.07rem;
      height: 2.12rem;
      z-index: 1;
    }
    .inner{
      position: relative;
      padding: .5rem 0 0;
      height: 4.78rem;
      box-sizing: border-box;
      background: url(../assets/video_bg@2x.png) no-repeat center / cover;
      z-index: 2;
      .content{
        margin-top: .12rem;
        height: 3.27rem;
        color: #fff;
        text-align: center;
        .link{
          display: block;
          .desc{
            padding-top: .36rem;
            height: 2.2rem;
            box-sizing: border-box;
            .status{
              margin-left: .9rem;
            }
            .title{
              margin: .11rem .72rem 0;
              .font-size(.20rem);
              line-height: .24rem;
            }
            .date{
              margin: .03rem 0 .07em;
              .font-size(.14rem);
            }
            .video-icon{
              @width: .48rem;
              display: inline-block;
              width: @width;
              height: @width;
              border-radius: 50%;
              background: url("@{imageUrl}video_icon@3x.png")no-repeat center / cover;
            }
          }

          .speaker{
            display: flex;
            justify-content: center;
            margin: .3rem .4rem 0; 
            text-align: left;
            .portrait{
              @width: .36rem;
              margin-right: .08rem;
              flex: 0 0 @width;
              height: @width;
              border-radius: 50%;
              overflow: hidden;
            }
            .info{
              .font-size(.14rem);
              line-height: .18rem;
              .info-text{
                max-width: 2rem;
                .ignore(1);
              }
            }
          }
        }
      }
    }

  }
</style>

<template>
  <div class="foreshow">
    <!--分享弹层-->
    <transition name="fade">
      <my-share @click.native="setShareShow"></my-share>
    </transition>

    <div class="content">
      <!--banner-->
      <div class="banner">
        <figure class="bg">
          <img :src="data.bgUrl" alt="">
        </figure>
        <status class="status" :data="status"></status>
        <p class="title">{{ data.title }}</p>
      </div>

      <!--主要内容-->
      <div class="inner">
        <!--直播时间-->
        <div class="section">
          <my-section text="课程时间"></my-section>
          <p v-if="data.startTime" class="desc">{{ data.startTime | time}}</p>
        </div>
        <!--课程内容-->
        <div class="section">
          <my-section text="课程内容"></my-section>
          <p class="desc">{{ data.course }}</p>
        </div>

        <div class="section">
          <my-section text="主讲人"></my-section>
          <!--医生信息-->
          <div class="doctor-info">
            <figure class="portrait">
              <img :src="data.head" alt="">
            </figure>
            <div class="info">
              <p class="text"> <span class="name">{{ data.name }}</span> {{ data.professionTitle }}</p>
              <p class="text">{{ data.hospitalName }} {{ data.departmentName }}</p>
            </div>
          </div>
          <!--医生简介-->
          <div class="intro">
            <!--<p class="paragraph desc" v-for="item in data.intro">{{ item }}</p>-->
            <p class="paragraph desc">{{ data.intro }}</p>
          </div>
        </div>

        <div v-if="shared === 1" class="section code-wrapper">
          <figure class="code-image">
            <img src="../assets/codeImage@3x.png" alt="">
          </figure>
          <p class="tip">关注后可参与课程</p>
        </div>

      </div>
    </div>

    <!--分享 预约-->
    <footer v-if="shared === 0" class="footer" @touchmove.prevent="">
      <div class="footer-item share" @click="setShareShow">分享给好友</div>
      <div class="footer-item order" :class="{disabled: data.isSub}" @click="order">预约提醒</div>
    </footer>

    <!--预约成功弹层-->
    <transition name="fade">
      <msg v-if="MsgShow" @hide="MsgShow = false"></msg>
    </transition>

  </div>
</template>
<script>
  import status from '@/components/base/status'
  import utils from '@/utils/utils'
  import promise from '@/api/fetch.js'
  import mySection from '@/components/base/section'
  import Msg from '@/components/Msg'
  import myShare from '@/components/share'

  export default {
    name: 'foreshow',
    beforeRouteEnter (to, from, next) {
      let courseId = to.query.courseId
      let shared = parseInt(to.query.shared) || 0
      promise.fetch({
        // url: 'foreshow',
        url: 'index.php?a=Course&m=getCourseInfo',
        data: {courseId}
      }).then(res => {
        if (parseInt(res.data.code) === 1) {
          next(vm => {
            vm.data = res.data.content
            vm.shared = shared
            utils.setTitle('课程预告')
          })
        }
      })
    },
    components: {
      status,
      mySection,
      Msg,
      myShare
    },
    data () {
      return {
        data: {},
        MsgShow: false, // 预约弹层显示
        status: 0, // 直播状态
        shared: -1 // 是否是通过分享链接打开的
      }
    },
    filters: {
      time (value) {
        value = new Date(parseInt(value) * 1000)
        return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日 ${utils.getTimeSection(value.getHours())}${utils.format({value: value.getHours()})}:${utils.format({value: value.getMinutes()})}`
      }
    },
    methods: {
      setShareShow () {
        utils.addEvent('分享给好友（按钮）')
        let share = document.querySelector('#share')
        share.classList.contains('visible') ? share.classList.remove('visible') : share.classList.add('visible')
      },
      setStatus () {
        let now = new Date().getTime()
        if (now > this.data.startTime * 1000) {
          this.status = 1
        } else {
          this.status = 0
        }
      },
      order () {
        utils.addEvent('预约提醒（按钮）')
        if (!this.data.isSub) {
          promise.fetch({
            url: 'index.php?a=Course&m=subscribeCourse',
            data: {courseId: this.data.id}
          }).then(res => {
            if (parseInt(res.data.code) === 1) {
              this.MsgShow = true
              this.data.isSub = true
              utils.addEvent('预约提醒成功')
            }
          })
        }
      }
    },
    created () {
      this.setStatus()
      sessionStorage.setItem('courseId',this.$route.query.courseId)
    },
    mounted () {
      utils.addEvent('直播预告到达')
      wx.ready(() => {
        let domain = utils.getDomain()
        utils.wxShare({
          title: '\u8499\u725b\u4e13\u5bb6\u5fae\u8bfe\u5802',
          desc: '\u6700\u5177\u4eb2\u548c\u529b\u7684\u533b\u751f\uff0c\u5206\u4eab\u6700\u5b9e\u7528\u7684\u77e5\u8bc6\uff0c\u8ba9\u4f60\u53d8\u6210\u6700\u7701\u5fc3\u7684\u5988\u5988\u3002',
          link: `${domain}/index.php?source=share&courseId=${sessionStorage.getItem('courseId')}&shared=1`,
          imgUrl: `${domain}/spa/mengniu/share_image@2x.png`,
          success () {
            utils.addEvent('分享成功')
            let share = document.querySelector('#share')
            share.classList.contains('visible') && share.classList.remove('visible')
          }
        })
      })
      console.log(parseInt(this.$route.query.shared))

      if (parseInt(this.$route.query.shared) === 1) {
        console.log(parseInt(this.$route.query.shared))
        utils.addEvent('分享页面到达（直播预告页）')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../common/public.less';

  .foreshow{
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #fff;
    .content{
      flex: 1;
      overflow-x: visible;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      z-index: 9;
      .banner{
        position: relative;
        padding: .22rem 0 0 .2rem;
        height: 1.67rem;
        box-sizing: border-box;
        overflow: hidden;
        .bg, &:before{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 0;
        }
        .bg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        &:before{
          content: "";
          background: rgba(0, 0, 0, .3);
          z-index: 1;
        }
        .status{
          position: relative;
          z-index: 2;
        }
        .title{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: 80%;
          color: #fff;
          .font-size(.19rem);
          .en-break();
          font-weight: 600;
          text-align: center;
          z-index: 2;
        }
      }
      .inner{
        padding: 0 .2rem;
        .section{
          .desc{
            line-height: .24rem;
            .en-break();
            overflow: hidden;
          }
          .doctor-info{
            display: flex;
            align-content: center;
            margin: .19rem 0 .2rem;
            .portrait{
              @width: .4rem;
              width: @width;
              flex: 0 0 @width;
              height: @width;
              margin-right: .1rem;
              border-radius: 50%;
              overflow: hidden;
            }
            .info{
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .text{
                .ignore(1);
                color: #666;
                .font-size(.14rem);
                .name{
                  color: #333;
                  .font-size(.16rem);
                }
                line-height: .18rem;
              }
            }
          }
          .paragraph{
            margin-bottom: .2rem;
          }
          &.code-wrapper{
            padding: .7rem 0;
            margin-top: .45rem;
            border-top: 1px dashed #ccc;
            .code-image{
              margin: 0 auto .1rem;
              @width: 1.2rem;
              width: @width;
              height: @width;
            }
            .tip{
              .font-size(.14rem);
              text-align: center;
            }
          }
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .2rem;
      height: .72rem;
      border-top: 1px solid #D8D8D8;
      z-index: 9;
      .footer-item{
        padding: .11rem 0;
        width: 1.56rem;
        color: #fff;
        text-align: center;
        font-weight: 600;
        .font-size(.19rem);
        &.share{
          background: url("@{imageUrl}button_yellow@3x.png") no-repeat center / contain;
        }
        &.order{
          background: url("@{imageUrl}button_green@3x.png") no-repeat center / contain;
          &.disabled{
            background: url("@{imageUrl}button_disabled@3x.png") no-repeat center / contain;
          }
        }
      }
    }
  }
</style>

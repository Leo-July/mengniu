import promise from '@/api/fetch'
// 7ED4436BCE714509BA556107BBFB5D9B

export default {
  // 错误提示框
  tipInfo (opt) {
    let hasTipInfo = document.querySelector('.tip-info-wrapper')
    hasTipInfo || createTipInfo()

    function createTipInfo () {
      let error = opt.error || ''
      let data = opt.data || null
      let time = opt.time || 2
      let callback = opt.callback || function () {}
      let div = document.createElement('div')
      let text = ''
      if (error.response) {
        let status = error.response.status
        if (status == '404') {
          text = '请求地址貌似有问题'
        } 
      } else if (error.request) {
        if (error.message.match('timeout')) {
          text = '网络超时,请重新进入'
        } else {
          text = error.message
        }
      } else {
        text = error.message || error
      }
      div.classList.add('tip-info-wrapper')
      div.innerHTML = text
      document.body.appendChild(div)
      setTimeout(function () {
        div.parentNode.removeChild(div)
        callback(data)
      }, time * 1000)
    }
  },
  // 判断是否是微信
  isWeiXin () {
    if (navigator.userAgent.match(/MicroMessenger/i)) {
      console.log('是微信')
      return true
    }
    return false
  },
  // 显示loading动画
  showLoading () {
    let div = document.createElement('div')
    div.id = 'loading'
    document.body.appendChild(div)
  },
  // 隐藏loading动画
  hideLoading () {
    let ele = document.getElementById('loading')

    ele && document.body.removeChild(ele)
  },
  // 微信config
  getWxConfig () {
    if (this.isWeiXin()) {
      let url = encodeURIComponent(location.href.split('#')[0])
      promise.fetch({
        url: '/common.php?a=Index&m=getJsSign&url=' + url
      }).then(res => {
        let mySign = res.data.content
        let wxSign = {
          // debug: true,
          appId: mySign.appId,
          nonceStr: mySign.nonceStr, // 必填，生成签名的随机串
          timestamp: mySign.timestamp, // 必填，生成签名的时间戳
          signature: mySign.signature, // 必填，签名
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideOptionMenu',
            'hideMenuItems'
          ]
        }
        if (wx) {
          wx.config(wxSign)
        }
      })
    }
  },
  // 微信分享
  wxShare (opt) {
      let title = opt.title || '默认的标题'
      let desc = opt.desc || '默认的描述页面'
      let link = opt.link || window.location.href
      let imgUrl = opt.imgUrl || ''
      let success = opt.success
      let cancel = opt.cancel


      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success () {
          success && success()
        },
        cancel () {
          cancel && cancel()
        }
      })

      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success () {
          success && success()
        },
        cancel () {
          cancel && cancel()
        }
      })

      // 分享给qq好友
      wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success () {
          success && success()
        },
        cancel () {
          cancel && cancel()
        }
      })

  },
  // 一天的时间区间
  getTimeSection (value) {
    if (value < 6) {
      return '凌晨'
    } if (value >= 6 && value < 8) {
      return '早晨'
    } if (value >= 8 && value < 11) {
      return '上午'
    } if (value >= 11 && value < 13) {
      return '中午'
    } if (value >= 13 && value < 17) {
      return '下午'
    } if (value >= 17 && value < 19) {
      return '傍晚'
    } if (value >= 19 && value < 24) {
      return '晚上'
    }
  },
  // 保留两位数
  format (opt) {
    let digit = opt.digit || 2
    let fill = opt.fill || '0'
    let value = opt.value.toString()

    if( value.length < digit){
      let result = []
      
      for (let i = digit - 1;i >= 0;i--) {
        if (!value.charAt(i)) {
          result[digit-i] = fill
        } else {
          result[digit-i] = value.charAt(i)
        }
      }
      return result.join('')
    }
    return value
  },
  // talkingdata  js引用
  initTalkingData (appId, versionName, versionId) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    // 判断域名是否为https
    // var ishttps = 'https:' == document.location.protocol ? true: false;
    // if(ishttps){
    //     fileref.setAttribute("src", 'https://jic.talkingdata.com/app/h5/v1?appid=' + appId + '&vn=' + versionName + '&vc=' + versionId)
    // }else{
    //     fileref.setAttribute("src", 'http://sdk.talkingdata.com/app/h5/v1?appid=' + appId + '&vn=' + versionName + '&vc=' + versionId)
    // }
    fileref.setAttribute("src", '//jic.talkingdata.com/app/h5/v1?appid=' + appId + '&vn=' + versionName + '&vc=' + versionId)
    
    document.getElementsByTagName("head")[0].appendChild(fileref)

  },
  // 埋点
  addEvent() {
    var arrs = Array.prototype.slice.call(arguments);
    var timer = null;
    timer = setInterval(function() {
      try {
        TDAPP && clearInterval(timer);
        TDAPP.onEvent.apply(TDAPP, arrs);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  },
  // 设置title
  setTitle (value) {
    document.querySelector('title').innerHTML = value
  }
}

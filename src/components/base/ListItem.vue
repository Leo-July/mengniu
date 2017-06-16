<template>
  <li class="list-item">
    <h3 class="title">{{ data.title }}</h3>
    <!--主要信息-->
    <div class="content">
      <!--头像-->
      <figure class="portrait">
        <img :src="data.head" alt="">
      </figure>
      <!--详情-->
      <div class="info">
        <p class="name-profession">
          <span class="name">{{data.name}}</span> 
          <span class="profession">{{data.professionTitle}}</span>
        </p>
        <p class="hospital">{{data.hospitalName}}</p>
        <p class="date-visited">
          <span v-if="data.startTime" class="date">{{data.startTime | time}}</span>
          <span class="visited">{{data.visited}}</span>
        </p>
      </div>
    </div>
    <a class="button" :href="data.link">点击播放</a>
  </li>
</template>

<script>
  export default {
    name: 'ListItem',
    props: {
      data: {
        type: Object,
        default () {
          return {
            id: '1',
            link: 'baidu.com', // 跳链接
            title: 'title', // 直播/预告 标题
            startTime: '2017.06.20', // 日期
            headUrl: '//usr.im/36x36', // 头像
            name: 'name', // 名字
            professionTitle: 'professionTitle', // 职称
            hospitalName: 'hospitalName', // 医院
            departmentName: 'departmentName', // 科室
            visited: '2000' // 访问量
          }
        }
      }
    },
    filters: {
      time (value) {
        value = new Date(parseInt(value) * 1000)
        return `${value.getFullYear()}.${value.getMonth() + 1}.${value.getDate()}`
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/public.less';
  
  .list-item{
    position: relative;
    padding: .32rem .24rem .54rem;
    margin: 0 .24rem .54rem;
    border: 2px solid #99E7BA;
    border-radius: .12rem;
    box-shadow: 0 4px 4px 0 #7CDEBC;
    background: #fff;
    &.looked{
      .visited{
        &:before{
          background: url("@{imageUrlDep}looked_icon@3x.png")no-repeat center / contain;
        }
      }
    }
    &.listened{
      .visited{
        &:before{
          background: url("@{imageUrlDep}listened_icon@3x.png")no-repeat center / contain;
        }
      }
    }
    .title{
      margin-bottom: .2rem;
      .font-size(.18rem);
      line-height: .2rem;
      font-weight: 500;
      color: #2D9B3D;
      .ignore(1);
    }
    .content{
      display: flex;
      align-content: center;
      .portrait{
        @width: .63rem;
        margin-right: .08rem;
        flex: 0 0 @width;
        height: @width;
        border: 1px solid #259E39;
        border-radius: 50%;
        overflow: hidden;
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .profession, .hospital, .date-visited{
          .font-size(.14rem);
          color: #666;
        }
        .name-profession{
          .ignore(1);
          .name{
            .font-size(.16rem);
          }
        }
        .hospital{
          line-height: .16rem;
          .ignore(1);
        }
        .date{
          color: #E46200;
          &:before{
            @width: .13rem;
            content: "";
            display: inline-block;
            margin-right: .06rem;
            width: @width;
            height: @width;
            background: url("@{imageUrlDep}time_icon@3x.png")no-repeat center / contain;
          }
        }
        .visited{
          float: right;
          color: #2D9B3D;
          &:before{
            content: "";
            display: inline-block;
            position: relative;
            top: -1px;
            margin-right: .06rem;
            width: .16rem;
            height: .0845rem;
            vertical-align: middle;
          }
        }
      }
    }
    .button{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 50%, 0);
      width: 2rem;
      height: .48rem;
      .font-size(.20rem);
      font-weight: 600;
      line-height: .48rem;
      text-align: center;
      color: #fff;
      background: url("@{imageUrlDep}play_bg@3x.png") no-repeat center / contain;
    }
  }
</style>

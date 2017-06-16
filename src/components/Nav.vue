<template>
  <nav class="nav">
    <ul class="nav-inner">

      <li class="nav-item" v-for="(item, index) in navData.show" :class=" {'current': current === index} " @click="setCurrent(index)">
        {{ item}}
      </li>

      <li class="nav-item" v-if="navData.hide.length > 0 && !moreShow" @click="setMoreShow">更多</li>

      <li class="nav-item" v-if="moreShow" v-for="(item, index) in navData.hide" :class=" {'current': current === index + 7} " @click="setCurrent(index + 7)">
        {{ item}}
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'nav',
    props: {
      current: {
        type: Number,
        default: -1
      }
    },
    data () {
      return {
        navData: {
          show: ['亲子互动', '胎儿发育', '分娩生产', '宝宝腹泻', '启蒙音乐', '爸爸', '母乳喂养'],
          hide: ['亲子互动', '多出菜案', '多出菜案', '多出菜案', '多出菜案']
          // hide: []
        },
        moreShow: false // 更多菜单显示
      }
    },
    methods: {
      setCurrent (index) {
        sessionStorage.setItem('current', index)
        this.$emit('setCurrent', index)
      },
      setMoreShow () {
        this.moreShow = true
        sessionStorage.setItem('moreShow', 'true')
      }
    },
    created () {
      if (sessionStorage.getItem('moreShow')) {
        this.moreShow = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../common/public.less';
  
  .nav{
    position: relative;
    background-image: linear-gradient(to bottom, #FAFFF0, #fff, #FAFFF0);
    z-index: 2;
    .nav-inner{
      display: flex;
      flex-wrap: wrap;
      margin: 0 .17rem -.15rem;
      .nav-item{
        padding: .095rem 0;
        margin: 0 .025rem .15rem;
        width: .8rem;
        .font-size(.14rem);
        text-align: center;
        background: url("@{imageUrl}tab@3x.png") no-repeat center / contain;
        &.current{
          background: url("@{imageUrl}tab_current@3x.png") no-repeat center / contain;
        }
      }
    }
  }
</style>

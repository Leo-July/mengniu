<template>
  <nav class="nav">
    <ul class="nav-inner">

      <li class="nav-item" v-for="(item, index) in navData.show" :class=" {'current': current === index} " @click="setCurrent(index, item)" :key="'show' + index">
        {{ item}}
      </li>

      <li class="nav-item" v-if="navData.hide.length > 0 && !moreShow" @click="setMoreShow">更多</li>

      <li class="nav-item" v-if="moreShow" v-for="(item, index) in navData.hide" :class=" {'current': current === index + 7} " @click="setCurrent(index + 7, item)" :key="'more' + index">
        {{ item}}
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'nav',
    data () {
      return {
        navData: {
          show: ['全部', '手足口', '扁桃体发炎', '发烧', '腹泻', '便秘', '育儿'],
          hide: []
          // show: ['全部', '发热', '痱子', '蚊虫叮咬', '启蒙音乐', '爸爸', '母乳喂养'],
          // hide: ['亲子互动', '多出菜案', '多出菜案', '多出菜案', '多出菜案']
        },
        moreShow: false, // 更多菜单显示
        current: 0 // 当前被点击的标签下标
      }
    },
    methods: {
      setCurrent (index, item) {
        this.current = index
        sessionStorage.setItem('listParam', JSON.stringify({current: index, tag: item}))
        this.$emit('setCurrent', item)
      },
      setMoreShow () {
        this.moreShow = true
        sessionStorage.setItem('moreShow', 'true')
      }
    },
    created () {
      let listParam = sessionStorage.getItem('listParam')
      if (listParam) {
        listParam = JSON.parse(listParam)
        this.current = listParam.current
        this.$emit('setCurrent', listParam.tag)
      } else {
        this.$emit('setCurrent', '')
      }
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
      margin: 0 .17rem -.15rem;
      display: -webkit-flex;
      flex-wrap: wrap;
      .nav-item{
        padding: .095rem 0;
        margin: 0 .025rem .15rem;
        width: .8rem;
        color: #E54A05;
        .font-size(.14rem);
        text-align: center;
        background: url("@{imageUrl}tab@3x.png") no-repeat center / contain;
        &.current{
          color: #FFEEAB;
          background: url("@{imageUrl}tab_current@3x.png") no-repeat center / contain;
        }
      }
    }
  }
</style>

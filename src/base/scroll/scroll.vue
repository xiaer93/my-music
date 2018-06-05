<template>
  <div class="swiper-container" ref="scroll" @touchmove.stop>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <slot></slot>
      </div>
      <!--监听滚动至末尾事件-->
      <div class="swiper-slide" v-if="isOnScrollEnd"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'

export default {
  props: {
    // props数据在什么时候get？
    data: {
      type: Array,
      defualt: () => {
        return []
      }
    },
    isOnScrollEnd: {
      type: Boolean,
      default: false
    },
    isInit: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    // created所有数据准备完毕，mounted挂载dom（但不保证全部挂载完成）
    // 等待实例全部挂载/dom添加~
    setTimeout(() => {
      this._initScroll()
      if (this.isInit) {
        this.scroll.allowTouchMove = true
      }
    }, 20)
  },
  methods: {
    _initScroll() {
      // fixme：此处不可以使用查询类，会导致创建多个swiper实例!
      // 必须传入dom元素
      this.scroll = new Swiper(this.$refs.scroll, {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // observer: true, swiper-slide只有一个，因此不会触发更新~
        observeParents: true,
        // 默认无法touch~
        allowTouchMove: false
        // 拖动抵抗力
        // resistanceRatio: 0.8
      })

      if (this.isOnScrollEnd) {
        this.scroll.on('reachEnd', () => {
          this.$emit('scrollEnd')
        })
      }
    },
    update() {
      // fixme: 为什么搜索页面无法正常滚动，老是回弹~~~
      // 等待dom刷新之后再更新swiper
      /* this.$nextTick(() => {
        this.scroll.update()
      }) */
      // setTimeout在这里比nextTick靠谱，why？
      setTimeout(() => {
        // 等待dom挂载完成后再更新swiper
        this.scroll.update(true)
      }, 20)
    },
    stop() {
      this.scroll.allowTouchMove = false
    },
    restart() {
      this.scroll.allowTouchMove = true
    }
  },
  watch: {
    data() {
      // 必须确保swiper已经初始化了.mounted发生再data-watch之前~
      this.scroll && this.update()
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .swiper-container{
    width: 100%;
    height: 100%;
    .swiper-wrapper{
      .swiper-slide{
        // swiper做内容滚动时，其slide的高度必须自适应~
        height:auto;
      }
    }
  }
</style>

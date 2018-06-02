<template>
  <div class="swiper-container" ref="scroll">
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
    data: {
      type: Array,
      defualt: () => {
        return []
      }
    },
    isOnScrollEnd: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 等待实例全部挂载/dom添加~
    setTimeout(() => {
      this._initScroll()
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
        observeParents: true
      })

      if (this.isOnScrollEnd) {
        this.scroll.on('reachEnd', () => {
          this.$emit('scrollEnd')
        })
      }
    },
    update() {
      // 等待dom刷新之后再更新swiper
      this.$nextTick(() => {
        this.scroll.update()
      })
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

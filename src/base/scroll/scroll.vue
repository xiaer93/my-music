<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'

export default {
  created() {
    setTimeout(() => {
      this.scroll = new Swiper('.scroll', {
        direction: 'vertical',
        freeMode: true,
        observer: true,
        observeParents: true
      })
    }, 20)
  },
  methods: {
    update() {
      this.scroll.update()
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>

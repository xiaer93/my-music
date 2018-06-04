<template>
  <div class="input-box">
    <i class="icon"></i>
    <!--本案例中不要求input全透明~-->
    <input class="text" type="text" :placeholder="placeholder" v-model="query">
    <figure class="clear-wrapper" @click="clear" v-show="query">
      <i class="clear"></i>
    </figure>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/utils'

export default {
  data() {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    }
  },
  created() {
    // fixme：与watch有什么区别？
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 20))
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.input-box{
  position: relative;
  width: 100%;
  height: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  background: #ebecec;
  border-radius: 30px;
  .icon{
    position: absolute;
    left: 0;
    top: 9px;
    margin: 0 8px;
    vertical-align: middle;
    display: inline-block;
    vertical-align: middle;
    background-position: 0 0;
    background-size: contain;
    background-repeat: no-repeat;
    width: 13px;
    height: 13px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxLDIzLjUzNWwtMS40MTQsMS40MTRsLTcuMzE1LTcuMzE0CgkJQzE0LjcwOSwxOS4xMDcsMTIuNDYsMjAsMTAsMjBDNC40NzcsMjAsMCwxNS41MjMsMCwxMEMwLDQuNDc3LDQuNDc3LDAsMTAsMGM1LjUyMywwLDEwLDQuNDc3LDEwLDEwYzAsMi4zNDItMC44MTEsNC40OS0yLjE2LDYuMTk1CgkJTDI1LjE4MSwyMy41MzV6IE0xMCwyYy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4YzQuNDE4LDAsOC0zLjU4Miw4LThTMTQuNDE4LDIsMTAsMnoiLz48L3N2Zz4=);
  }
  .text{
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: transparent;
    font: 14px/1.5 Helvetica,sans-serif;
    color: #333;
    border-radius: 0;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    border: none;
    outline: none;
  }
  .clear-wrapper{
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    .clear{
      display: inline-block;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      background-position: 0 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQsMGM3LjczMiwwLDE0LDYuMjY4LDE0LDE0YzAsNy43MzItNi4yNjgsMTQtMTQsMTQKCVMwLDIxLjczMiwwLDE0QzAsNi4yNjgsNi4yNjgsMCwxNCwweiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ViZWNlYiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibTE5IDlsLTEwIDEwIi8+PHBhdGggZD0ibTkgOWwxMCAxMCIvPjwvZz48L2c+PC9zdmc+);
    }
  }
}
</style>

<template>
  <div class="confirm" v-show="isShow">
    <div class="content-wrapper">
      <div class="title-wrapper">
        <h1 class="title">{{titleText}}</h1>
      </div>
      <div class="control-wrapper">
        <span class="left-btn" @click="leftClick" v-if="leftText">{{leftText}}</span>
        <span class="right-btn" @click="rightClick" v-if="rightText">{{rightText}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      isShow: false
    }
  },
  props: {
    leftText: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    titleText: {
      type: String,
      default: ''
    }
  },
  methods: {
    leftClick() {
      this.isShow = false
      this.$emit('leftClick')
    },
    rightClick() {
      this.isShow = false
      this.$emit('rightClick')
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/mixin";

  .confirm {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0,0,0,0.5);
    .content-wrapper{
      display: inline-block;
      margin: auto;
      width: 280px;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
      .title-wrapper{
        display: flex;
        padding: 15px 22px;
        line-height: 1.2;
        color: #333;
        border-bottom: 1px solid #dbdbdb;
        .title{
          display: inline-block;
          max-width: 100%;
          margin: auto;
        }
      }
      .control-wrapper{
        display: flex;
        justify-content: center;
        color: #0076ff;
        font-size: 17px;
        span{
          display: inline-block;
          flex: 1 1 auto;
          height: 44px;
          line-height: 44px;
          text-align: center;
          .extend-click();
        }
      }
    }
  }
</style>

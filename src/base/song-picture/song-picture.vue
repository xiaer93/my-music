<template>
  <div class="song-picture">
    <div class="picture-wrapper">
      <img class="picture" :src="data.picUrl" alt="歌单封面">
      <span class="number">{{data.playCount}}</span>
    </div>
    <p class="title">{{data.name}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.song-picture{
  .picture-wrapper{
    position: relative;
    .picture{
      width: 100%;
    }
    .number{
      position: absolute;
      right: 5px;
      top: 2px;
      z-index: 3;
      padding-left: 13px;
      color: #fff;
      font-size: 12px;
      background-position: 0;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      text-shadow: 1px 0 0 rgba(0,0,0,.15);
      background-image: url('~base/song-picture/icon-music.svg');
    }
  }
  .title{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    line-height: 1.2;
    font-size: 13px;
  }
}
</style>

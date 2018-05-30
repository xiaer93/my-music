<template>
  <ul class="tab">
    <router-link tag="li" class="tab-item" to="/recommend">
      <!--ti=tab-link-->
      <span class="ti-link">推荐音乐</span>
    </router-link>
    <router-link tag="li" class="tab-item" to="/hotmusic">
      <span class="ti-link">热歌榜</span>
    </router-link>
    <router-link tag="li" class="tab-item" to="/search">
      <span class="ti-link">搜索</span>
    </router-link>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/variable";

  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #eee;
    .tab-item{
      width: 33.3%;
      flex: 1 1 auto;
      color: #000;
      .ti-link{
        box-sizing: border-box;
        display: inline-block;
        height: 100%;
        width: auto;
        padding: 0 5px;
        border-bottom: 2px solid transparent;
      }
      &.router-link-active{
        .ti-link{
          color: @text-color-active;
          border-bottom-color: @text-color-active;
        }
      }
    }
  }
</style>

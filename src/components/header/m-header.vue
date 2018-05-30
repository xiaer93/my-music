<template>
  <div class="header">
    <div class="header-person">@</div>
    <div class="header-title">
      <h1>我的音乐</h1>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/variable";

.header{
  height: 64px;
  line-height: 64px;
  width: 100%;
  background-color: @theme-background-color;
  overflow: hidden;
  .header-title{
    padding-left: 10px;
    font-size: 20px;
    color: @text-color;
    overflow: hidden;
  }
  .header-person{
    float: right;
    height: 64px;
    width: 40px;
  }
}
</style>

<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--使用前端路由，借助keep-alive保存dom-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>

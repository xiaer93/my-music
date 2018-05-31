<template>
  <div class="recommend">
    <div class="song-list-wrapper">
      <song-list :></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getNewSong} from 'api/song'
import {ERR_OK} from 'api/config'

import SongList from 'base/song-list/song-list'

export default {
  data() {
    return {

    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      getNewSong().then((res) => {
        if (ERR_OK === res.code) {
          console.log(res.result)
        }
      })
    }
  },
  components: {
    SongList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>

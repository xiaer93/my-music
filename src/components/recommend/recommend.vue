<template>
  <div class="recommend">
    <div class="song-list-wrapper">
      <song-list :songs="songs"></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getNewSong} from 'api/song'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

import SongList from 'base/song-list/song-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      getNewSong().then((res) => {
        if (ERR_OK === res.code) {
          this.songs = this._genSongs(res.result)
        }
      })
    },
    _genSongs(songs) {
      return songs.map(({song}) => {
        return createSong({
          id: song.id,
          mid: song.mMusic.id,
          name: song.name,
          artists: song.artists,
          duration: song.duration,
          album: song.album,
          quality: 1
        })
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

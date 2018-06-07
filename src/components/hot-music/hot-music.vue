<template>
  <div class="hot-music">
    <scroll :data="songs" :isOnScrollEnd="isOnScrollEnd" @scrollEnd="loadMore()">
      <div class="hot-banner">
        <div class="hot">
          <h1 class="title"></h1>
          <span class="time">{{updateTime}}</span>
        </div>
      </div>
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="play"></song-list>
        <p class="load-more">加载更多</p>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'

import {ERR_OK, SONG_RANK} from 'api/config'
import {getHotSong} from 'api/song'
import {createSong} from 'common/js/song'

import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'

export default {
  data() {
    return {
      storeSongs: [],
      songs: [],
      updateTime: '',
      isOnScrollEnd: true
    }
  },
  computed: {

  },
  created() {
    this._getData()
  },
  methods: {
    _getData() {
      getHotSong(SONG_RANK.WY_HOT).then((res) => {
        if (res.code === ERR_OK) {
          let time = new Date(res.playlist.trackUpdateTime)
          this.updateTime = `更新日期：${time.getMonth()}月${time.getDate()}日`

          let tracks = res.playlist.tracks
          this.storeSongs = this._genSongs(tracks)
          this.songs = this.storeSongs.splice(0, 20)
        }
      })
    },
    _genSongs(songs) {
      return songs.map((song) => {
        return createSong({
          id: song.id,
          name: song.name,
          title: song.name,
          artists: song.ar,
          duration: song.dt,
          imgSrc: song.al.picUrl,
          // 品质参数暂时不知道？
          quality: 1
        })
      })
    },
    loadMore() {
      // 延时1s加载歌曲内容~
      setTimeout(() => {
        this.songs = this.songs.concat(this.storeSongs.splice(0, 20))
      }, 1000)
    },
    play(song) {
      this.insertSong(song)
    },
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    Scroll,
    SongList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .hot-music{
    position: fixed;
    top: 104px;
    bottom: 0;
    left: 0;
    right: 0;
    .hot-banner{
      position: relative;
      padding-top: 38.9%;
      overflow: hidden;
      background: url('~common/image/hot_music_bg.jpg');
      background-size: contain;
      .hot{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        left:0;
        top:0;
        bottom:0;
        right: 0;
        padding-left: 20px;
        .title{
          width: 142px;
          height: 67px;
          background-image: url('~common/image/index_icon.png');
          background-repeat: no-repeat;
          background-position: -24px -30px;
          background-size: 166px 97px
        }
        .time{
          margin-top: 10px;
          color: hsla(0,0%,100%,.8);
          font-size: 12px;
          -webkit-transform: scale(.91);
          transform: scale(.91);
          -webkit-transform-origin: left top;
          transform-origin: left top;
        }
      }
    }
    .song-list-wrapper{
      padding-left: 10px;
      .load-more{
        text-align: center;
        font-size: 15px;
        line-height: 60px;
        height: 60px;
        text-align: center;
        color: #888;
      }
    }
  }
</style>

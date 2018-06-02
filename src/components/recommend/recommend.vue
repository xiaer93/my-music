<template>
  <div class="recommend">
    <scroll :data="songs">
      <div class="song-picture-wrapper">
        <h2 class="title">推荐歌单</h2>
        <ul class="picture-list">
          <li class="item" v-for="item in songsPic" :key="item.id">
            <song-picture :data="item"></song-picture>
          </li>
        </ul>
      </div>
      <div class="song-list-wrapper">
        <h2 class="title">最新音乐</h2>
        <song-list class="song-list" :songs="songs"></song-list>
      </div>
      <div class="song-footer-wrapper">
        <h2 class="copyright">xiaer93</h2>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {getNewSong, getPicSong} from 'api/song'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import SongPicture from 'base/song-picture/song-picture'

const SONGPIC_COUNT = 6

export default {
  data() {
    return {
      songs: [],
      songsPic: []
    }
  },
  computed: {
    scrollData() {
      if (this.songs.length && this.songsPic) {
        return this.songs.concat(this.songsPic)
      } else {
        return []
      }
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
          this.songs = this._genSongs(res.result)
        }
      })
      getPicSong().then((res) => {
        if (ERR_OK === res.code) {
          this.songsPic = this._genSongPic(res.result)
        }
      })
    },
    _genSongs(songs) {
      return songs.map(({song}) => {
        return createSong({
          id: song.id,
          name: song.name,
          artists: song.artists,
          duration: song.duration,
          imgSrc: song.album.blurPicUrl,
          // 品质参数暂时不知道？
          quality: 1
        })
      })
    },
    _genSongPic(songPic) {
      let ret = []
      for (let i = 0; i < SONGPIC_COUNT; ++i) {
        let {id, name, picUrl, playCount} = songPic[i]
        ret.push({
          id,
          name,
          picUrl,
          playCount
        })
      }
      return ret
    }
  },
  components: {
    SongList,
    Scroll,
    SongPicture
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .recommend{
    position: fixed;
    top: 104px;
    bottom: 0;
    left: 0;
    right: 0;
    /*background-color: #fbf1f2;*/
    .song-picture-wrapper{
      .picture-list{
        display: flex;
        flex-wrap: wrap;
        .item{
          width: 32%;
          padding-right: 2px;
          padding-top: 16px;
          flex: 1 1 auto;
          &:nth-child(3n){
            padding-right: 0;
          }
        }
      }
    }
    .song-list-wrapper{
      .title{
        margin-top: 28px;
      }
      .song-list{
        margin-top: 14px;
      }
    }
    .song-footer-wrapper{
      position: relative;
      // padding等宽属性？
      padding-top: 53.3%;
      margin-top: 4px;
      background: url('~common/image/recommend.png') no-repeat;
      background-size: contain;
      .copyright{
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 28px;
        transform: translate(-50%,-50%);
      }
    }
    .title{
      position: relative;
      padding-left: 9px;
      margin-top: 14px;
      font-size: 17px;
      height: 20px;
      line-height: 20px;
      &:after{
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -9px;
        width: 2px;
        height: 16px;
        background-color: #d33a31;
      }
    }
  }
</style>

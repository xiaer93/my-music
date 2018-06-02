<template>
  <div class="player" v-show="fullScreen !== state.INIT_SCREEN">
    <div class="max-player">
      <div class="max-player-bg" :style="{backgroundImage: `url(${currentSong.imgSrc})`}"></div>
      <scroll :data="songs">
        <div class="player-wrapper">
          <h1 class="title">xiaer93</h1>
          <div class="stage-wrapper">
            <div class="stage">
              <div class="cd">
                <div class="song-pic">
                  <img :class="{'play-music': playState === state.STATE_PLAYING}" :src="currentSong.imgSrc" alt="">
                </div>
              </div>
              <div class="cd-light" :class="{'play-music': playState === state.STATE_PLAYING}"></div>
            </div>
          </div>
          <div class="lyric-wrapper">

          </div>
        </div>
        <div class="comment-wrapper"></div>
        <div class="recommend-wrapper"></div>
      </scroll>
    </div>
    <div class="mini-player">
    </div>
    <audio :src="songUrl" @canplay="play" ref="music"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {STATE} from 'common/js/config'
import {getSongUrl, getSongComment} from 'api/song'
import {ERR_OK} from 'api/config'

import Scroll from 'base/scroll/scroll'

const LIMIT_COMMENT = 10

export default {
  data() {
    return {
      songs: [],
      state: STATE,
      songUrl: '',
      comments: []
    }
  },
  computed: {
    ...mapGetters([
      'playState',
      'fullScreen',
      'currentSong'
    ])
  },
  methods: {
    play() {
      this.$refs.music.play()
    },
    _getSongUrl(id) {
      getSongUrl(id).then((res) => {
        if (res.code === ERR_OK) {
          this.songUrl = res.data[0].url
        }
      })
    },
    _getSongComment(id, limit) {
      console.log('asdfas', ERR_OK)

      getSongComment(id, limit).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.hotComments)
        }
      })
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong === null || newSong.id === oldSong.id) {
        return undefined
      }

      this.$refs.music.pause()
      this._getSongUrl(newSong.id)
      this._getSongComment(newSong.id, LIMIT_COMMENT)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

  .player{
    .max-player{
      position: fixed;
      top: 0;
      left:0;
      right: 0;
      bottom:0;
      background-color: #808080;
      .max-player-bg{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center;
        transform-origin: center top;
        transform: scale(2);
        filter: blur(5px);
      }
      .player-wrapper{
        height: 100%;
        width: 100%;
        .title{
          position: absolute;
          left: 5px;
          top: 10px;
        }
        .stage-wrapper{
          display: flex;
          padding-top: 70px;
          .stage{
            position: relative;
            flex: 0 0 auto;
            margin: auto;
            width: 296px;
            height: 296px;
            .cd{
              display: flex;
              width: 100%;
              height:100%;
              background: url('~common/image/disc-ip6.png') no-repeat center/contain;
              &:after{
                position: absolute;
                content: '';
                width: 96px;
                height: 137px;
                top: -70px;
                left: 133px;
                background: url('~common/image/needle-ip6.png') no-repeat center/contain;
              }
              .song-pic{
                margin: auto;
                width: 184px;
                height: 184px;
                border-radius: 50%;
                overflow: hidden;
                // 当图片无显示时，显示默认cd盘
                background: url('~common/image/disc_default.png') no-repeat center/contain;
                img{
                  width: 100%;
                }
              }
            }
            .cd-light{
              position: absolute;
              left:0;
              top:0;
              width: 100%;
              height:100%;
              background: url('~common/image/disc_light-ip6.png') no-repeat center/contain;
            }
          }
        }
      }
      .comment-wrapper{

      }
    }
    .mini-player{
      position: fixed;
      bottom: 0;
      left:0;
      height: 80px;
    }

    .play-music{
      animation: rotate 20s infinite linear;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }

</style>

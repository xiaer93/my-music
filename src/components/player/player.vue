<template>
  <div class="player">
    <transition name="slide" duration="2000">
      <div class="max-player" v-show="fullScreen === state.MAX_SCREEN">
        <div class="max-player-bg">
          <div class="bg" :style="{backgroundImage: `url(${currentSong.imgSrc})`}"></div>
          <div class="mask"></div>
        </div>
        <scroll :data="comments">
          <div class="player-wrapper" ref="playCD">
            <div class="header-wrapper">
              <h1 class="title">xiaer-player</h1>
              <span class="icon-font close" @click="close">
                <i class="icon-close"></i>
              </span>
            </div>
            <div class="stage-wrapper">
              <div class="stage">
                <div class="cd">
                  <div class="song-pic">
                    <img :class="playClass" :src="currentSong.imgSrc" alt="">
                  </div>
                </div>
                <div class="cd-light" :class="playClass"></div>
              </div>
            </div>
            <div class="lyric-wrapper">

            </div>
            <div class="control-wrapper">
              <div class="operators">
                <div class="icon-font i-left">
                  <i class="icon-random" @click="changeMode"></i>
                </div>
                <div class="icon-font i-left">
                  <i class="icon-prev" @click="prev"></i>
                </div>
                <div class="icon-font i-center">
                  <i class="icon-play" @click="togglePlay"></i>
                </div>
                <div class="icon-font i-right">
                  <i class="icon-next" @click="next"></i>
                </div>
                <div class="icon-font i-right">
                  <i class="icon-favorite" @click="alert('敬请期待')"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-wrapper">
            <comment-list :data="comments"></comment-list>
          </div>
          <!--<div class="recommend-wrapper"></div>-->
        </scroll>
      </div>
    </transition>
    <div class="mini-player" v-show="fullScreen === state.MINI_SCREEN">
    </div>
    <audio :src="songUrl" @canplay="play" @ended="next" ref="music"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapMutations} from 'vuex'
import {STATE} from 'common/js/config'
import {getSongUrl, getSongComment} from 'api/song'
import {ERR_OK} from 'api/config'

import Scroll from 'base/scroll/scroll'
import CommentList from 'base/comment-list/comment-list'

// eslint-disable-next-line
import Velocity from 'velocity-animate'

const LIMIT_COMMENT = 10

export default {
  data() {
    return {
      songUrl: '',
      comments: []
    }
  },
  computed: {
    playClass() {
      return (this.playState === this.state.STATE_PLAYING) ? 'play-music' : 'play-music play-music-pause'
    },
    ...mapGetters([
      'playList',
      'playState',
      'fullScreen',
      'currentSong',
      'currentIndex'
    ])
  },
  methods: {
    play() {
      this.$refs.music.play()
    },
    close() {
      this.setFullScreen(this.state.MINI_SCREEN)
    },
    togglePlay() {
      this.setPlayState((this.playState === this.state.STATE_PLAYING) ? this.state.STATE_PAUSE : this.state.STATE_PLAYING)
    },
    prev() {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    next() {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    changeMode() {

    },
    _getSongUrl(id) {
      getSongUrl(id).then((res) => {
        if (res.code === ERR_OK) {
          this.songUrl = res.data[0].url
        }
      })
    },
    _getSongComment(id, limit) {
      getSongComment(id, limit).then((res) => {
        if (res.code === ERR_OK) {
          this.comments = this._genComments(res.hotComments)
        }
      })
    },
    _genComments(comments) {
      return comments.map((c) => {
        console.log(c)
        return {
          userName: c.user.nickname,
          avatarUrl: c.user.avatarUrl,
          time: c.time,
          likedCount: c.likedCount,
          content: c.content
        }
      })
    },
    ...mapMutations({
      'setFullScreen': 'SET_FULL_SCREEN',
      'setPlayState': 'SET_PLAY_STATE',
      'setCurrentIndex': 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (newSong === null || newSong.id === oldSong.id) {
        return undefined
      }

      this.$refs.music.pause()
      this._getSongUrl(newSong.id)
      this._getSongComment(newSong.id, LIMIT_COMMENT)
    },
    playState(newState, oldState) {
      if (newState === this.state.STATE_PAUSE) {
        this.$refs.music.pause()
      } else {
        this.$refs.music.play()
      }
    }
  },
  mounted() {
    setTimeout(() => {
      // 确保cd独占一页~
      this.$refs.playCD.style.height = window.innerHeight + 'px'
    }, 20)
  },
  created() {
    this.state = STATE
  },
  components: {
    Scroll,
    CommentList
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/variable";

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
      .bg{
        width: 100%;
        height:100%;
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center;
        transform-origin: center top;
        transform: scale(2);
        filter: blur(5px);
      }
      .mask{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,.65);
      }
    }
    .player-wrapper{
      position: relative;
      width: 100%;
      .header-wrapper{
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        padding: 0 5px;
        height: 26px;
        line-height: 26px;
        font-size: 26px;

        .title{
          float: left;
          color: #fff;
        }
        .close{
          float: right;
          color: @color-theme;
        }
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
          transform-origin: top center;
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
              transform-origin: top center;
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
      .control-wrapper{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .operators{
          display: flex;
          width: 100%;
          height: 60px;
          text-align: center;
          font-style: oblique;
          .icon-font {
            flex: 1;
            color: @color-theme;
            &.disable {
              /*主题色修改，告诉用户暂时不支持点击*/
              color: @color-theme-d;
            }
            i {
              font-size: 30px;
              line-height: 60px;
            }
          }
          .i-left {
            text-align: right;
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          .i-right {
            text-align: left;
          }
        }
      }
    }
    .comment-wrapper{
    }

    // fixme:为什么失效了？必须使用强制刷新~
    &.slide-enter-active, &.slide-leave-active{
      transition: all .8s ease;
      .stage{
        transition: all .5s 0.3s cubic-bezier(.45,1.5,.76,1.46);
      }
      .cd:after{
        /*transition: all 1s 1s linear;*/
        animation: play .6s .8s both;
      }
    }
    &.slide-enter, &.slide-leave-to{
      opacity: 0;
      .stage{
        opacity: 0;
        transform: scale(0.8);
      }
      .cd:after{
        transform: rotateX( 30deg);
      }
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
  .play-music-pause{
    animation-play-state: paused;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes play {
    0%{
      transform: rotateX(30deg);
    }
    99%{
      transform: rotateX(30deg);
    }
    100%{
      transform: rotateX(0);
    }
  }
</style>

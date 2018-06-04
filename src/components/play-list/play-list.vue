<template>
  <!--歌单页-->
  <div class="play-list">
    <scroll :data="songs" ref="scroll">
      <div class="header">
        <div class="list-infos">
          <div class="bg" :style="{backgroundImage: `url(${songPic.picUrl})`}">
            <div class="mask"></div>
          </div>
          <div class="header-wrapper">
            <div class="picture-wrapper">
              <song-picture :data="songPic" :isShowName="isShowName" :isShowTitle="isShowTitle"></song-picture>
            </div>
            <div class="creater-wrapper">
              <h1 class="title">{{creator.title}}</h1>
              <span class="author">
                <i class="avatar" :style="{backgroundImage: `url(${creator.avatarUrl})`}"></i>
                {{creator.name}}
              </span>
            </div>
          </div>
        </div>
        <div class="list-content">
          <p class="tag-wrapper">
            标签：
            <em class="tag" v-for="(tag, index) in creator.tags" :key="index">{{tag}}</em>
          </p>
          <p class="content" @click="showMore">{{creator.content}}</p>
        </div>
      </div>
      <div class="song-list">
        <p class="title">歌曲列表</p>
        <song-list :songs="songs" :hasNumber="hasNumber"></song-list>
      </div>
    </scroll>
    <div class="control-wrapper">
      <span class="play-all">播放歌单</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getPlayListDetail} from 'api/song'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {mapGetters} from 'vuex'

import SongList from 'base/song-list/song-list'
import SongPicture from 'base/song-picture/song-picture'
import Scroll from 'base/scroll/scroll'

export default {
  data() {
    return {
      songPic: {},
      songs: [],
      creator: {},
      isShowTitle: true,
      isShowName: false,
      hasNumber: true
    }
  },
  computed: {
    ...mapGetters([
      'discId'
    ])
  },
  methods: {
    showMore(e) {
      e.target.classList.toggle('active')
      this.$refs.scroll.update()
    },
    _getPlayListDetail(id) {
      getPlayListDetail(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.playlist)
          let playlist = res.playlist

          this.songPic = {
            id: playlist.id,
            name: playlist.name,
            picUrl: playlist.coverImgUrl,
            playCount: playlist.playCount
          }

          this.creator = {
            name: playlist.creator.nickname,
            avatarUrl: playlist.creator.avatarUrl,
            title: playlist.name,
            tags: playlist.creator.expertTags,
            content: playlist.description
          }

          this.songs = this._genSongs(playlist.tracks)
        }
      })
    },
    _genSongs(songs) {
      return songs.map((song) => {
        return createSong({
          id: song.id,
          name: song.al.name,
          title: song.alia[0],
          artists: song.ar,
          duration: song.dt,
          imgSrc: song.al.picUrl,
          // 品质参数暂时不知道？
          quality: 1
        })
      })
    }
  },
  created() {
    let discId = this.discId
    if (discId === -1) {
      this.$router.back()
    } else {
      this._getPlayListDetail(discId)
    }
  },
  components: {
    SongList,
    SongPicture,
    Scroll
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "~common/less/mixin";

.play-list{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom: 60px;
  z-index: 1;
  background-color: #fff;
  .header{
    overflow: hidden;
    .list-infos{
      position: relative;
      overflow: hidden;
      .header-wrapper{
        display: flex;
        margin: 30px auto;
        width: 295px;
        height: 114px;
        .picture-wrapper{
          flex: 0 0 auto;
          width: 114px;
        }
        .creater-wrapper{
          flex: 1 1 auto;
          margin-left: 16px;
          .title{
            padding-top: 1px;
            font-size: 17px;
            line-height: 1.3;
            color: #fefefe;
            height: 44px;
          }
          .author{
            display: inline-block;
            height: 36px;
            line-height: 36px;
            margin-top: 20px;
            .no-wrap();
            vertical-align: middle;
            color: hsla(0,0,100%,.7);
            .avatar{
              display: inline-block;
              width: 30px;
              height: 30px;
              margin-bottom: 2px;
              vertical-align: middle;
              background-repeat: no-repeat;
              background-size: 100%;
              background-position: center;
              border-radius: 50%;
            }
          }
        }
      }
      .bg{
        position: absolute;
        width: 100%;
        height:100%;
        background-repeat: no-repeat;
        background-size: 150% auto;
        filter: blur(1px);
        overflow: hidden;
        // fixme: 层叠关系，重点分析~
        z-index: -1;
        .mask{
          position: absolute;
          left:0;
          top:0;
          width: 100%;
          height:100%;
          background-color: rgba(0,0,0,.5);
          z-index: 1;
        }
      }
    }
    .list-content{
      position: relative;
      margin: 0 10px 0 15px;
      padding-top: 10px;
      line-height: 19px;
      color: #666;
      .tag-wrapper{
        margin-bottom: 10px;
        line-height: 20px;
        margin-right: -10px;
        .tag{
          display: inline-block;
          margin-right: 10px;
          padding: 1px 8px;
          font-size: 12px;
          font-style: normal;
          border-radius: 9999px;
          border: 1px solid rgba(0,0,0,.1);
        }
      }
      .content{
        margin-bottom: 18px;
        line-height: 19px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &.active{
          -webkit-line-clamp: 9999;
        }
      }
    }
  }
  .song-list{
    margin-top: 10px;
    .title{
      height: 23px;
      line-height: 23px;
      padding: 0 10px;
      font-size: 12px;
      color: #666;
      background-color: #eeeff0;
    }
  }
  .control-wrapper{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 60px;
    padding: 0 20px;
    background-color: #fff;
    .play-all{
      display: inline-block;
      margin: auto;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      background-color: #d33a31;
      border-color: #d33a31;
      border-radius: 20px;
    }
  }
}
</style>
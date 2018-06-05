<template>
<div class="search">
  <scroll :data="songs" @scrollEnd="searchMore" ref="scroll" :is-init="isInit" :isOnScrollEnd="isOnScrollEnd">
    <div class="input-wrapper">
      <input-box placeholder="搜索歌曲、歌手、专辑" @query="onQueryChange" ref="input"></input-box>
    </div>
    <div class="hot-search">
      <div class="key-wrapper" v-show="!query">
        <h1 class="title">热门搜索</h1>
        <ul class="tags-wrapper">
          <li class="tag" v-for="(key, index) in hotKey" :key="index" @click="setQuery(key)">
            {{key}}
          </li>
        </ul>
        <ul class="search-history-wrapper">
          <li class="history" v-for="(key, index) in searchHistory" :key="index">
            <span class="icon"></span>
            <div class="key-wrapper">
              <span class="key">{{key}}</span>
              <i class="btn" @click="deleteSearch(key)"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="result-wrapper" v-show="query">
        <song-list :songs="songs" @select="play"></song-list>
        <p class="load-more">{{getTips}}</p>
      </div>
    </div>
  </scroll>
  <confirm rightText="知道了" titleText="购买" ref="confirm"></confirm>
</div>
</template>

<script type="text/ecmascript-6">
import InputBox from 'base/input-box/input-box'
import {getHotSearch, getSearchResult, getPerfectResult, getSongUrl} from 'api/song'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {controlHistory} from 'common/js/utils'

import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Confirm from 'base/confirm/confirm'

import {mapActions} from 'vuex'

export default {
  data() {
    return {
      query: '',
      hotKey: [],
      perfect: [],
      songs: [],
      queryObj: {
        keywords: '',
        limit: 30,
        offset: 0,
        canSearch: true
      },
      isInit: false,
      isOnScrollEnd: true,
      searchHistory: []
    }
  },
  computed: {
    getTips() {
      return this.queryObj.canSearch ? '加载更多' : '没有更多了'
    }
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    setQuery(key) {
      this.$refs.input.setQuery(key)
    },
    searchMore() {
      // fixme: 为什么scrollEnd发生在watch-query之前？？？
      if (!this.query || !this.queryObj) {
        return
      }

      let {keywords, limit, canSearch} = this.queryObj
      canSearch && this._getSearchResult(keywords, limit, ++this.queryObj.offset)
    },
    play(song) {
      this._getSongUrl(song, (songUrl) => {
        if (songUrl) {
          song.songUrl = songUrl
          this.insertSong(song)
        } else {
          this.$refs.confirm.show()
        }
      })
    },
    deleteSearch(key) {
      this.searchHistory = controlHistory.deleteData(key)
    },
    _getHotSearch() {
      getHotSearch().then((res) => {
        if (ERR_OK === res.code) {
          this.hotKey = this._genHotKey(res.result.hots)
        }
      })
    },
    _getPerfectResult(key) {
      getPerfectResult(key).then((res) => {
        if (ERR_OK === res.code) {
          let result = res.result

          // 存入歌手信息
          if (result.orders.indexOf('artist') !== -1) {
            result.artist.forEach((a) => {
              this.perfect.push({
                type: 'artist',
                id: a.id,
                name: a.name,
                picUrl: a.picUrl
              })
            })
          }

          // 存入专辑信息
          if (result.orders.indexOf('album') !== -1) {
            result.album.forEach((a) => {
              this.perfect.push({
                type: 'album',
                id: a.id,
                name: a.name,
                picUrl: a.picUrl
              })
            })
          }
        }
      })
    },
    _getSearchResult(key, limit, offset) {
      getSearchResult(key, limit, offset).then((res) => {
        if (ERR_OK === res.code) {
          let result = res.result
          this.queryObj.canSearch = (limit * offset + result.songs.length) < result.songCount

          this.songs = this.songs.concat(this._genSongs(result.songs))
        }
      })
    },
    _getSongUrl(song, callback) {
      getSongUrl(song.id).then((res) => {
        if (res.code === ERR_OK) {
          callback(res.data[0].url)
        }
      })
    },
    _genHotKey(hots) {
      return hots.map((h) => {
        return h.first
      })
    },
    _genSongs(songs) {
      return songs
        .map((song) => {
          if (song.duration === 0) {
            return null
          } else {
            return createSong({
              id: song.id,
              name: song.name,
              title: song.name,
              artists: song.artists,
              duration: song.duration,
              imgSrc: song.artists[0].img1v1Url,
              // 品质参数暂时不知道？
              quality: 1
            })
          }
        })
        .filter((song) => {
          return song !== null
        })
    },
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newKey) {
      // 处理scroll
      if (newKey) {
        // 保存搜索历史
        this.searchHistory = controlHistory.saveData(newKey)

        this.$refs.scroll.restart()
      } else {
        // 清除songs，并pause滚动对象~
        this.songs = []
        this.$refs.scroll.stop()
      }

      this.queryObj.keywords = newKey

      newKey && this._getPerfectResult(newKey)
      newKey && this._getSearchResult(newKey, this.queryObj.limit, this.queryObj.offset)
    }
  },
  created() {
    this._getHotSearch()
    this.searchHistory = controlHistory.loadData()
  },
  components: {
    InputBox,
    Scroll,
    SongList,
    Confirm
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/mixin";

  .search{
    position: fixed;
    top: 104px;
    bottom: 0;
    left: 0;
    right: 0;
    .input-wrapper{
      padding: 15px 10px;
      border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .hot-search{
      padding: 15px 10px 0;
      .key-wrapper{
        .title{
          font-size: 12px;
          line-height: 12px;
          color: #666;
        }
        .tags-wrapper{
          margin: 10px 0 7px;
          .tag{
            display: inline-block;
            height: 32px;
            margin-right: 8px;
            margin-bottom: 8px;
            padding: 0 14px;
            font-size: 14px;
            line-height: 32px;
            color: #333;
            border-radius: 16px;
            border: 1px solid rgba(0,0,0,.1);
          }
        }
        .search-history-wrapper{
          .history{
            display: flex;
            align-items: center;
            height: 45px;
            line-height: 45px;
            width: 100%;
            .icon{
              display: inline-block;
              margin: 0 10px;
              width: 15px;
              height: 15px;
              vertical-align: middle;
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJtMTUgMzBjLTguMjg0IDAtMTUtNi43MTYtMTUtMTVzNi43MTYtMTUgMTUtMTUgMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOGMtNy4xOCAwLTEzIDUuODItMTMgMTNzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzLTUuODItMTMtMTMtMTNtNyAxNmgtOGMtLjU1MiAwLTEtLjQ0Ny0xLTF2LTEwYzAtLjU1My40NDgtMSAxLTFzMSAuNDQ3IDEgMXY5aDdjLjU1MyAwIDEgLjQ0NyAxIDFzLS40NDcgMS0xIDEiLz48L3N2Zz4=);
              background-position: 0 0;
              background-size: contain;
              background-repeat: no-repeat;
            }
            .key-wrapper{
              display: flex;
              flex: 1 1 auto;
              align-items: center;
              border-bottom: 1px solid rgba(0,0,0,.1);
              .key{
                flex: 1 1 auto;
                padding-left: 5px;
              }
              .btn{
                display: inline-block;
                margin: 0 10px;
                width: 15px;
                height: 15px;
                vertical-align: middle;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJtMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdjLjM4MS4zODEuMzgxLjk5OCAwIDEuMzc5cy0uOTk4LjM4MS0xLjM3OCAwbC0xMC4zMzgtMTAuMzM4LTEwLjMzOCAxMC4zMzhjLS4zOC4zODEtLjk5Ny4zODEtMS4zNzggMHMtLjM4MS0uOTk4IDAtMS4zNzlsMTAuMzM4LTEwLjMzNy0xMC4zMzgtMTAuMzM4Yy0uMzgxLS4zOC0uMzgxLS45OTcgMC0xLjM3OHMuOTk4LS4zODEgMS4zNzggMGwxMC4zMzggMTAuMzM4IDEwLjMzOC0xMC4zMzhjLjM4LS4zODEuOTk3LS4zODEgMS4zNzggMHMuMzgxLjk5OCAwIDEuMzc4bC0xMC4zMzggMTAuMzM4Ii8+PC9zdmc+);
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
                .extend-click();
              }
            }
          }
        }
      }
      .result-wrapper{
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
  }
</style>

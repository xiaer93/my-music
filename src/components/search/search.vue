<template>
<div class="search">
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
    </div>
    <div class="result-wrapper" v-show="query">

    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import InputBox from 'base/input-box/input-box'
import {getHotSearch, getSearchResult} from 'api/song'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      query: '',
      hotKey: [],
      perfect: {},
      songs: []
    }
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    setQuery(key) {
      this.$refs.input.setQuery(key)
    },
    _getHotSearch() {
      getHotSearch().then((res) => {
        if (ERR_OK === res.code) {
          this.hotKey = this._genHotKey(res.result.hots)
        }
      })
    },
    _getSearchResult(key) {
      getSearchResult(key).then((res) => {
        console.log(res)
        if (ERR_OK === res.code) {
          console.log(res)
        }
      })
    },
    _genHotKey(hots) {
      return hots.map((h) => {
        return h.first
      })
    }
  },
  watch: {
    query(newKey) {
      newKey && this._getSearchResult(newKey)
    }
  },
  created() {
    this._getHotSearch()
  },
  components: {
    InputBox
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
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
    }
  }
</style>

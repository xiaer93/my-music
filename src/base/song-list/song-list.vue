<template>
<scroll class="song-list">
  <li class="song-list-item" v-for="(song, index) in songs" :key="index">
    <!--sl = song-list-->
    <div class="sl-infos">
      <p class="sl-infos-title">{{song.title}}</p>
      <p class="sl-infos-singer">
        <i class="sl-infos-quality" :class="getSongQuality(song.quality)"></i>
        {{song.singer}}
      </p>
    </div>
    <div class="sl-control">
      <span class="icon sl-control-icon"></span>
    </div>
  </li>
</scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getSongQuality(quality) {
      return ''
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/mixin";

  .song-list{
    padding-left: 10px;
    .song-list-item{
      display: flex;
      .sl-infos{
        flex: 1 1 auto;
        padding: 6px 0;
        .sl-infos-title{
          font-size: 17px;
          .no-wrap()
        }
        .sl-infos-singer{
          font-size: 12px;
          color: #888;
          .no-wrap()
          .sl-infos-quality{
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
          }
        }
      }
      .sl-control{
        padding: 0 10px;
      }
    }
  }
</style>

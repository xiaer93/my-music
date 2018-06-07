<template>
<ul class="song-list">
  <li class="song-list-item" v-for="(song, index) in songs" :key="index" @click.stop="selectItem(song)">
    <!--sl = song-list-->
    <div class="sl-number" v-if="hasNumber">{{index + 1}}</div>
    <div class="sl-infos">
      <p class="sl-infos-title">{{song.title || song.name}}</p>
      <p class="sl-infos-singer">
        <i class="icon" :class="getSongQuality(song.quality)" v-if="!hasNumber"></i>
        {{song.singer + ' - ' + song.name}}
    </p>
    </div>
    <div class="sl-control">
      <span class="icon sl-control-icon"></span>
    </div>
  </li>
</ul>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    songs: {
      type: Array,
      default: () => {
        return []
      }
    },
    hasNumber: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSongQuality(quality) {
      return (quality >= 1) ? 'sl-quality-sq sl-infos-quality' : ''
    },
    selectItem(song) {
      this.$emit('select', song)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/mixin";

  .song-list{
    box-sizing: border-box;
    width: 100%;
    .song-list-item{
      display: flex;
      width: 100%;
      border-bottom: 1px solid rgba(0,0,0,.1);
      .sl-number{
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 40px;
        font-size: 17px;
        color: #999;
      }
      .sl-infos{
        flex: 1 1 auto;
        padding: 6px 0;
        .sl-infos-title{
          max-width: 200px;
          font-size: 17px;
          .no-wrap();
          line-height: 1.8;
        }
        .sl-infos-singer{
          max-width: 200px;
          font-size: 12px;
          color: #888;
          .no-wrap();
          .sl-infos-quality{
            display: inline-block;
            width: 12px;
            height: 8px;
            margin-right: 4px;
          }
        }
      }
      .sl-control{
        flex: 0 0 auto;
        padding: 0 10px;
        display: flex;
        .icon{
          margin: auto;
        }
      }
    }
  }
</style>

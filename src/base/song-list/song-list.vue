<template>
<ul class="song-list">
  <li class="song-list-item" v-for="(song, index) in songs" :key="index" @click.stop="selectItem(song)">
    <!--sl = song-list-->
    <div class="sl-infos">
      <p class="sl-infos-title">{{song.name}}</p>
      <p class="sl-infos-singer">
        <i class="icon" :class="getSongQuality(song.quality)"></i>
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
    }
  },
  methods: {
    getSongQuality(quality) {
      return (quality >= 1) ? 'sl-quality-sq sl-infos-quality' : ''
    },
    selectItem(song) {
      console.log('song-list', song)
      this.$emit('select', song)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/mixin";

  .song-list{
    padding-left: 10px;
    .song-list-item{
      display: flex;
      border-bottom: 1px solid rgba(0,0,0,.1);
      .sl-infos{
        flex: 1 1 auto;
        padding: 6px 0;
        .sl-infos-title{
          font-size: 17px;
          .no-wrap();
          line-height: 1.8;
        }
        .sl-infos-singer{
          max-width: 250px;
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
        padding: 0 10px;
        display: flex;
        .icon{
          margin: auto;
        }
      }
    }
  }
</style>

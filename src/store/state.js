/**
 * Created by xiaer on 2018/6/2.
 */
import {STATE} from 'common/js/config'

const state = {
  playState: STATE.STATE_PAUSE,
  fullScene: STATE.INIT_SCREEN,
  playMode: STATE.MODE_CIRCLE,
  currentIndex: -1,

  playList: [],
  seqList: [],

  // 歌单id
  discId: -1
}

export default state

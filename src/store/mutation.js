/**
 * Created by xiaer on 2018/6/2.
 */
import * as types from './mutation-type'

const mutations = {
  [types.SET_PLAY_MODE](state, mode) {
    state.playMode = mode
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScene = flag
  },
  [types.SET_PLAY_STATE](state, flag) {
    state.playState = flag
  },
  [types.SET_SEQ_LIST](state, songList) {
    state.seqList = songList
  },
  [types.SET_PLAY_LIST](state, songList) {
    state.playList = songList
  },
  [types.SET_CURRENT_INDEX](state, index) {
    let total = state.playList.length
    if (index === -1) {
      index = total - 1
    }
    if (index === total) {
      index = 0
    }
    state.currentIndex = index
  },
  [types.SET_DISC_ID](state, id) {
    state.discId = id
  }
}

export default mutations

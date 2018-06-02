/**
 * Created by xiaer on 2018/6/2.
 */
import * as types from './mutation-type'
import {STATE} from 'common/js/config'

// 插入歌曲
export const insertSong = function ({commit, state}, song) {
  // let seqListb = state.seqList.slice()
  let playList = state.playList.slice()
  let currentIndex = state.currentIndex

  let index = findSong(playList, song)

  if (index === -1) {
    playList.push(song)
    currentIndex = playList.length - 1
  } else {
    currentIndex = index
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, STATE.MAX_SCREEN)
  commit(types.SET_PLAY_STATE, STATE.STATE_PLAYING)
}

function findSong(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

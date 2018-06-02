/**
 * Created by xiaer on 2018/6/2.
 */
export const playState = state => state.playState

export const fullScreen = state => state.fullScene

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

export const playList = state => state.playList

export const seqList = state => state.seqList

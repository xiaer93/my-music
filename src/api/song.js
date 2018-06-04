/**
 * Created by xiaer on 2018/5/31.
 */
import {ajax} from 'common/js/ajax'

export function getNewSong() {
  return ajax('/api/getNewSong')
}

export function getPicSong() {
  return ajax('/api/getPicSong')
}

export function getHotSong(index) {
  return ajax('/api/getHotSong', {
    idx: index
  })
}

export function getSongUrl(id) {
  return ajax('/api/getSongUrl', {
    id: id
  })
}

export function getSongComment(id, limit) {
  return ajax('/api/getSongComment', {
    id,
    limit
  })
}

export function getPlayListDetail(id) {
  return ajax('/api/getPlayListDetail', {
    id
  })
}

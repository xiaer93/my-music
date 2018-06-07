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

export function getSongLyric(id) {
  return ajax('/api/getSongLyric', {
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

export function getHotSearch() {
  return ajax('/api/getHotSearch')
}

// 支持参数：limit、offset、type
export function getSearchResult(keywords) {
  return ajax('/api/getSearchResult', {
    keywords
  })
}

export function getPerfectResult(keywords, limit, offset) {
  return ajax('/api/getPerfectResult', {
    keywords,
    limit,
    offset
  })
}

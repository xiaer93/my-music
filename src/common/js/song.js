/**
 * Created by xiaer on 2018/6/1.
 */
class Song {
  constructor({id, name, title, artists, duration, imgSrc, quality}) {
    this.id = id
    this.name = name
    this.title = title
    this.singer = getSinger(artists)
    this.duration = duration
    this.imgSrc = imgSrc
    this.quality = quality
  }
}

function getSinger(artists) {
  if (artists.length < 2) {
    return artists[0].name
  } else {
    // fixme: 如果未指定初始值，则使用数组第一个元素作为retName对象~
    return artists.reduce((retName, singer) => {
      return `${retName.name}/${singer.name}`
    })
  }
}

export function createSong(infos) {
  return new Song(infos)
}

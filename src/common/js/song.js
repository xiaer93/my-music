/**
 * Created by xiaer on 2018/6/1.
 */
class Song {
  constructor({id, mid, name, artists, duration, album, quality}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.singer = getSinger(artists)
    this.duration = duration
    this.album = album
    this.quality = quality
  }
}

function getSinger(artists) {
  return artists.reduce((retName, singer) => {
    console.log(`${retName}-${singer._name}`)
    return `${retName}-${singer._name}`
  })
}

export function createSong(infos) {
  return new Song(infos)
}

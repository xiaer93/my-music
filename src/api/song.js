/**
 * Created by xiaer on 2018/5/31.
 */
import {ajax} from 'common/js/ajax'

export function getNewSong() {
  return ajax('/api/getNewSong')
}

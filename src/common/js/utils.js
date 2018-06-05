/**
 * Created by xiaer on 2018/6/4.
 */
export const debounce = function (fn, time) {
  let timer

  return function (...args) {
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}

// 存储localStorage---以key值
class ControlData {
  constructor(id) {
    this._id = id
  }
  saveData(value) {
    let data = localStorage.getItem(this._id)
    data = data ? JSON.parse(data) : []

    // 如果已经存储了则直接返回~
    if (data.length !== 0 && data.indexOf(value) !== -1) {
      return data
    }

    data.push(value)
    localStorage.setItem(this._id, JSON.stringify(data))

    return data
  }
  deleteData(value) {
    let data = localStorage.getItem(this._id)
    data = data ? JSON.parse(data) : []

    // 如果已经存储了则直接删除返回~
    if (data.length !== 0) {
      let index = data.indexOf(value)
      if (index !== -1) {
        data.splice(index, 1)
        localStorage.setItem(this._id, JSON.stringify(data))
        return data
      }
    }

    return data
  }
  loadData() {
    let data = localStorage.getItem(this._id)
    data = data ? JSON.parse(data) : {}

    return data
  }
}

const HISTORY_KEY = '__HISTORY_KEY__'

export const controlHistory = new ControlData(HISTORY_KEY)

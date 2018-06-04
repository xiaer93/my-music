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

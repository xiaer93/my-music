/**
 * Created by xiaer on 2018/5/31.
 */
import axios from 'axios'
// import $ from 'jquery'

// 封装ajax请求，并获取data
export function ajax(url, data) {
  return axios.get(url, {
    params: data
  })
    .then((res) => {
    // promise().resolve
      return Promise.resolve(res.data)
    })
    .catch((e) => {
      console.log(e)
    })
}

import axios from 'axios'

// const HTTP_PRO = '//mn.dev.ziseyiliao.com/'

// export default {
//   fetch (obj) {
//     let promise = axios({
//       method: 'get',
//       url: HTTP_PRO + obj.url,
//       params: obj.data || ''
//     })
//     return promise
//   }
// }

export default {
  fetch (obj) {
    let promise = axios({
      method: 'get',
      url: obj.url,
      params: obj.data || ''
    })
    return promise
  }
}


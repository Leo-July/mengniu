import axios from 'axios'

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


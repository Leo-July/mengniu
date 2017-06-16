import axios from 'axios'
import utils from '@/utils/utils'

export const DBU = false
export const HTTP_DEV = '//www.easy-mock.com/mock/593e08c38ac26d795fe48c00/mengniu/'
export const HTTP_PRO = '//mn.dev.ziseyiliao.com/'

export default{
  config () {
    axios.defaults.baseURL = DBU ? HTTP_DEV : HTTP_PRO
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.timeout = 5000
    axios.interceptors.request.use(function (config) {
      utils.showLoading()
      return config
    }, function (error) {
      utils.hideLoading()
      utils.tipInfo({error: error})
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function (response) {
      utils.hideLoading()
      if (parseInt(response.data.code) !== 1) {
        utils.tipInfo({error: response.data.message})
      }
      return response
    }, function (error) {
      utils.hideLoading()
      utils.tipInfo({error: error})
      return Promise.reject(error)
    })
  }
}

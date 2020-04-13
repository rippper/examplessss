/**
 * ajax请求
 */
import axios from 'axios'
import qs from 'qs'
import { Toast, Indicator } from 'mint-ui'
import { isBindWechat, pathname } from './config'
import { getStore } from '../plugins/utils'

let timeLimit = true
axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//拦截器
axios.interceptors.request.use(config => {
  // 将aspxauth添加到请求头
  let aspxauth = window.sessionStorage.getItem('ASPXAUTH')
  if (aspxauth) {
    config.headers.ASPXAUTH = aspxauth
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  Indicator.close()
  // 如果http状态码正常，则直接返回数据
  if (response) {
    if (timeLimit) {
      //用户掉线
      if (response.data.Type == 401) {
        timeLimit = false
        var currentUrl = getStore('currentUrl')
        window.sessionStorage.removeItem('ASPXAUTH')
        if (getStore('userAgent').weixin && isBindWechat) {
          Toast({ message: '账号掉线，请重新登录', position: 'bottom' })
          window.location.href = getStore('wxLoginUrl')
        } else {
          Toast({ message: '账号掉线，请重新登录', position: 'bottom' })
          var loginUrl = (pathname ? `${pathname}#/login?currentUrl=` : '/#/login?currentUrl=') + encodeURIComponent(currentUrl)
          window.location.href = loginUrl
        }
      } else if (response.data.Type != 1 && response.status !== 200) {
        console.warn(`status:${response.status},statusText:${response.statusText}`)
        console.warn(response.data.Message)
      }
      let timer = setTimeout(() => {
        timeLimit = true
        clearTimeout(timer)
      }, 1000)
    }
    //存储aspxauth身份验证
    let aspxauth = response.headers.aspxauth || response.headers.ASPXAUTH
    if (aspxauth) {
      window.localStorage.setItem('ASPXAUTH', aspxauth)
    }
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常：' + response.data.Message
  }
}

function checkCode (res) {
  Indicator.close()
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data)
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      () => {
        Indicator.close()
        Toast({ message: '服务器异常', position: 'bottom' })
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params: params
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch(
      () => {
        Indicator.close()
        Toast({ message: '服务器异常', position: 'bottom' })
      }
    )
  }
}

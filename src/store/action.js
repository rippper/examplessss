import { GetUserInfo } from '../service/getData'
import { setSession, userAgent } from '../plugins/utils'
import { GET_USERINFO, GET_USERAGENT } from './mutation-types.js'
import { Toast } from 'mint-ui'

export default {
  async getUserInformation ({ state, commit }, payload) {
    let res = await GetUserInfo(payload)
    if (res.Type === 1) {
      setSession('userInfo', res.Data)
      commit(GET_USERINFO, res.Data)
    } else if (res.Type != 401) {
      Toast({ message: res.Message, position: 'bottom' })
      window.sessionStorage.removeItem('ASPXAUTH')
    }
  },
  getUserAgent ({ state, commit }, payload) {
    let data = userAgent()
    commit(GET_USERAGENT, data)
  }
}

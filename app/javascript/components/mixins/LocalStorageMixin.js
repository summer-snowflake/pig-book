export default {
  saveAuthenticationData(lastRequestAt, userToken) {
    localStorage.setItem('lastRequestAt', lastRequestAt)
    localStorage.setItem('userToken', userToken)
  },

  getLastRequestAt() {
    return localStorage.getItem('lastRequestAt')
  },

  getUserToken() {
    return localStorage.getItem('userToken')
  }
}

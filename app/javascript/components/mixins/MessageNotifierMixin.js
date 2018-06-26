import i18n from './../plugins/i18n'

export default {
  noticeAddMessage() {
    this.setState({
      message: i18n.t('message.add'),
      success: true
    })
  },

  noticeUpdatedMessage() {
    this.setState({
      message: i18n.t('message.updated'),
      success: true
    })
  },

  noticeDestroyedMessage() {
    this.setState({
      message: i18n.t('message.destroyed'),
      success: true
    })
  },

  noticeErrorMessages(error) {
    switch(error.response.status) {
    case 422:
      this.setState({
        errorMessages: error.response.data.error_messages
      })
      break
    case 401:
      window.location.href = '/users/sign_in'
    default:
      this.setState({
        message: error.response.data.error_message,
        success: false
      })
    }
  }
}

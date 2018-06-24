import i18n from './../plugins/i18n'

export default {
  noticeUpdatedMessage() {
    this.setState({
      message: i18n.t('message.updated'),
      success: true
    })
  }
}

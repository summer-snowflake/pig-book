import React from 'react'

import i18n from './../plugins/i18n'
import AlertMessage from './../common/AlertMessage'

export default {
  getInitialState() {
    return {
      message: '',
      success: false
    }
  },

  renderAlertMessage() {
    return (
      <AlertMessage message={this.state.message} success={this.state.success} />
    )
  },

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

  noticeCompletedMessage() {
    this.setState({
      message: i18n.t('message.completed'),
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
      this.setState({
        message: error.response.data.error_message,
        success: false
      })
      window.location.href = '/users/sign_in'
      break
    default:
      this.setState({
        message: error.response.data.error_message,
        success: false
      })
    }
  }
}

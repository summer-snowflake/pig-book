import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import UpdateButton from './../common/UpdateButton'
import CancelButton from './../common/CancelButton'

class MemoCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      isEditing: false,
      memo: this.props.memo,
      editingMemo: this.props.memo,
      errorMessages: {}
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleChangeMemo(e) {
    this.setState({
      editingMemo: e.target.value
    })
  }

  handleClickUpdateButton() {
    let profile = {}
    profile.memo = this.state.editingMemo
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'PATCH',
      url: origin + '/api/base_setting',
      params: Object.assign(profile, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.setState({
          isEditing: false,
          memo: this.state.editingMemo
        })
        this.noticeUpdatedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  handleClickCancelButton() {
    this.setState({
      isEditing: false
    })
  }

  render() {
    return (
      <div className='memo-card-body-component'>
        {this.renderAlertMessage()}
        {this.state.isEditing ? (
          <div className='mypage-memo'>
            <div className='form-group'>
              <textarea className='form-control' onChange={this.handleChangeMemo} rows='4' value={this.state.editingMemo} />
            </div>
            <div className='form-group'>
              <UpdateButton onClickButton={this.handleClickUpdateButton} />
              <CancelButton onClickButton={this.handleClickCancelButton} />
            </div>
          </div>
        ) : (
          <div className='mypage-memo'>
            <div className='memo-edit-line'>
              <span className='memo-edit-icon' onClick={this.handleClickEditIcon}>
                <i className='fas fa-edit' />
              </span>
            </div>
            <span><pre>{this.state.memo}</pre></span>
          </div>
        )}
      </div>
    )
  }
}
MemoCardBody.propTypes = {
  memo: PropTypes.string.isRequired
}

reactMixin.onClass(MemoCardBody, MessageNotifierMixin)
reactMixin.onClass(MemoCardBody, LocalStorageMixin)

export default MemoCardBody

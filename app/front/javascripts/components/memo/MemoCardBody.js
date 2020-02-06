import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import UpdateButton from './../common/UpdateButton'
import CancelButton from './../common/CancelButton'
import { profileAxios } from './../mixins/requests/BaseSettingMixin'

class MemoCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      memo: this.props.memo,
      editingMemo: this.props.memo,
      errorMessages: {}
    }
    this.patchMemo = this.patchMemo.bind(this)
    this.patchMemoCallback = this.patchMemoCallback.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickSubmitButton() {
    this.patchMemo()
  }

  handleChangeMemo(e) {
    this.setState({
      editingMemo: e.target.value
    })
  }

  patchMemoCallback() {
    this.setState({
      isEditing: false,
      memo: this.state.editingMemo
    })
    this.noticeUpdatedMessage()
  }

  patchMemo() {
    let profile = {}
    profile.memo = this.state.editingMemo
    this.setState({
      message: '',
      errorMessages: {}
    })
    profileAxios.patch(profile, this.patchMemoCallback, this.noticeErrorMessages)
  }

  handleClickCancelButton() {
    this.setState({
      isEditing: false
    })
  }

  render() {
    return (
      <div className='memo-card-body-component'>
        <span className='memo-title'>
          <i className='fas fa-book-open left-icon' />
          {'MEMO'}
        </span>
        {this.renderAlertMessage()}
        {this.state.isEditing ? (
          <div className='mypage-memo'>
            <div className='form-group'>
              <textarea className='form-control' onChange={this.handleChangeMemo} rows='5' value={this.state.editingMemo} />
            </div>
            <div className='form-group'>
              <UpdateButton onClickButton={this.handleClickSubmitButton} />
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
            <div className='memo-body'>
              <pre>{this.state.memo}</pre>
            </div>
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

export default MemoCardBody

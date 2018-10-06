import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import UpdateButton from './../common/UpdateButton'
import CancelButton from './../common/CancelButton'
import { profileMxios } from './../mixins/requests/BaseSettingMixin'

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
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
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
    profileAxios.patch(profile, this.patchMemoCallback, this.noticeErrorMessage)
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
              <UpdateButton onClickButton={this.patchMemo} />
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

export default MemoCardBody

import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import UpdateButton from './../common/UpdateButton'
import AlertMessage from './../common/AlertMessage'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import AddButton from './../common/AddButton'

class ImportHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      isEditing: false,
      row: this.props.history.row,
      message: '',
      success: false,
      errorMessages: {}
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeRow = this.handleChangeRow.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleClickAddCategoryButton = this.handleClickAddCategoryButton.bind(this)
    this.postCategory = this.postCategory.bind(this)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickCancelIcon() {
    this.setState({
      isEditing: false
    })
  }

  handleChangeRow(e) {
    this.setState({
      row: e.target.value
    })
  }

  handleClickUpdateButton() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      row: this.state.row
    }
    let options = {
      method: 'PATCH',
      url: origin + '/api/import_histories/' + this.props.history.id,
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.setState({
          isEditing: false
        })
        this.props.getImportHistories()
        this.noticeUpdatedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  handleClickAddCategoryButton() {
    this.postCategory({name: this.props.history.category_name})
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/categories',
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.props.getImportHistories()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <tr className='import-history-component'>
        {this.state.isEditing ? (
          <td className='left-edit-target'>
            <input className='form-control' onChange={this.handleChangeRow} type='text' value={this.state.row} />
            <FormErrorMessages column='row' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='left-edit-target'>
            {this.props.history.row}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target button-td'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='center-edit-target' />
        )}
        {this.state.isEditing ? (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        ) : (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td>
          {this.props.history.messages}
          {this.props.history.category_required && (
            <div className='text-right'>
              <span className='target-name'>
                {'カテゴリ名：'}
                {(this.props.history || {}).category_name}
              </span>
              <span>
                <AddButton onClickButton={this.handleClickAddCategoryButton} />
              </span>
            </div>
          )}
          <AlertMessage message={this.state.message} success={this.state.success} />
        </td>
      </tr>
    )
  }
}

ImportHistory.propTypes = {
  history: PropTypes.object.isRequired,
  getImportHistories: PropTypes.func.isRequired

}

reactMixin.onClass(ImportHistory, MessageNotifierMixin)
reactMixin.onClass(ImportHistory, LocalStorageMixin)

export default ImportHistory

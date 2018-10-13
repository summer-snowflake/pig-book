import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import UpdateButton from './../common/UpdateButton'
import AddButton from './../common/AddButton'
import CreateButton from './../common/CreateButton'
import { importHistoryAxios } from './../mixins/requests/ImportHistoriesMixin'

class ImportHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      row: this.props.history.row,
      errorMessages: {}
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleChangeRow = this.handleChangeRow.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.handleClickAddCategoryButton = this.handleClickAddCategoryButton.bind(this)
    this.handleClickAddBreakdownButton = this.handleClickAddBreakdownButton.bind(this)
    this.handleClickAddPlaceButton = this.handleClickAddPlaceButton.bind(this)
    this.handleClickAddTagsButton = this.handleClickAddTagsButton.bind(this)
    this.handleClickCreateRecordButton = this.handleClickCreateRecordButton.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.postCategoryCallback = this.postCategoryCallback.bind(this)
    this.postBreakdown = this.postBreakdown.bind(this)
    this.postBreakdownCallback = this.postBreakdownCallback.bind(this)
    this.postPlace = this.postPlace.bind(this)
    this.postPlaceCallback = this.postPlaceCallback.bind(this)
    this.postTags = this.postTags.bind(this)
    this.postTagsCallback = this.postTagsCallback.bind(this)
    this.postRecord = this.postRecord.bind(this)
    this.postRecordCallback = this.postRecordCallback.bind(this)
    this.patchImportHistory = this.patchImportHistory.bind(this)
    this.patchImportHistoryCallback = this.patchImportHistoryCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
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
    this.patchImportHistory()
  }

  patchImportHistoryCallback() {
    this.setState({
      isEditing: false
    })
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeUpdatedMessage()
  }

  patchImportHistory() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      row: this.state.row
    }
    importHistoryAxios.patch(this.props.history.id, params, this.patchImportHistoryCallback, this.noticeErrorMessage)
  }

  handleClickAddCategoryButton() {
    this.postCategory()
  }

  postCategoryCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeAddMessage()
  }

  postCategory() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    importHistoryAxios.postCategory(this.props.history.id, this.postCategoryCallback, this.noticeErrorMessage)
  }

  handleClickAddBreakdownButton() {
    this.postBreakdown()
  }

  postBreakdownCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeAddMessage()
  }

  postBreakdown() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    importHistoryAxios.postBreakdown(this.props.history.id, this.postBreakdownCallback, this.noticeErrorMessage)
  }

  handleClickAddPlaceButton() {
    this.postPlace()
  }

  handleClickCreateRecordButton() {
    this.postRecord()
  }

  postRecordCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeAddMessage()
  }

  postRecord() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    importHistoryAxios.postRecord(this.props.history.id, this.postRecordCallback, this.noticeErrorMessage)
  }

  postPlaceCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeAddMessage()
  }

  postPlace() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    importHistoryAxios.postPlace(this.props.history.id, this.postPlaceCallback, this.noticeErrorMessage)
  }

  handleClickAddTagsButton() {
    this.postTags()
  }

  postTagsCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeAddMessage()
  }

  postTags() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    importHistoryAxios.postTags(this.props.history.id, this.postTagsCallback, this.noticeErrorMessage)
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
        {this.state.isEditing && (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        )}
        {!this.state.isEditing && this.props.activeLink != 'registered' && (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td>
          {this.props.history.messages || this.props.activeLink == 'registered' || (this.props.history.status_name == 'registered' && this.props.activeLink == 'all') ? (
            <span>{this.props.history.messages}</span>
          ) : (
            <CreateButton onClickButton={this.handleClickCreateRecordButton} />
          )}
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
          {!this.props.history.category_required && this.props.history.breakdown_required && (
            <div className='text-right space-bottom'>
              <span className='target-name'>
                {'内訳：'}
                {(this.props.history || {}).breakdown_name}
              </span>
              <span>
                <AddButton onClickButton={this.handleClickAddBreakdownButton} />
              </span>
            </div>
          )}
          {!this.props.history.category_required && this.props.history.place_required && (
            <div className='text-right space-bottom'>
              <span className='target-name'>
                {'お店・施設名：'}
                {(this.props.history || {}).place_name}
              </span>
              <span>
                <AddButton onClickButton={this.handleClickAddPlaceButton} />
              </span>
            </div>
          )}
          {this.props.history.tags_required && (
            <div className='text-right space-bottom'>
              <span className='target-name'>
                {'ラベル：'}
                {(this.props.history || {}).tags_name}
              </span>
              <span>
                <AddButton onClickButton={this.handleClickAddTagsButton} />
              </span>
            </div>
          )}
          {this.renderAlertMessage()}
        </td>
      </tr>
    )
  }
}

ImportHistory.propTypes = {
  history: PropTypes.object.isRequired,
  getImportHistories: PropTypes.func.isRequired,
  getImportHistoriesWithStatus: PropTypes.func.isRequired,
  activeLink: PropTypes.string.isRequired
}

reactMixin.onClass(ImportHistory, MessageNotifierMixin)

export default ImportHistory

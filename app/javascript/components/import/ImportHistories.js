import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { importHistoryAxios } from './../mixins/requests/ImportHistoriesMixin'
import ImportHistory from './ImportHistory'
import DestroyModal from './../common/DestroyModal'

class ImportHistories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      importHistory: {
        id: null
      },
      modalIsOpen: false
    }
    this.getImportHistoriesWithStatus = this.getImportHistoriesWithStatus.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.deleteImportHistory = this.deleteImportHistory.bind(this)
    this.deleteImportHistoryCallback = this.deleteImportHistoryCallback.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  getImportHistoriesWithStatus(activeLink) {
    this.props.getImportHistoriesWithStatus(activeLink)
  }

  onClickDestroyButton() {
    this.deleteImportHistory()
  }

  handleClickTrashIcon(importHistory) {
    this.setState({
      importHistory: importHistory,
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  deleteImportHistoryCallback() {
    this.props.getImportHistoriesWithStatus(this.props.activeLink)
    this.noticeDestroyedMessage()
    this.setState({
      modalIsOpen: false
    })
  }

  deleteImportHistory() {
    importHistoryAxios.delete(this.state.importHistory.id, this.deleteImportHistoryCallback, this.noticeErrorMessages)
  }

  render() {
    return (
      <div className='import-histories-component'>
        <table className='table'>
          <tbody>
            {this.props.histories.map((history) => (
              <ImportHistory
                activeLink={this.props.activeLink}
                getImportHistories={this.props.getImportHistories}
                getImportHistoriesWithStatus={this.getImportHistoriesWithStatus}
                history={history}
                isLoading={this.props.isLoading}
                key={history.id}
                onClickTrashIcon={this.handleClickTrashIcon}
                onLoad={this.props.onLoad}
              />
            ))}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.importHistory} modalIsOpen={this.state.modalIsOpen} />
      </div>
    )
  }
}

ImportHistories.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activeLink: PropTypes.string.isRequired,
  histories: PropTypes.array.isRequired,
  getImportHistories: PropTypes.func.isRequired,
  getImportHistoriesWithStatus: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
}

reactMixin.onClass(ImportHistories, MessageNotifierMixin)

export default ImportHistories

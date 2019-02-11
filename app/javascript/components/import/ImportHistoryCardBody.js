import React from 'react'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import ImportHistories from './ImportHistories'
import ImportHistoriesRenameForm from './ImportHistoriesRenameForm'
import { importHistoriesAxios, importHistoriesCountAxios } from './../mixins/requests/ImportHistoriesMixin'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      histories: [],
      activeLink: 'unregistered',
      unregisteredLength: 0,
      isLoadingList: true,
      isLoadingButton: false,
      updatedIds: [],
      errorMessages: {}
    }
    this.getImportHistories = this.getImportHistories.bind(this)
    this.getImportHistoriesCallback = this.getImportHistoriesCallback.bind(this)
    this.getImportHistoriesWithStatus = this.getImportHistoriesWithStatus.bind(this)
    this.getImportHistoriesWithStatusCallback = this.getImportHistoriesWithStatusCallback.bind(this)
    this.getImportHistoriesCount = this.getImportHistoriesCount.bind(this)
    this.getImportHistoriesCountCallback = this.getImportHistoriesCountCallback.bind(this)
    this.handleClickUnregisteredTab = this.handleClickUnregisteredTab.bind(this)
    this.handleClickRegisteredTab = this.handleClickRegisteredTab.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
    this.handleClickRenameButton = this.handleClickRenameButton.bind(this)
    this.postImportHistories = this.postImportHistories.bind(this)
    this.postImportHistoriesCallback = this.postImportHistoriesCallback.bind(this)
  }

  componentWillMount() {
    this.getImportHistoriesWithStatus('unregistered')
  }

  handleLoad() {
    this.setState({
      isLoadingButton: true
    })
  }

  handleClickUnregisteredTab() {
    this.setState({
      activeLink: 'unregistered',
      isLoadingList: true
    })
    this.getImportHistoriesWithStatus('unregistered')
  }

  handleClickRegisteredTab() {
    this.setState({
      activeLink: 'registered',
      isLoadingList: true
    })
    this.getImportHistoriesWithStatus('registered')
  }

  getImportHistoriesCallback(res) {
    this.getImportHistoriesCount()
    this.setState({
      histories: res.data,
      isLoadingList: false,
      isLoadingButton: false
    })
  }

  getImportHistories() {
    importHistoriesAxios.get(this.getImportHistoriesCallback, this.noticeErrorMessages)
  }

  getImportHistoriesCountCallback(res) {
    this.setState({
      unregisteredLength: res.data
    })
  }

  getImportHistoriesCount() {
    importHistoriesCountAxios.get(this.getImportHistoriesCountCallback, this.noticeErrorMessages)
  }

  getImportHistoriesWithStatusCallback(res) {
    this.getImportHistoriesCount()
    this.setState({
      histories: res.data,
      isLoadingList: false,
      isLoadingButton: false
    })
  }

  getImportHistoriesWithStatus(statusName) {
    importHistoriesAxios.getWithStatus(statusName, this.getImportHistoriesWithStatusCallback, this.noticeErrorMessages)
  }

  handleClickRenameButton(params) {
    this.setState({
      isEditing: true
    })
    this.postImportHistories(params)
  }

  postImportHistories(params) {
    importHistoriesAxios.post(params, this.postImportHistoriesCallback, this.noticeErrorMessages)
  }

  postImportHistoriesCallback(res) {
    this.setState({
      isEditing: false,
      updatedIds: res.data
    })
  }

  render() {
    return (
      <div className='import-history-card-body-component'>
        <ImportHistoriesRenameForm errorMessages={this.state.errorMessages} isEditing={this.state.isEditing} onClickButton={this.handleClickRenameButton} updatedIds={this.state.updatedIds} />
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className={'nav-link' + (this.state.activeLink == 'unregistered' ? ' active' : '')} href='#' onClick={this.handleClickUnregisteredTab}>
              {'未登録'}
              {this.state.unregisteredLength > 0 && (
                <span className='right-icon'>
                  <span className='badge badge-light'>{this.state.unregisteredLength}</span>
                </span>
              )}
            </a>
          </li>
          <li className='nav-item'>
            <a className={'nav-link' + (this.state.activeLink == 'registered' ? ' active' : '')} href='#' onClick={this.handleClickRegisteredTab}>{'登録済み'}</a>
          </li>
        </ul>
        {this.state.isLoadingList ? (
          <div className='pig-loading-image' />
        ) : (
          <ImportHistories activeLink={this.state.activeLink} getImportHistories={this.getImportHistories} getImportHistoriesWithStatus={this.getImportHistoriesWithStatus} histories={this.state.histories} isLoading={this.state.isLoadingButton} onLoad={this.handleLoad} />
        )}
      </div>
    )
  }
}

reactMixin.onClass(ImportHistoryCardBody, MessageNotifierMixin)

export default ImportHistoryCardBody

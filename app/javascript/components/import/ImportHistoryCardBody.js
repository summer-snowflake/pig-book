import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import ImportHistories from './ImportHistories'
import { importHistoriesAxios, importHistoriesCountAxios } from './../mixins/requests/ImportHistoriesMixin'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      histories: this.props.histories,
      activeLink: 'all',
      unregisteredLength: 0,
      isLoadingList: false,
      isLoadingButton: false
    }
    this.getImportHistories = this.getImportHistories.bind(this)
    this.getImportHistoriesCallback = this.getImportHistoriesCallback.bind(this)
    this.getImportHistoriesWithStatus = this.getImportHistoriesWithStatus.bind(this)
    this.getImportHistoriesWithStatusCallback = this.getImportHistoriesWithStatusCallback.bind(this)
    this.getImportHistoriesCount = this.getImportHistoriesCount.bind(this)
    this.getImportHistoriesCountCallback = this.getImportHistoriesCountCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
    this.handleClickAllTab = this.handleClickAllTab.bind(this)
    this.handleClickUnregisteredTab = this.handleClickUnregisteredTab.bind(this)
    this.handleClickRegisteredTab = this.handleClickRegisteredTab.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentWillMount() {
    this.getImportHistories()
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  handleLoad() {
    this.setState({
      isLoadingButton: true
    })
  }

  handleClickAllTab() {
    this.setState({
      activeLink: 'all',
      isLoadingList: true
    })
    this.getImportHistories()
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
    importHistoriesAxios.get(this.getImportHistoriesCallback, this.noticeErrorMessage)
  }

  getImportHistoriesCountCallback(res) {
    this.setState({
      unregisteredLength: res.data
    })
  }

  getImportHistoriesCount() {
    importHistoriesCountAxios.get(this.getImportHistoriesCountCallback, this.noticeErrorMessage)
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
    importHistoriesAxios.getWithStatus(statusName, this.getImportHistoriesWithStatusCallback, this.noticeErrorMessage)
  }

  render() {
    return (
      <div className='import-history-card-body-component'>
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className={'nav-link' + (this.state.activeLink == 'all' ? ' active' : '')} href='#' onClick={this.handleClickAllTab}>
              {'すべて'}
            </a>
          </li>
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

ImportHistoryCardBody.propTypes = {
  histories: PropTypes.array.isRequired
}

reactMixin.onClass(ImportHistoryCardBody, MessageNotifierMixin)

export default ImportHistoryCardBody

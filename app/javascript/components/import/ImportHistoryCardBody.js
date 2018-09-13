import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import ImportHistories from './ImportHistories'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class ImportHistoryCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      histories: this.props.histories,
      activeLink: 'all'
    }
    this.getImportHistories = this.getImportHistories.bind(this)
    this.handleClickAllTab = this.handleClickAllTab.bind(this)
    this.handleClickUnregisteredTab = this.handleClickUnregisteredTab.bind(this)
    this.handleClickRegisteredTab = this.handleClickRegisteredTab.bind(this)
  }

  componentWillMount() {
    this.getImportHistories()
  }

  handleClickAllTab() {
    this.setState({
      activeLink: 'all'
    })
    this.getImportHistories()
  }

  handleClickUnregisteredTab() {
    this.setState({
      activeLink: 'unregistered'
    })
  }

  handleClickRegisteredTab() {
    this.setState({
      activeLink: 'registered'
    })
  }

  getImportHistories() {
    let options = {
      method: 'GET',
      url: origin + '/api/import_histories',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          histories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
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
              {this.state.histories.length > 0 && (
                <span className='right-icon'>
                  <span className='badge badge-light'>{this.state.histories.length}</span>
                </span>
              )}
            </a>
          </li>
          <li className='nav-item'>
            <a className={'nav-link' + (this.state.activeLink == 'registered' ? ' active' : '')} href='#' onClick={this.handleClickRegisteredTab}>{'登録済み'}</a>
          </li>
        </ul>
        <ImportHistories getImportHistories={this.getImportHistories} histories={this.state.histories} />
      </div>
    )
  }
}

ImportHistoryCardBody.propTypes = {
  histories: PropTypes.array.isRequired
}

reactMixin.onClass(ImportHistoryCardBody, MessageNotifierMixin)
reactMixin.onClass(ImportHistoryCardBody, LocalStorageMixin)

export default ImportHistoryCardBody

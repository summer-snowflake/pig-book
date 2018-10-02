import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'
import moment from 'moment'

import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './Records'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import DateMonthFormat from './../common/DateMonthFormat'

class RecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      year: moment(this.props.month).year(),
      month: this.props.month,
      errorMessages: {},
      records: this.props.records
    }
    this.getRecords = this.getRecords.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.handleClickPreviousButton = this.handleClickPreviousButton.bind(this)
    this.handleClickNextButton = this.handleClickNextButton.bind(this)
  }

  componentWillMount() {
    this.getRecords(this.state.month)
  }

  handleClickPreviousButton() {
    let m = moment(this.props.month)
    let month = m.add(-1, 'months').month() + 1
    let year = m.year()
    if (month == -1) {
      year -= 1
    }
    location.href = 'records?year=' + year + '&month=' + month
  }

  handleClickNextButton() {
    let m = moment(this.props.month)
    let month = m.add(1, 'months').month() + 1
    let year = m.year()
    if (month == 13) {
      year += 1
    }
    location.href = 'records?year=' + year + '&month=' + month
  }

  getRecords(month) {
    let targetDate = moment(month)
    let options = {
      method: 'GET',
      url: origin + '/api/records',
      params: {
        last_request_at: this.state.lastRequestAt,
        month: String(targetDate)
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          records: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/records/' + recordId,
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getRecords(this.state.month)
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  onClickEditIcon() {
    // TODO
  }

  render() {
    return (
      <div className='records-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        {this.props.month && (
          <div className='records-list-title'>
            <button className='btn btn-primary btn-sm float-left' onClick={this.handleClickPreviousButton}>
              <i className='fas fa-chevron-left' />
            </button>
            <span><DateMonthFormat targetDate={moment(this.props.month)} /></span>
            <button className='btn btn-primary btn-sm float-right' onClick={this.handleClickNextButton}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
        )}
        <Records
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.onClickEditIcon}
          isListPage
          records={this.state.records}
        />
      </div>
    )
  }
}

RecordsCardBody.propTypes = {
  month: PropTypes.string,
  records: PropTypes.array.isRequired
}

reactMixin.onClass(RecordsCardBody, MessageNotifierMixin)
reactMixin.onClass(RecordsCardBody, LocalStorageMixin)

export default RecordsCardBody

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
      message: '',
      success: false,
      errorMessages: {},
      records: this.props.records
    }
    this.getRecords = this.getRecords.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
  }

  componentWillMount() {
    this.getRecords()
  }

  getRecords() {
    let targetDate = moment()
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
        this.getRecords()
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
          <span className='records-list-title'>
            <DateMonthFormat targetDate={moment(this.props.month)} />
          </span>
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

import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import moment from 'moment'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './Records'
import DateMonthFormat from './../common/DateMonthFormat'
import { recordsAxios } from './../mixins/requests/RecordsMixin'

class RecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: moment(this.props.month).year(),
      month: this.props.month,
      errorMessages: {},
      records: this.props.records
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
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

  getRecordsCallback(res) {
    this.setState({
      records: res.data
    })
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getRecords(month) {
    let targetDate = moment(month)
    let params = {
      month: String(targetDate)
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessage)
  }

  destroyRecordCallback() {
    this.getRecords(this.state.month)
    this.noticeDestroyedMessage()
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    recordsAxios.delete(recordId, this.destroyRecordCallback, this.noticeErrorMessage)
  }

  onClickEditIcon() {
    // TODO
  }

  render() {
    return (
      <div className='records-card-body-component'>
        {this.renderAlertMessage()}
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

export default RecordsCardBody

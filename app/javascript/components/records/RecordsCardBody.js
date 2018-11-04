import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import moment from 'moment'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './Records'
import DateYearFormat from './../common/DateYearFormat'
import DateMonthFormat from './../common/DateMonthFormat'
import { recordsAxios, recordAxios } from './../mixins/requests/RecordsMixin'
import SearchKeywords from './SearchKeywords'

class RecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: this.props.year,
      month: this.props.month,
      errorMessages: {},
      records: this.props.records
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.handleClickPreviousButton = this.handleClickPreviousButton.bind(this)
    this.handleClickNextButton = this.handleClickNextButton.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  componentWillMount() {
    this.getRecords(this.props.year, this.props.month)
  }

  handleClickPreviousButton() {
    let m = moment(this.state.year + '-' + this.state.month + '-01', 'YYYY-MM-DD')
    let month = m.add(-1, 'months').month() + 1
    let year = m.year()
    if (month == -1) {
      year -= 1
    }
    this.setState({
      year: year,
      month: month
    })
    this.getRecords(year, month)
  }

  handleClickNextButton() {
    let m = moment(this.state.year + '-' + this.state.month + '-01')
    let month = m.add(1, 'months').month() + 1
    let year = m.year()
    if (month == 13) {
      year += 1
    }
    this.setState({
      year: year,
      month: month
    })
    this.getRecords(year, month)
  }

  getRecordsCallback(res) {
    this.setState({
      records: res.data
    })
  }

  getRecords(year, month) {
    let params = {
      year: String(year),
      month: String(month)
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessages)
  }

  destroyRecordCallback() {
    this.getRecords(this.state.year, this.state.month)
    this.noticeDestroyedMessage()
  }

  destroyRecord(recordId) {
    this.setState({
      message: ''
    })
    recordAxios.delete(recordId, this.destroyRecordCallback, this.noticeErrorMessages)
  }

  onClickEditIcon() {
    // TODO
  }

  render() {
    return (
      <div className='records-card-body-component'>
        {this.renderAlertMessage()}
        {this.state.month && (
          <div className='records-list-title'>
            <button className='btn btn-primary btn-sm float-left' onClick={this.handleClickPreviousButton}>
              <i className='fas fa-chevron-left' />
            </button>
            <span>
              <DateYearFormat year={this.state.year} />
              <DateMonthFormat month={this.state.month} />
            </span>
            <button className='btn btn-primary btn-sm float-right' onClick={this.handleClickNextButton}>
              <i className='fas fa-chevron-right' />
            </button>
          </div>
        )}
        {this.props.year && (
          <SearchKeywords month={this.state.month} year={this.state.year} />
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
  year: PropTypes.number,
  month: PropTypes.number,
  records: PropTypes.array.isRequired
}

reactMixin.onClass(RecordsCardBody, MessageNotifierMixin)

export default RecordsCardBody

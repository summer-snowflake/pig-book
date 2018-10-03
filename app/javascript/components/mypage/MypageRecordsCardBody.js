import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './../records/Records'
import { recordsAxios } from './../mixins/requests/RecordsMixin'

class MypageRecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessages: {},
      records: this.props.records
    }
    this.getRecords = this.getRecords.bind(this)
    this.getRecordsCallback = this.getRecordsCallback.bind(this)
    this.destroyRecord = this.destroyRecord.bind(this)
    this.destroyRecordCallback = this.destroyRecordCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
  }

  componentWillMount() {
    this.getRecords()
  }

  getRecordsCallback(res) {
    this.setState({
      records: res.data
    })
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getRecords() {
    let params = {
      order: 'created_at',
      limit: 5
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessage)
  }

  destroyRecordCallback() {
    this.getRecords()
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
      <div className='mypage-records-card-body-component'>
        {this.renderAlertMessage()}
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

MypageRecordsCardBody.propTypes = {
  month: PropTypes.string,
  records: PropTypes.array.isRequired
}

reactMixin.onClass(MypageRecordsCardBody, MessageNotifierMixin)

export default MypageRecordsCardBody

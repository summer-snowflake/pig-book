import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './../records/Records'
import { recordsAxios, recordAxios } from './../mixins/requests/RecordsMixin'

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
    this.onClickEditIcon = this.onClickEditIcon.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
    this.getRecords()
  }

  getRecordsCallback(res) {
    this.setState({
      records: res.data.records
    })
  }

  getRecords() {
    let params = {
      order: 'created_at',
      limit: 5
    }
    recordsAxios.get(params, this.getRecordsCallback, this.noticeErrorMessages)
  }

  destroyRecordCallback() {
    this.getRecords()
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
      <div className='mypage-records-card-body-component'>
        {this.renderAlertMessage()}
        <Records
          handleClickDestroyButton={this.destroyRecord}
          handleClickEditIcon={this.onClickEditIcon}
          longEnabled
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

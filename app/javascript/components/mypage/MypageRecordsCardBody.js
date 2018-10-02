import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import Records from './../records/Records'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class MypageRecordsCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
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
    let options = {
      method: 'GET',
      url: origin + '/api/records',
      params: {
        last_request_at: this.state.lastRequestAt,
        order: 'created_at',
        limit: 5
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
reactMixin.onClass(MypageRecordsCardBody, LocalStorageMixin)

export default MypageRecordsCardBody

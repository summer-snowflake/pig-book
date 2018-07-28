import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../../mixins/MessageNotifierMixin'
import AlertMessage from './../../common/AlertMessage'
import TallyButton from './TallyButton'
import TallyTimeLabel from './TallyTimeLabel'

class TallyButtonTableRecordBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastTallyAt: this.props.last_tally_at && moment(this.props.last_tally_at),
      message: '',
      success: false,
      errorMessages: {}
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    let options = {
      method: 'PATCH',
      url: origin + '/api/admin/users/' + this.props.user_id + '/tally',
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.noticeCompletedMessage()
        this.setState({
          lastTallyAt: moment(res.data.last_tally_at)
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <TallyButton onClickButton={this.handleClickButton} />
        <TallyTimeLabel lastTallyAt={this.state.lastTallyAt} />
      </div>
    )
  }
}

TallyButtonTableRecordBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  last_tally_at: PropTypes.string,
  user_id: PropTypes.number.isRequired
}

reactMixin.onClass(TallyButtonTableRecordBody, MessageNotifierMixin)

export default TallyButtonTableRecordBody

import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../../mixins/MessageNotifierMixin'
import TallyButton from './TallyButton'
import TallyTimeLabel from './TallyTimeLabel'
import LocalStorageMixin from './../../mixins/LocalStorageMixin'

class TallyButtonTableRecordBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      lastTallyAt: this.props.last_tally_at && moment(this.props.last_tally_at),
      errorMessages: {}
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    let options = {
      method: 'PATCH',
      url: origin + '/api/admin/users/' + this.props.user_id + '/tally',
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
        {this.renderAlertMessage()}
        <TallyButton onClickButton={this.handleClickButton} />
        <TallyTimeLabel lastTallyAt={this.state.lastTallyAt} />
      </div>
    )
  }
}

TallyButtonTableRecordBody.propTypes = {
  last_tally_at: PropTypes.string,
  user_id: PropTypes.number.isRequired
}

reactMixin.onClass(TallyButtonTableRecordBody, MessageNotifierMixin)
reactMixin.onClass(TallyButtonTableRecordBody, LocalStorageMixin)

export default TallyButtonTableRecordBody

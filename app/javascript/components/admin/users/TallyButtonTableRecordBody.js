import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../../mixins/MessageNotifierMixin'
import TallyButton from './TallyButton'
import TallyTimeLabel from './TallyTimeLabel'
import LocalStorageMixin from './../../mixins/LocalStorageMixin'
import { userAxios } from './../../mixins/requests/UsersMixin'

class TallyButtonTableRecordBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastTallyAt: this.props.last_tally_at && moment(this.props.last_tally_at),
      errorMessages: {}
    }
    this.patchUser = this.patchUser.bind(this)
    this.patchUserCallback = this.patchUserCallback.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  patchUserCallback(res) {
    this.noticeCompletedMessage()
    this.setState({
      lastTallyAt: moment(res.data.last_tally_at)
    })
  }

  patchUser() {
    userAxios.patch(this.props.user_id, this.patchUserCallback, this.noticeErrorMessage)
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-body-component'>
        {this.renderAlertMessage()}
        <TallyButton onClickButton={this.patchUser} />
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

export default TallyButtonTableRecordBody

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import reactMixin from 'react-mixin'

import MessageNotifierMixin from './../../mixins/MessageNotifierMixin'
import TallyButton from './TallyButton'
import TallyTimeLabel from './TallyTimeLabel'
import { userAxios } from './../../mixins/requests/UsersMixin'

class TallyButtonTableRecordBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastTallyAt: this.props.last_tally_at && moment(this.props.last_tally_at),
      isDisabled: false,
      errorMessages: {}
    }
    this.patchUser = this.patchUser.bind(this)
    this.patchUserCallback = this.patchUserCallback.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  handleClickButton() {
    this.setState({
      isDisabled: true
    })
    this.patchUser()
  }

  patchUserCallback(res) {
    this.noticeCompletedMessage()
    this.setState({
      isDisabled: false,
      lastTallyAt: moment(res.data.last_tally_at)
    })
  }

  patchUser() {
    userAxios.patch(this.props.user_id, this.patchUserCallback, this.noticeErrorMessages)
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-body-component'>
        {this.renderAlertMessage()}
        <TallyButton isDisabled={this.state.isDisabled} onClickButton={this.handleClickButton} />
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

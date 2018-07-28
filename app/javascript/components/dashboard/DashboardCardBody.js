import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'

class DashboardCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      errorMessages: {}
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className='dashboard-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
      </div>
    )
  }
}

DashboardCardBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(DashboardCardBody, MessageNotifierMixin)

export default DashboardCardBody

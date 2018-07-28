import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import AlertMessage from './../common/AlertMessage'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import MonthlyBalanceTable from './MonthlyBalanceTable'

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
        <MonthlyBalanceTable data={this.props.monthly_balance_table} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
      </div>
    )
  }
}

DashboardCardBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  monthly_balance_table: PropTypes.array.isRequired
}

reactMixin.onClass(DashboardCardBody, MessageNotifierMixin)

export default DashboardCardBody

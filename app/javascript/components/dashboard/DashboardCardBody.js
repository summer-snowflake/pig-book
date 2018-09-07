import React from 'react'
import PropTypes from 'prop-types'

import MonthlyBalanceTable from './MonthlyBalanceTable'

class DashboardCardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dashboard-card-body-component'>
        <MonthlyBalanceTable monthlyBalanceTable={this.props.monthly_balance_table} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
      </div>
    )
  }
}

DashboardCardBody.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  monthly_balance_table: PropTypes.array.isRequired
}

export default DashboardCardBody

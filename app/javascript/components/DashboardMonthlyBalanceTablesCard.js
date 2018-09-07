import React from 'react'
import PropTypes from 'prop-types'

import MonthlyBalanceTable from './dashboard/MonthlyBalanceTable'
import ErrorBoundary from './common/ErrorBoundary'

class DashboardMonthlyBalanceTablesCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dashboard-monthly-balance-tables-card-component'>
        <ErrorBoundary>
          <MonthlyBalanceTable last_request_at={this.props.last_request_at} user_token={this.props.user_token} year={this.props.year} />
        </ErrorBoundary>
      </div>
    )
  }
}

DashboardMonthlyBalanceTablesCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
}

export default DashboardMonthlyBalanceTablesCard

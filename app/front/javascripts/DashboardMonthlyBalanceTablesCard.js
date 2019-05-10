import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MonthlyBalanceTable from './dashboard/MonthlyBalanceTable'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class DashboardMonthlyBalanceTablesCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='dashboard-monthly-balance-tables-card-component'>
        <ErrorBoundary>
          <MonthlyBalanceTable year={this.props.year} />
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

reactMixin.onClass(DashboardMonthlyBalanceTablesCard, LocalStorageMixin)

export default DashboardMonthlyBalanceTablesCard

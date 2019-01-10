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
        <MonthlyBalanceTable tally={this.props.monthly_balance_table} />
      </div>
    )
  }
}

DashboardCardBody.propTypes = {
  monthly_balance_table: PropTypes.array.isRequired
}

export default DashboardCardBody

import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import DashboardCardBody from './dashboard/DashboardCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class DashboardCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='dashboard-card-component'>
        <ErrorBoundary>
          <DashboardCardBody monthly_balance_table={this.props.monthly_balance_table} />
        </ErrorBoundary>
      </div>
    )
  }
}

DashboardCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  monthly_balance_table: PropTypes.array.isRequired
}

reactMixin.onClass(DashboardCard, LocalStorageMixin)

export default DashboardCard

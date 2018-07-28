import React from 'react'
import PropTypes from 'prop-types'

import DashboardCardBody from './dashboard/DashboardCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class DashboardCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='dashboard-card-component'>
        <ErrorBoundary>
          <DashboardCardBody last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

DashboardCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default DashboardCard

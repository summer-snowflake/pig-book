import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import YearlyChart from './dashboard/YearlyChart'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class DashboardYearlyChartCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='dashboard-yearly-chart-card-component'>
        <ErrorBoundary>
          <YearlyChart tally={this.props.yearly} />
        </ErrorBoundary>
      </div>
    )
  }
}

DashboardYearlyChartCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  yearly: PropTypes.array.isRequired
}

reactMixin.onClass(DashboardYearlyChartCard, LocalStorageMixin)

export default DashboardYearlyChartCard

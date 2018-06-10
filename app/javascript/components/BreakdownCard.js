import React from 'react'
import PropTypes from 'prop-types'
import BreakdownCardBody from './breakdowns/BreakdownCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class BreakdownCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='breakdown-card-component'>
        <ErrorBoundary>
          <BreakdownCardBody breakdowns={this.props.breakdowns} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

BreakdownCard.propTypes = {
  breakdowns: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default BreakdownCard

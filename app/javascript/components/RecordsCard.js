import React from 'react'
import PropTypes from 'prop-types'

import RecordsCardBody from './records/RecordsCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class RecordsCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='records-card-component'>
        <ErrorBoundary>
          <RecordsCardBody last_request_at={this.props.last_request_at} records={this.props.records} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

RecordsCard.propTypes = {
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default RecordsCard

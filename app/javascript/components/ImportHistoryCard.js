import React from 'react'
import PropTypes from 'prop-types'

import ImportHistoryCardBody from './import/ImportHistoryCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class ImportHistoryCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='import-card-component'>
        <ErrorBoundary>
          <ImportHistoryCardBody histories={this.props.histories} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

ImportHistoryCard.propTypes = {
  histories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default ImportHistoryCard

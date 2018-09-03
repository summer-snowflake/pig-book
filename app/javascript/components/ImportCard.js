import React from 'react'
import PropTypes from 'prop-types'

import ImportCardBody from './import/ImportCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class ImportCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='import-card-component'>
        <ErrorBoundary>
          <ImportCardBody last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

ImportCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default ImportCard

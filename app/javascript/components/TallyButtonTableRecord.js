import React from 'react'
import PropTypes from 'prop-types'

import TallyButtonTableRecordBody from './admin/users/TallyButtonTableRecordBody'
import ErrorBoundary from './common/ErrorBoundary'

class TallyButtonTableRecord extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-component'>
        <ErrorBoundary>
          <TallyButtonTableRecordBody last_request_at={this.props.last_request_at} user_id={this.props.user_id} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

TallyButtonTableRecord.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  user_id: PropTypes.number.isRequired
}

export default TallyButtonTableRecord

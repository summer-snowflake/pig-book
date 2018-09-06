import React from 'react'
import PropTypes from 'prop-types'
import NewRecordCardBody from './records/NewRecordCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class NewRecordCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='new-record-card-component'>
        <ErrorBoundary>
          <NewRecordCardBody last_request_at={this.props.last_request_at} recently_used_categories={this.props.recently_used_categories} records={this.props.records} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

NewRecordCard.propTypes = {
  records: PropTypes.array.isRequired,
  recently_used_categories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default NewRecordCard

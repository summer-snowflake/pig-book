import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import RecordsCardBody from './records/RecordsCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class RecordsCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='records-card-component'>
        <ErrorBoundary>
          <RecordsCardBody month={this.props.month} records={this.props.records} year={this.props.year} />
        </ErrorBoundary>
      </div>
    )
  }
}

RecordsCard.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  records: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(RecordsCard, LocalStorageMixin)

export default RecordsCard

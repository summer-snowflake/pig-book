import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import NewRecordCardBody from './records/NewRecordCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class NewRecordCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='new-record-card-component'>
        <ErrorBoundary>
          <NewRecordCardBody recentlyUsed={this.props.recently_used} records={this.props.records} />
        </ErrorBoundary>
      </div>
    )
  }
}

NewRecordCard.propTypes = {
  records: PropTypes.array.isRequired,
  recently_used: PropTypes.object.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(NewRecordCard, LocalStorageMixin)

export default NewRecordCard

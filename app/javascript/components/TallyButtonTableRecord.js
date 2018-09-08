import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import TallyButtonTableRecordBody from './admin/users/TallyButtonTableRecordBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class TallyButtonTableRecord extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-component'>
        <ErrorBoundary>
          <TallyButtonTableRecordBody last_tally_at={this.props.last_tally_at} user_id={this.props.user_id} />
        </ErrorBoundary>
      </div>
    )
  }
}

TallyButtonTableRecord.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired,
  last_tally_at: PropTypes.string,
  user_id: PropTypes.number.isRequired
}

reactMixin.onClass(TallyButtonTableRecord, LocalStorageMixin)

export default TallyButtonTableRecord

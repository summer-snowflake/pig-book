import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import ImportHistoryCardBody from './import/ImportHistoryCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class ImportHistoryCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='import-card-component'>
        <ErrorBoundary>
          <ImportHistoryCardBody />
        </ErrorBoundary>
      </div>
    )
  }
}

ImportHistoryCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(ImportHistoryCard, LocalStorageMixin)

export default ImportHistoryCard

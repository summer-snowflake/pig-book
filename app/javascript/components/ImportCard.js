import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import ImportCardBody from './import/ImportCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class ImportCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='import-card-component'>
        <ErrorBoundary>
          <ImportCardBody />
        </ErrorBoundary>
      </div>
    )
  }
}

ImportCard.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(ImportCard, LocalStorageMixin)

export default ImportCard

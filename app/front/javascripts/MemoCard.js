import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import MemoCardBody from './memo/MemoCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class MemoCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='memo-card-component'>
        <ErrorBoundary>
          <MemoCardBody memo={this.props.memo} />
        </ErrorBoundary>
      </div>
    )
  }
}

MemoCard.propTypes = {
  memo: PropTypes.string.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(MemoCard, LocalStorageMixin)

export default MemoCard

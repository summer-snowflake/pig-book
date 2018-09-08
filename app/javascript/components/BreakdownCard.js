import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import BreakdownCardBody from './breakdowns/BreakdownCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class BreakdownCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='breakdown-card-component'>
        <ErrorBoundary>
          <BreakdownCardBody breakdowns={this.props.breakdowns} />
        </ErrorBoundary>
      </div>
    )
  }
}

BreakdownCard.propTypes = {
  breakdowns: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(BreakdownCard, LocalStorageMixin)

export default BreakdownCard

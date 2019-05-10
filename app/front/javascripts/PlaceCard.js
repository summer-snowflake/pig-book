import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import PlaceCardBody from './places/PlaceCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class PlaceCard extends React.Component {
  constructor(props) {
    super(props)
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='place-card-component'>
        <ErrorBoundary>
          <PlaceCardBody places={this.props.places} />
        </ErrorBoundary>
      </div>
    )
  }
}

PlaceCard.propTypes = {
  places: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

reactMixin.onClass(PlaceCard, LocalStorageMixin)

export default PlaceCard

import React from 'react'
import PropTypes from 'prop-types'
import PlaceCardBody from './places/PlaceCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class PlaceCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='place-card-component'>
        <ErrorBoundary>
          <PlaceCardBody places={this.props.places} user_token={this.props.user_token} last_request_at={this.props.last_request_at} />
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

export default PlaceCard

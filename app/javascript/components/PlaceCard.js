import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Places from './places/Places'
import AlertMessage from './common/AlertMessage'

class PlaceCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      places: this.props.places
    }
    this.destroyPlace = this.destroyPlace.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
  }

  getPlaces() {
    let options = {
      method: 'GET',
      url: origin + '/api/places',
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if(res.status == '200') {
          this.setState({
            places: res.data
          })
        }
      })
  }

  destroyPlace(place_id) {
    this.setState({
      message: ''
    })
    let options = {
      method: 'DELETE',
      url: origin + '/api/places/' + place_id,
      params: {
        last_request_at: this.props.last_request_at
      },
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if(res.status == '200') {
          this.getPlaces()
          this.setState({
            message: '削除しました',
            success: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.error_messages,
          success: false
        })
        console.error(error)
      })
  }

  render() {
    return (
      <div className='place-card-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <Places handleClickDestroyButton={this.destroyPlace} places={this.state.places} />
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

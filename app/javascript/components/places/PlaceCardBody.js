import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import PlaceForm from './PlaceForm'
import Places from './Places'
import AlertMessage from './../common/AlertMessage'

class PlaceCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      success: false,
      places: this.props.places,
      selectableCategories: [],
      errorMessages: {}
    }
    this.destroyPlace = this.destroyPlace.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
    this.postPlace = this.postPlace.bind(this)
    this.getPlaceCategories = this.getPlaceCategories.bind(this)
    this.postCategorizedPlace = this.postCategorizedPlace.bind(this)
  }

  componentWillMount() {
    this.getPlaces()
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

  postPlace(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/places',
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if (res.status == '201') {
          this.getPlaces()
          this.setState({
            message: '追加しました',
            success: true
          })
        }
      })
      .catch((error) => {
        if (error.response.status == '422') {
          this.setState({
            errorMessages: error.response.data.error_messages
          })
        } else {
          this.setState({
            message: error.response.data.error_message,
            success: false
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
        if(res.status == '204') {
          this.getPlaces()
          this.setState({
            message: '削除しました',
            success: true
          })
        }
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.error_message,
          success: false
        })
        console.error(error)
      })
  }

  getPlaceCategories(place_id) {
    let options = {
      method: 'GET',
      url: origin + '/api/places/' + place_id + '/categories',
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
            selectableCategories: res.data
          })
        }
      })
  }

  postCategorizedPlace(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/categorized_places',
      params: Object.assign(params, {last_request_at: this.props.last_request_at}),
      headers: {
        'Authorization': 'Token token=' + this.props.user_token
      },
      json: true
    }
    axios(options)
      .then((res) => {
        if (res.status == '201') {
          this.getPlaces()
          this.setState({
            message: '追加しました',
            success: true
          })
        }
      })
      .catch((error) => {
        if (error.response.status == '422') {
          this.setState({
            errorMessages: error.response.data.error_messages
          })
        } else {
          this.setState({
            message: error.response.data.error_message,
            success: false
          })
        }
        console.error(error)
      })
  }

  render() {
    return (
      <div className='place-card-body-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
        <PlaceForm errorMessages={this.state.errorMessages} handleSendForm={this.postPlace} />
        <Places handleClickAddCategoryButton={this.postCategorizedPlace} handleClickDestroyButton={this.destroyPlace} handleClickPlusIcon={this.getPlaceCategories} places={this.state.places} selectableCategories={this.state.selectableCategories} />
      </div>
    )
  }
}

PlaceCardBody.propTypes = {
  places: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default PlaceCardBody

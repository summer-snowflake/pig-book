import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import PlaceForm from './PlaceForm'
import Places from './Places'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class PlaceCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
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
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          places: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getPlaces()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getPlaces()
        this.noticeDestroyedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  getPlaceCategories(place_id) {
    let options = {
      method: 'GET',
      url: origin + '/api/places/' + place_id + '/categories',
      params: {
        last_request_at: this.state.lastRequestAt
      },
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.setState({
          selectableCategories: res.data
        })
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
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
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.getPlaces()
        this.noticeAddMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <div className='place-card-body-component'>
        {this.renderAlertMessage()}
        <PlaceForm errorMessages={this.state.errorMessages} handleSendForm={this.postPlace} />
        <Places getPlaces={this.getPlaces} handleClickAddCategoryButton={this.postCategorizedPlace} handleClickDestroyButton={this.destroyPlace} handleClickPlusIcon={this.getPlaceCategories} places={this.state.places} selectableCategories={this.state.selectableCategories} />
      </div>
    )
  }
}

PlaceCardBody.propTypes = {
  places: PropTypes.array.isRequired
}

reactMixin.onClass(PlaceCardBody, MessageNotifierMixin)
reactMixin.onClass(PlaceCardBody, LocalStorageMixin)

export default PlaceCardBody

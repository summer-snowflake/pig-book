import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import PlaceForm from './PlaceForm'
import Places from './Places'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'
import { placesAxios, placeAxios } from './../mixins/requests/PlacesMixin'

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
    this.getPlaces = this.getPlaces.bind(this)
    this.getPlacesCallback = this.getPlacesCallback.bind(this)
    this.postPlace = this.postPlace.bind(this)
    this.postPlaceCallback = this.postPlaceCallback.bind(this)
    this.destroyPlace = this.destroyPlace.bind(this)
    this.destroyPlaceCallback = this.destroyPlaceCallback.bind(this)
    this.getPlaceCategories = this.getPlaceCategories.bind(this)
    this.postCategorizedPlace = this.postCategorizedPlace.bind(this)
    this.noticeErrorMessage = this.noticeErrorMessage.bind(this)
  }

  componentWillMount() {
    this.getPlaces()
  }

  noticeErrorMessage(error) {
    this.noticeErrorMessages(error)
  }

  getPlacesCallback(res) {
    this.setState({
      places: res.data
    })
  }

  getPlaces() {
    placesAxios.get(this.getPlacesCallback, this.noticeErrorMessage)
  }

  postPlaceCallback() {
    this.getPlaces()
    this.noticeAddMessage()
  }

  postPlace(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    placeAxios.post(params, this.postPlaceCallback, this.noticeErrorMessage)
  }

  destroyPlaceCallback() {
    this.getPlaces()
    this.noticeDestroyedMessage()
  }

  destroyPlace(placeId) {
    this.setState({
      message: ''
    })
    placeAxios.delete(placeId, this.destroyPlaceCallback, this.noticeErrorMessage)
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

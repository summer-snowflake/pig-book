import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import PlaceForm from './PlaceForm'
import Places from './Places'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { placesAxios, placeAxios } from './../mixins/requests/PlacesMixin'

class PlaceCardBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.getPlaceCategoriesCallback = this.getPlaceCategoriesCallback.bind(this)
    this.postCategorizedPlace = this.postCategorizedPlace.bind(this)
    this.postCategorizedPlaceCallback = this.postCategorizedPlaceCallback.bind(this)
  }

  componentWillMount() {
    this.getPlaces()
  }

  getPlacesCallback(res) {
    this.setState({
      places: res.data
    })
  }

  getPlaces() {
    placesAxios.get(this.getPlacesCallback, this.noticeErrorMessages)
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
    placeAxios.post(params, this.postPlaceCallback, this.noticeErrorMessages)
  }

  destroyPlaceCallback() {
    this.getPlaces()
    this.noticeDestroyedMessage()
  }

  destroyPlace(placeId) {
    this.setState({
      message: ''
    })
    placeAxios.delete(placeId, this.destroyPlaceCallback, this.noticeErrorMessages)
  }

  getPlaceCategoriesCallback(res) {
    this.setState({
      selectableCategories: res.data
    })
  }

  getPlaceCategories(placeId) {
    placeAxios.getCategories(placeId, this.getPlaceCategoriesCallback, this.noticeErrorMessages)
  }

  postCategorizedPlaceCallback() {
    this.getPlaces()
    this.noticeAddMessage()
  }

  postCategorizedPlace(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    placeAxios.postCategorized(params, this.postCategorizedPlaceCallback, this.noticeErrorMessages)
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

export default PlaceCardBody

import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import Trash from './../common/Trash'
import PlaceCategories from './PlaceCategories'
import UpdateButton from './../common/UpdateButton'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import FormErrorMessages from './../common/FormErrorMessages'
import AlertMessage from './../common/AlertMessage'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

class Place extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      isEditing: false,
      name: this.props.place.name,
      errorMessages: {}
    }
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
    this.handleChangePlaceName = this.handleChangePlaceName.bind(this)
    this.handleClickPlusIcon = this.handleClickPlusIcon.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCancelIcon = this.handleClickCancelIcon.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
  }

  onClickTrashIcon(place) {
    this.props.onClickTrashIcon(place)
  }

  handleClickPlusIcon() {
    this.props.onClickPlusIcon(this.props.place)
  }

  handleClickEditIcon() {
    this.setState({
      isEditing: true
    })
  }

  handleClickCancelIcon() {
    this.setState({
      isEditing: false
    })
  }

  handleChangePlaceName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleClickUpdateButton() {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let params = {
      name: this.state.name
    }
    let options = {
      method: 'PATCH',
      url: origin + '/api/places/' + this.props.place.id,
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then(() => {
        this.setState({
          isEditing: false
        })
        this.props.getPlaces()
        this.noticeUpdatedMessage()
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  render() {
    return (
      <tr className='place-component' id={'place-' + this.props.place.id}>
        {this.state.isEditing ? (
          <td className='left-edit-target'>
            <input className='form-control' onChange={this.handleChangePlaceName} type='text' value={this.state.name} />
            <FormErrorMessages column='name' errorMessages={this.state.errorMessages} />
          </td>
        ) : (
          <td className='left-edit-target'>
            {this.props.place.name}
          </td>
        )}
        {this.state.isEditing ? (
          <td className='center-edit-target'>
            <UpdateButton onClickButton={this.handleClickUpdateButton} />
          </td>
        ) : (
          <td className='center-edit-target' />
        )}
        {this.state.isEditing ? (
          <td className='right-edit-target icon-td' onClick={this.handleClickCancelIcon}>
            <i className='fas fa-times' />
          </td>
        ) : (
          <td className='icon-td edit-icon-td right-edit-target' onClick={this.handleClickEditIcon}>
            <i className='fas fa-edit' />
          </td>
        )}
        <td className='badge-td'>
          <span className={'badge badge-info'} onClick={this.handleClickPlusIcon}>
            <span>
              <i className='fas fa-plus' />
            </span>
          </span>
        </td>
        <td className='categorized-places-td'>
          <PlaceCategories categories={this.props.place.categories || []} />
        </td>
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.place} />
          <AlertMessage message={this.state.message} success={this.state.success} />
        </td>
      </tr>
    )
  }
}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired,
  onClickPlusIcon: PropTypes.func.isRequired,
  getPlaces: PropTypes.func.isRequired
}

reactMixin.onClass(Place, MessageNotifierMixin)
reactMixin.onClass(Place, LocalStorageMixin)

export default Place

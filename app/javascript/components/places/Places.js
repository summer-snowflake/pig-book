import React from 'react'
import PropTypes from 'prop-types'
import Place from './Place'
import DestroyModal from './../common/DestroyModal'

class Places extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: {
        id: null
      },
      destroyModalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickPlusIcon = this.handleClickPlusIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(place) {
    this.setState({
      place: place,
      destroyModalIsOpen: true
    })
  }

  handleClickPlusIcon(place) {
    console.log(place)
  }

  onClickDestroyButton(place_id) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(place_id)
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='places-component'>
        <table className='table'>
          <tbody>
            {this.props.places.map((place) =>
              <Place key={place.id} onClickPlusIcon={this.handleClickPlusIcon} onClickTrashIcon={this.handleClickTrashIcon} place={place} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.place} modalIsOpen={this.state.destroyModalIsOpen} />
      </div>
    )
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired
}

export default Places

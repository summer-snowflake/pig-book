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
      modalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(place) {
    this.setState({
      place: place,
      modalIsOpen: true
    })
  }

  onClickDestroyButton(place_id) {
    this.setState({
      modalIsOpen: false
    })
    this.props.handleClickDestroyButton(place_id)
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    return (
      <div className='places-component'>
        <table className='table'>
          <tbody>
            {this.props.places.map((place) =>
              <Place key={place.id} onClickTrashIcon={this.handleClickTrashIcon} place={place} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.place} modalIsOpen={this.state.modalIsOpen} />
      </div>
    )
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired
}

export default Places

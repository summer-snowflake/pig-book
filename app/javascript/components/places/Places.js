import React from 'react'
import PropTypes from 'prop-types'
import Place from './Place'
import DestroyModal from './../common/DestroyModal'
import SelectCategoryModal from './SelectCategoryModal'

class Places extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: {
        id: null
      },
      destroyModalIsOpen: false,
      selectCategoryModalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickPlusIcon = this.handleClickPlusIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.onClickAddCategoryButton = this.onClickAddCategoryButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(place) {
    this.setState({
      place: place,
      destroyModalIsOpen: true
    })
  }

  handleClickPlusIcon(place) {
    this.setState({
      place: place,
      selectCategoryModalIsOpen: true
    })
    this.props.handleClickPlusIcon(place.id)
  }

  onClickDestroyButton(place_id) {
    this.setState({
      destroyModalIsOpen: false
    })
    this.props.handleClickDestroyButton(place_id)
  }

  onClickAddCategoryButton(placeId, categoryId) {
    this.setState({
      selectCategoryModalIsOpen: false
    })
    this.props.handleClickAddCategoryButton({place_id: placeId, category_id: categoryId})
  }

  closeModal() {
    this.setState({
      destroyModalIsOpen: false,
      selectCategoryModalIsOpen: false
    })
  }

  render() {
    return (
      <div className='places-component'>
        <table className='table'>
          <tbody>
            {this.props.places.map((place) =>
              <Place getPlaces={this.props.getPlaces} key={place.id} onClickPlusIcon={this.handleClickPlusIcon} onClickTrashIcon={this.handleClickTrashIcon} place={place} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.place} modalIsOpen={this.state.destroyModalIsOpen} />
        <SelectCategoryModal categories={this.props.selectableCategories} handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickAddCategoryButton} modalIsOpen={this.state.selectCategoryModalIsOpen} place={this.state.place} />
      </div>
    )
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  selectableCategories: PropTypes.array.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleClickAddCategoryButton: PropTypes.func.isRequired,
  handleClickPlusIcon: PropTypes.func.isRequired,
  getPlaces: PropTypes.func.isRequired
}

export default Places

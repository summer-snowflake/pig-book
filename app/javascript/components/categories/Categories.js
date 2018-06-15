import React from 'react'
import PropTypes from 'prop-types'
import Category from './Category'
import DestroyModal from './../common/DestroyModal'

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        id: null
      },
      modalIsOpen: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDestroyButton = this.onClickDestroyButton.bind(this)
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleClickTrashIcon(category) {
    this.setState({
      category: category,
      modalIsOpen: true
    })
  }

  onClickDestroyButton(category_id) {
    this.setState({
      modalIsOpen: false
    })
    this.props.handleClickDestroyButton(category_id)
  }

  handleClickUpdateButton(categoryId, params) {
    this.props.handleUpdateCategory(categoryId, params)
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    return (
      <div className='categories-component'>
        <table className='table'>
          <tbody>
            {this.props.categories.map((category) =>
              <Category category={category} key={category.id} onClickTrashIcon={this.handleClickTrashIcon} handleClickUpdateButton={this.handleClickUpdateButton} />
            )}
          </tbody>
        </table>
        <DestroyModal handleClickCloseButton={this.closeModal} handleClickSubmitButton={this.onClickDestroyButton} item={this.state.category} modalIsOpen={this.state.modalIsOpen} />
      </div>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired,
  handleUpdateCategory: PropTypes.func.isRequired
}

export default Categories

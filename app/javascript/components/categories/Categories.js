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
              <Category category={category} getCategories={this.props.getCategories} key={category.id} last_request_at={this.props.last_request_at} onClickTrashIcon={this.handleClickTrashIcon} user_token={this.props.user_token} />
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
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  handleClickDestroyButton: PropTypes.func.isRequired
}

export default Categories

import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import CloseButton from './CloseButton'
import CategoryForm from './../categories/CategoryForm'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import { categoryAxios } from './../mixins/requests/CategoriesMixin'

const customStyles = {
  content : {
    top         : '30%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    minWidth    : '400px',
    transform   : 'translate(-50%, -50%)'
  },
  overlay: {
    background  : 'rgba(0, 0, 0, .5)'
  }
}

class AddCategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessages: {},
      name: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
    this.postCategory = this.postCategory.bind(this)
    this.postCategoryCallback = this.postCategoryCallback.bind(this)
    this.noticeErrorMessages = this.noticeErrorMessages.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  postCategoryCallback(res) {
    this.noticeAddMessage()
    this.props.handleAddCategory(res.data)
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    categoryAxios.post(params, this.postCategoryCallback, this.noticeErrorMessages)
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div className='add-category-modal-component'>
        {this.renderAlertMessage()}
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              {'追加するカテゴリ名を入力してください'}
            </p>
            <CategoryForm errorMessages={this.state.errorMessages} handleSendForm={this.postCategory} />
          </div>
          <div className='modal-footer'>
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

reactMixin.onClass(AddCategoryModal, MessageNotifierMixin)

AddCategoryModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default AddCategoryModal

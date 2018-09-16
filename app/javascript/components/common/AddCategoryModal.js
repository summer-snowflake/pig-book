import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'
import axios from 'axios'

import AlertMessage from './../common/AlertMessage'
import CloseButton from './CloseButton'
import CategoryForm from './../categories/CategoryForm'
import MessageNotifierMixin from './../mixins/MessageNotifierMixin'
import LocalStorageMixin from './../mixins/LocalStorageMixin'

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
      lastRequestAt: this.getLastRequestAt(),
      userToken: this.getUserToken(),
      errorMessages: {},
      message: '',
      success: false,
      name: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
    this.postCategory = this.postCategory.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  postCategory(params) {
    this.setState({
      message: '',
      errorMessages: {}
    })
    let options = {
      method: 'POST',
      url: origin + '/api/categories',
      params: Object.assign(params, {last_request_at: this.state.lastRequestAt}),
      headers: {
        'Authorization': 'Token token=' + this.state.userToken
      },
      json: true
    }
    axios(options)
      .then((res) => {
        this.noticeAddMessage()
        this.props.handleAddCategory(res.data)
      })
      .catch((error) => {
        this.noticeErrorMessages(error)
      })
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div className='add-category-modal-component'>
        <AlertMessage message={this.state.message} success={this.state.success} />
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
reactMixin.onClass(AddCategoryModal, LocalStorageMixin)

AddCategoryModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default AddCategoryModal

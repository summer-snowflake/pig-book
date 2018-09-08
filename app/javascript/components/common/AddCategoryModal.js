import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import AddButton from './AddButton'
import CloseButton from './/CloseButton'

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
      name: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  handleClickSubmitButton() {
    this.props.handleClickSubmitButton(this.state.name)
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    return (
      <div className='add-category-modal-component'>
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              {'追加するカテゴリ名を入力してください'}
            </p>
          </div>
          <input className='form-control' onChange={this.handleChangeName} type='text' value={this.state.name} />
          <div className='modal-footer'>
            <AddButton isDisabled={!this.state.name} onClickButton={this.handleClickSubmitButton}/>
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

AddCategoryModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  handleClickSubmitButton: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default AddCategoryModal

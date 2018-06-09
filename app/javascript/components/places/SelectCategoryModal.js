import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import SubmitButton from './../common/SubmitButton'
import CloseButton from './../common/CloseButton'

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

class SelectCategoryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {}
    }
    this.onClickSubmitButton = this.onClickSubmitButton.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  onClickSubmitButton() {
    this.props.handleClickSubmitButton(this.props.place.id, this.state.category.id)
  }

  render() {
    return (
      <div className='destroy-modal-component'>
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              <b>{this.props.place.name}</b>
              {'に追加するカテゴリを選択してください。'}
            </p>
          </div>
          <div className='modal-footer'>
            <SubmitButton handleClickButton={this.onClickSubmitButton} />
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

SelectCategoryModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  handleClickSubmitButton: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default SelectCategoryModal

import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import DestroySubmitButton from './DestroySubmitButton'
import CloseButton from './CloseButton'

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

class DestroyModal extends React.Component {
  constructor(props) {
    super(props)
    this.onClickSubmitButton = this.onClickSubmitButton.bind(this)
    this.onClickCloseButton = this.onClickCloseButton.bind(this)
  }

  onClickCloseButton() {
    this.props.handleClickCloseButton()
  }

  onClickSubmitButton() {
    this.props.handleClickSubmitButton(this.props.item.id)
  }

  render() {
    return (
      <div className='destroy-modal-component'>
        <Modal ariaHideApp={false} isOpen={this.props.modalIsOpen} style={customStyles}>
          <div className='modal-body'>
            <p>
              <b>{this.props.item.name}</b>
              {'を削除してもよろしいですか？'}
            </p>
          </div>
          <div className='modal-footer'>
            <DestroySubmitButton handleClickButton={this.onClickSubmitButton} />
            <CloseButton handleClickButton={this.onClickCloseButton} />
          </div>
        </Modal>
      </div>
    )
  }
}

DestroyModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  handleClickSubmitButton: PropTypes.func.isRequired,
  handleClickCloseButton: PropTypes.func.isRequired
}

export default DestroyModal

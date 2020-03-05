import React, { Component } from 'react'
import Modal from 'react-modal'

import CloseButton from 'components/common/closeButton'

interface Props {
  isOpen: boolean;
  message: string;
  onClickClose: () => void;
}

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

class AlertModal extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='modal alert-modal-component'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customStyles}
            >
              <div className='modal-body'>
                <p>{this.props.message}</p>
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

export default AlertModal

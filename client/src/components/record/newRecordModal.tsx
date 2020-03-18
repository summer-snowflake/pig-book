import React, { Component } from 'react'
import Modal from 'react-modal'

interface Props {
  isOpen: boolean;
  onClickClose: () => void;
}

const customStyles = {
  content : {
    top         : '40%',
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

class NewRecordModalContainer extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='new-record-modal-component modal'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customStyles}
            >
              <div className='modal-body' />
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

export default NewRecordModalContainer

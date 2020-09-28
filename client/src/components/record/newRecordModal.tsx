import React, { Component } from 'react'
import Modal from 'react-modal'

import { customModalStyles } from 'modules/modalStyles'
import NewRecordFormContainer from 'components/input/newRecordFormContainer'
import CloseButton from 'components/common/closeButton'

interface Props {
  isOpen: boolean;
  onClickClose: () => void;
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
              style={customModalStyles(40)}
            >
              <div className='modal-body'>
                <NewRecordFormContainer />
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

export default NewRecordModalContainer

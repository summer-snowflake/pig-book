import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'

import CloseButton from 'components/common/closeButton'

interface Props {
  isOpen: boolean;
  onClickCancel: () => void;
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

class DestroyModal extends Component<I18nProps & Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='modal cancel-update-modal-component'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customStyles}
            >

              <div className='modal-body'>
                <p>{t('message.cancelUpdate')}</p>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-primary' onClick={this.props.onClickCancel}>
                  {t('button.cancel')}
                </button>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

export default withTranslation()(DestroyModal)

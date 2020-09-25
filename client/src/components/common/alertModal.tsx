import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'

import { customModalStyles } from 'modules/modalStyles'
import CloseButton from 'components/common/closeButton'

interface Props extends I18nProps {
  isOpen: boolean;
  messageType: string;
  onClickClose: () => void;
}

class AlertModal extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='modal alert-modal-component'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customModalStyles(30)}
            >
              <div className='modal-body'>
                <p>
                  <i className='fas fa-exclamation-triangle yellow left-icon' />
                  {t('alert.' + this.props.messageType)}
                </p>
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

export default withTranslation()(AlertModal)

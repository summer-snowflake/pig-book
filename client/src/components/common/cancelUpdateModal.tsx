import React, { Component } from 'react';
import Modal from 'react-modal';
import { withTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean,
  handleClickCancel: any,
  handleClickClose: any
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

class CancelUpdateModal extends Component<i18nProps & Props> {
  render() {
    const { t } = this.props;

    return (
      <div className='modal cancel-update-modal-component'>
            <div className='modal-dialog'>
        {this.props.isOpen && (
          <Modal
            isOpen={this.props.isOpen}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="Example Modal">

            <div className='modal-body'>
              <p>{t('message.cancelUpdate')}</p>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-primary' onClick={this.props.handleClickCancel}>
                {t('button.cancel')}
              </button>
              <button className='btn btn-light' onClick={this.props.handleClickClose}>
                <i className='fas fa-times left-icon' />
                {t('button.close')}
                </button>
            </div>
          </Modal>
         )}
            </div>
      </div>
    );
  }
}

export default withTranslation()(CancelUpdateModal);

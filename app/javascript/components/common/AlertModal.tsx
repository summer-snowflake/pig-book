import React, { Component } from 'react'
import Modal from 'react-modal'
import { withTranslation } from 'react-i18next'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { customModalStyles } from 'modules/modalStyles'
import { AlertStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import Cancel from 'components/common/Cancel'
import { closeAlertModal, openAlertModal } from 'actions/alertStoreActions'

interface StateProps {
  alertStore: AlertStore;
}

interface DispatchProps {
  openAlertModal: (message: string) => void;
  closeAlertModal: () => void;
}

type Props = StateProps & DispatchProps & I18nProps

class AlertModal extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='modal alert-modal-component'>
        <div className='modal-dialog'>
          {this.props.alertStore.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.alertStore.isOpen}
              style={customModalStyles(30)}
            >
              <div className='modal-header'>
                <Cancel onClickIcon={this.props.closeAlertModal} />
              </div>
              <div className='modal-body'>
                <p>
                  <i className='fas fa-exclamation-triangle yellow left-icon' />
                  {t('alert.' + this.props.alertStore.messageType)}
                </p>
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    alertStore: state.alert
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    openAlertModal(message: string): void {
      dispatch(openAlertModal(message))
    },
    closeAlertModal(): void {
      dispatch(closeAlertModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(AlertModal))

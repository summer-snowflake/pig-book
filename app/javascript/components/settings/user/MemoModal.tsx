import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ProfileParams } from 'types/api'
import { ProfileStore } from 'types/store'
import { customModalStyles } from 'modules/modalStyles'
import { getProfile, patchProfile } from 'actions/profileActions'
import { changeMemo, closeEditMemoModal } from 'actions/profileStoreActions'
import { RootState } from 'reducers/rootReducer'
import Cancel from 'components/common/Cancel'

interface StateProps {
  profileStore: ProfileStore;
}

interface DispatchProps {
  getProfile: () => void;
  patchProfile: (params: ProfileParams) => void;
  changeMemo: (memo: string) => void;
  closeEditMemoModal: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class MemoModal extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)

    this.props.getProfile()
  }

  handleChangeMemo(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.props.changeMemo(e.target.value)
  }

  handleClickCloseButton(): void {
    this.props.closeEditMemoModal()
  }

  handleClickSubmitButton(): void {
    const params = {
      memo: this.props.profileStore.editingMemo
    }
    this.props.patchProfile(params)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='modal memo-modal-component'>
        <div className='modal-dialog'>
          <Modal
            ariaHideApp={false}
            contentLabel='Example Modal'
            isOpen={this.props.profileStore.isOpenMemoModal}
            style={customModalStyles(40)}
          >
            <div className='modal-header'>
              <Cancel onClickIcon={this.handleClickCloseButton} />
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <textarea
                    className='text-form-control'
                    name='memo'
                    onChange={this.handleChangeMemo}
                    rows={8}
                    value={this.props.profileStore.editingMemo}
                  />
                </div>
                <button
                  className='btn btn-primary'
                  disabled={this.props.profileStore.isLoading}
                  onClick={this.handleClickSubmitButton}
                  type='button'>
                  {t('button.update')}
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getProfile(): void {
      dispatch(getProfile())
    },
    patchProfile(params: ProfileParams): void {
      dispatch(patchProfile(params))
    },
    changeMemo(memo: string): void {
      dispatch(changeMemo(memo))
    },
    closeEditMemoModal(): void {
      dispatch(closeEditMemoModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MemoModal))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { withTranslation } from 'react-i18next'

import { ProfileParams } from 'types/api'
import { ProfileStore } from 'types/store'
import EditAndCancel from 'components/common/editAndCancel'
import CancelUpdateModal from 'components/common/cancelUpdateModal'
import AlertModal from 'components/common/alertModal'
import { getProfile, patchProfile } from 'actions/settingsActions'
import { setEditingMemo } from 'actions/settingsStoreActions'
import { RootState } from 'reducers/rootReducer'
import LoadingImage from 'components/common/loadingImage'

interface StateProps {
  profileStore: ProfileStore;
}

interface DispatchProps {
  getProfile: () => void;
  patchProfile: (params: ProfileParams, target: string) => void;
  setEditingMemo: (editingMemo: boolean) => void;
}

type Props = I18nProps & StateProps & DispatchProps

interface State {
  isOpenCancelModal: boolean;
  isOpenAlertModal: boolean;
  memo: string;
}

class MemoContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCancelModal: false,
      isOpenAlertModal: false,
      memo: ''
    }

    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickExitIcon = this.handleClickExitIcon.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleChangeMemo = this.handleChangeMemo.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)

    this.props.getProfile()
  }

  diff(): boolean {
    return this.props.profileStore.editingMemo && this.state.memo !== this.props.profileStore.memo
  }

  handleClickEditIcon(): void {
    if (this.props.profileStore.editing) {
      this.setState({
        isOpenAlertModal: true
      })
    } else {
      this.props.setEditingMemo(!this.props.profileStore.editingMemo)
      this.setState({
        memo: this.props.profileStore.memo
      })
    }
  }

  handleClickExitIcon(): void {
    if (this.diff()) {
      this.setState({
        isOpenCancelModal: true
      })
    } else {
      this.props.setEditingMemo(false)
    }
  }

  handleClickCancel(): void {
    this.props.setEditingMemo(false)
    this.setState({
      isOpenCancelModal: false,
    })
  }

  handleClickClose(): void {
    this.setState({
      isOpenCancelModal: false,
      isOpenAlertModal: false
    })
  }

  handleChangeMemo(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      memo: e.target.value
    })
  }

  handleClickSubmitButton(): void {
    const params = {
      locale: this.props.profileStore.locale,
      currency: this.props.profileStore.currency,
      memo: this.state.memo
    }
    this.props.patchProfile(params, 'memo')
  }

  render(): JSX.Element {
    const { t } = this.props

    const jsx = (
      <form>
        {this.props.profileStore.editingMemo ? (
          <div className='form-group'>
            <textarea
              className='form-control'
              onChange={this.handleChangeMemo}
              rows={8}
              value={this.state.memo}
            />
          </div>
        ) : (
          <div className='memo'>
            {this.props.profileStore.memo}
          </div>
        )}
        {this.props.profileStore.editingMemo && (
          <button
            className='btn btn-primary'
            disabled={this.props.profileStore.isLoadingMemo || !this.diff()}
            onClick={this.handleClickSubmitButton}
            type='button'
          >
            {t('button.update')}
          </button>
        )}
        {this.props.profileStore.editingMemo && this.props.profileStore.isLoadingMemo && (
          <LoadingImage />
        )}
      </form>
    )

    return (
      <div className='memo-component'>
        <CancelUpdateModal
          isOpen={this.state.isOpenCancelModal}
          onClickCancel={this.handleClickCancel}
          onClickClose={this.handleClickClose}
        />
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-book-open left-icon' />
            {t('title.memo')}
          </div>
          <div className='card-body with-background-image'>
            <EditAndCancel
              editing={this.props.profileStore.editingMemo}
              onClickEditIcon={this.handleClickEditIcon}
              onClickExitIcon={this.handleClickExitIcon}
            />
            <AlertModal
              isOpen={this.state.isOpenAlertModal}
              messageType='editingOther'
              onClickClose={this.handleClickClose}
            />
            {jsx}
          </div>
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
    patchProfile(params: ProfileParams, target: string): void {
      dispatch(patchProfile(params, target))
    },
    setEditingMemo(editing: boolean): void {
      dispatch(setEditingMemo(editing))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(MemoContainer))
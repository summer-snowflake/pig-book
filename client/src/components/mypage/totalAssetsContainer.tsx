import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withTranslation } from 'react-i18next'

import { AssetsAccount } from 'types/api'
import { AssetsAccountsStore, EditAssetsAccountStore, NewAssetsAccountStore, ProfileStore } from 'types/store'
import { openNewAssetsAccountModal, closeNewAssetsAccountModal, closeEditAssetsAccountModal } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import Counter from 'components/common/counter'
import LoadingImage from 'components/common/loadingImage'
import TotalAssetTableRecord from 'components/mypage/totalAssetTableRecordContainer'
import TotalAssetsDisplayField from 'components/mypage/totalAssetsDisplayField'
import NewAssetsAccountModal from 'components/mypage/newAssetsAccountModalContainer'
import EditAssetsAccountModal from 'components/mypage/editAssetsAccountModalContainer'

interface StateProps {
  profileStore: ProfileStore;
  assetsAccountsStore: AssetsAccountsStore;
  newAssetsAccountStore: NewAssetsAccountStore;
  editAssetsAccountStore: EditAssetsAccountStore;
}

interface DispatchProps {
  getAssetsAccounts: () => void;
  openNewAssetsAccountModal: () => void;
  closeNewAssetsAccountModal: () => void;
  closeEditAssetsAccountModal: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TotalAssetsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)

    this.props.getAssetsAccounts()
  }

  handleClickCreateButton(): void {
    this.props.openNewAssetsAccountModal()
  }

  handleClickCloseModal(): void {
    this.props.closeNewAssetsAccountModal()
    this.props.closeEditAssetsAccountModal()
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='total-assets-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-coins left-icon' />
            {t('title.totalAssets')}
          </div>
          <div className='card-body with-background-image'>
            <TotalAssetsDisplayField currency={this.props.profileStore.currency} assetsAccounts={this.props.assetsAccountsStore.assetsAccounts} />
            <Counter count={this.props.assetsAccountsStore.assetsAccounts.length} max={10} />
            <table className='table'>
              <tbody>
                {this.props.assetsAccountsStore.assetsAccounts.map((assetsAccount: AssetsAccount) => (
                  <TotalAssetTableRecord assetsAccount={assetsAccount} key={assetsAccount.id} />
                ))}
              </tbody>
            </table>
            {this.props.assetsAccountsStore.assetsAccounts.length === 0 && this.props.assetsAccountsStore.isLoading && (
              <LoadingImage />
            )}
            <button className='create-button-component btn btn-secondary' onClick={this.handleClickCreateButton}>
              <i className='fas fa-plus left-icon'></i>
              {t('button.addAssetsAccount')}
            </button>
            <NewAssetsAccountModal isOpen={this.props.newAssetsAccountStore.isOpen} onClickClose={this.handleClickCloseModal} />
            <EditAssetsAccountModal isOpen={this.props.editAssetsAccountStore.isOpen} onClickClose={this.handleClickCloseModal} />
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile,
    assetsAccountsStore: state.assetsAccounts,
    newAssetsAccountStore: state.newAssetsAccount,
    editAssetsAccountStore: state.editAssetsAccount
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getAssetsAccounts(): void {
      dispatch(getAssetsAccounts())
    },
    openNewAssetsAccountModal(): void {
      dispatch(openNewAssetsAccountModal())
    },
    closeNewAssetsAccountModal(): void {
      dispatch(closeNewAssetsAccountModal())
    },
    closeEditAssetsAccountModal(): void {
      dispatch(closeEditAssetsAccountModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TotalAssetsContainer))

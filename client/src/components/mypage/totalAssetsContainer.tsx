import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withTranslation } from 'react-i18next'
import Sortable from 'sortablejs'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import {
  AssetsAccountsStore, EditAssetsAccountStore, NewAssetsAccountStore, ProfileStore
} from 'types/store'
import { patchAssetsAccount } from 'actions/assetsAccountActions'
import {
  openNewAssetsAccountModal, closeNewAssetsAccountModal, closeEditAssetsAccountModal
} from 'actions/assetsAccountStoreActions'
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
  openNewAssetsAccountModal: (currency: string) => void;
  closeNewAssetsAccountModal: () => void;
  closeEditAssetsAccountModal: () => void;
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
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
    this.props.openNewAssetsAccountModal(this.props.profileStore.currency)
  }

  handleClickCloseModal(): void {
    this.props.closeNewAssetsAccountModal()
    this.props.closeEditAssetsAccountModal()
  }

  render(): JSX.Element {
    const { t } = this.props

    const sortElements = document.getElementById('sortable-assets-accounts');
    if (sortElements) {
      Sortable.create(sortElements, {
        animation: 100,
        handle: '.cursor-move',
        onEnd: (e) => {
          const params = {
            position: Number(e.newIndex) + 1
          }
          this.props.patchAssetsAccount(Number(e.item.id), params)
        }
      })
    }

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
              <tbody className='assets-accounts-list' id='sortable-assets-accounts'>
                {this.props.assetsAccountsStore.assetsAccounts.map((assetsAccount: AssetsAccount) => (
                  <TotalAssetTableRecord assetsAccount={assetsAccount} key={assetsAccount.id} />
                ))}
              </tbody>
            </table>
            {this.props.assetsAccountsStore.assetsAccounts.length === 0 && this.props.assetsAccountsStore.isLoading && (
              <div>
                <LoadingImage />
              </div>
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
    openNewAssetsAccountModal(currency: string): void {
      dispatch(openNewAssetsAccountModal(currency))
    },
    closeNewAssetsAccountModal(): void {
      dispatch(closeNewAssetsAccountModal())
    },
    closeEditAssetsAccountModal(): void {
      dispatch(closeEditAssetsAccountModal())
    },
    patchAssetsAccount(id: number, params: AssetsAccountParams): void {
      dispatch(patchAssetsAccount(id, params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TotalAssetsContainer))

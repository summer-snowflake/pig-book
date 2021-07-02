import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import Sortable from 'sortablejs'
import { withTranslation } from 'react-i18next'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import { AssetsAccountsStore, EditAssetsAccountStore, NewAssetsAccountStore, UserStore } from 'types/store'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { patchAssetsAccount } from 'actions/assetsAccountActions'
import { closeEditAssetsAccountModal, closeNewAssetsAccountModal, openNewAssetsAccountModal } from 'actions/assetsAccountStoreActions'
import { RootState } from 'reducers/rootReducer'
import AssetsAccountItem from 'components/mypage/AssetsAccountItem'
import NewAssetsAccountModal from 'components/mypage/NewAssetsAccountModal'
import EditAssetsAccountModal from 'components/mypage/EditAssetsAccountModal'
import TotalAssetsDisplayField from 'components/mypage/TotalAssetsDisplayField'

interface StateProps {
  userStore: UserStore;
  assetsAccountsStore: AssetsAccountsStore;
  newAssetsAccountStore: NewAssetsAccountStore;
  editAssetsAccountStore: EditAssetsAccountStore;
}

interface DispatchProps {
  getAssetsAccounts: () => void;
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
  openNewAssetsAccountModal: (currency: string) => void;
  closeNewAssetsAccountModal: () => void;
  closeEditAssetsAccountModal: () => void;
}

type Props = StateProps & DispatchProps & I18nProps

class AssetsAccountsList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleClickModalCloseButton = this.handleClickModalCloseButton.bind(this)

    this.props.getAssetsAccounts()
  }

  handleClickCreateButton(): void {
    this.props.openNewAssetsAccountModal(this.props.userStore.profile.currency)
  }

  handleClickModalCloseButton(): void {
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
      <div className='assets-accounts-list-component'>
        <TotalAssetsDisplayField
          currency={this.props.userStore.profile.currency}
          assetsAccounts={this.props.assetsAccountsStore.assetsAccounts} />
        <div className='counter'>
          {this.props.assetsAccountsStore.assetsAccounts.length + ' / 10'}
        </div>
        <table className='table'>
          <tbody id='sortable-assets-accounts'>
            {this.props.assetsAccountsStore.assetsAccounts && this.props.assetsAccountsStore.assetsAccounts.map((assetsAccount: AssetsAccount) => (
              <AssetsAccountItem assetsAccount={assetsAccount} key={assetsAccount.id} />
            ))}
          </tbody>
        </table>
        <button className='btn btn-secondary' onClick={this.handleClickCreateButton}>
          <i className='fas fa-plus left-icon' />
          {t('button.addAssetsAccount')}
        </button>
        <NewAssetsAccountModal isOpen={this.props.newAssetsAccountStore.isOpen} onClickClose={this.handleClickModalCloseButton} />
        <EditAssetsAccountModal isOpen={this.props.editAssetsAccountStore.isOpen} onClickClose={this.handleClickModalCloseButton} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    userStore: state.user,
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
    patchAssetsAccount(id: number, params: AssetsAccountParams): void {
      dispatch(patchAssetsAccount(id, params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    },
    openNewAssetsAccountModal(currency: string): void {
      dispatch(openNewAssetsAccountModal(currency))
    },
    closeNewAssetsAccountModal(): void {
      dispatch(closeNewAssetsAccountModal())
    },
    closeEditAssetsAccountModal(): void {
      dispatch(closeEditAssetsAccountModal())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(AssetsAccountsList))

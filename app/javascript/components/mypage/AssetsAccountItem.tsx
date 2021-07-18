import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import { AssetsAccountsStore, EditAssetsAccountStore } from 'types/store'
import { deleteAssetsAccount, patchAssetsAccount } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { openEditAssetsAccountModal } from 'actions/assetsAccountStoreActions'
import { RootState } from 'reducers/rootReducer'
import CheckBox from 'components/common/CheckBox'
import HumanCharge from 'components/common/HumanCharge'
import DestroyModal from 'components/common/DestroyModal'
import Edit from 'components/common/Edit'
import Trash from 'components/common/Trash'

interface ParentProps {
  assetsAccount: AssetsAccount;
}

interface StateProps {
  assetsAccountsStore: AssetsAccountsStore;
  editAssetsAccountStore: EditAssetsAccountStore;
}

interface DispatchProps {
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
  openEditAssetsAccountModal: (assetsAccount: AssetsAccount) => void;
  deleteAssetsAccount: (assetsAccountId: number) => void;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenDestroyModal: boolean;
}

class AssetsAccountItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false
    }

    this.handleClickCheckButton = this.handleClickCheckButton.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickModalCloseButton = this.handleClickModalCloseButton.bind(this)
    this.handleClickDestroyButton = this.handleClickDestroyButton.bind(this)
  }

  handleClickCheckButton(): void {
    const params = {
      checked: !this.props.assetsAccount.checked
    }
    this.props.patchAssetsAccount(this.props.assetsAccount.id, params)
  }

  handleClickEditIcon(): void {
    this.props.openEditAssetsAccountModal(this.props.assetsAccount)
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickModalCloseButton(): void {
    this.setState({
      isOpenDestroyModal: false
    })
  }

  handleClickDestroyButton(): void {
    this.props.deleteAssetsAccount(this.props.assetsAccount.id)
  }

  render(): JSX.Element {
    return (
      <tr className='assets-account-item-component' id={String(this.props.assetsAccount.id)}>
        <td className='icon-field'>
          <i className='fas fa-bars green cursor-move' />
        </td>
        <td className='icon-field'>
          <CheckBox checked={this.props.assetsAccount.checked} onClick={this.handleClickCheckButton} />
        </td>
        <td>
          {this.props.assetsAccount.name}
        </td>
        <td>
          <HumanCharge
            balanceOfPayments={this.props.assetsAccount.balance_of_payments}
            humanCharge={this.props.assetsAccount.human_charge} />
        </td>
        <td className='column-human-date'>
          {this.props.assetsAccount.human_updated_at}
        </td>
        <td className='column-human-now'>
          {this.props.assetsAccount.from_now}
        </td>
        <td className='icon-field'>
          <Edit onClickIcon={this.handleClickEditIcon} tooltipDisable={true} />
        </td>
        <td className='icon-field'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            disabled={this.props.editAssetsAccountStore.isLoading}
            onClickCancel={this.handleClickDestroyButton}
            onClickClose={this.handleClickModalCloseButton}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
            tooltipDisable={true}
          />
        </td>
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    assetsAccountsStore: state.assetsAccounts,
    editAssetsAccountStore: state.editAssetsAccount
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchAssetsAccount(id: number, params: AssetsAccountParams): void {
      dispatch(patchAssetsAccount(id, params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    },
    openEditAssetsAccountModal(assetsAccount: AssetsAccount): void {
      dispatch(openEditAssetsAccountModal(assetsAccount))
    },
    deleteAssetsAccount(assetsAccountId: number): void {
      dispatch(deleteAssetsAccount(assetsAccountId)).then(() => {
        dispatch(getAssetsAccounts())
      })
    },
  }
}

export default connect(mapState, mapDispatch)(AssetsAccountItem)

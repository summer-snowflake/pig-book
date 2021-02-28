import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import { EditAssetsAccountStore, ProfileStore } from 'types/store'
import { patchAssetsAccount, deleteAssetsAccount, openEditAssetsAccountModal, closeEditAssetsAccountModal } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import Edit from 'components/common/edit'
import DestroyModal from 'components/common/destroyModal'
import HumanDate from 'components/common/humanDate'
import FromNow from 'components/common/fromNow'
import Trash from 'components/common/trash'
import HumanChargeSet from 'components/common/humanChargeSet'

interface ParentProps {
  assetsAccount: AssetsAccount;
}

interface StateProps {
  profileStore: ProfileStore;
  editAssetsAccountStore: EditAssetsAccountStore;
}

interface DispatchProps {
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
  deleteAssetsAccount: (assetsAccountId: number) => void;
  openEditAssetsAccountModal: (assetsAccount: AssetsAccount) => void;
  closeEditAssetsAccountModal: () => void;
}

type Props = ParentProps & StateProps & DispatchProps

interface State {
  isOpenDestroyModal: boolean;
}

class TotalAssetTableRecordContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenDestroyModal: false
    }

    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickDestroy = this.handleClickDestroy.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)
    this.handleClickCheckButton = this.handleClickCheckButton.bind(this)
  }

  handleClickTrashIcon(): void {
    this.setState({
      isOpenDestroyModal: true
    })
  }

  handleClickClose(): void {
    this.setState({
      isOpenDestroyModal: false
    })
  }

  handleClickDestroy(): void {
    this.setState({
      isOpenDestroyModal: false
    })
    this.props.deleteAssetsAccount(this.props.assetsAccount.id)
  }

  handleClickEditIcon(): void {
    this.props.openEditAssetsAccountModal(this.props.assetsAccount)
  }

  handleClickCloseModal(): void {
    this.props.closeEditAssetsAccountModal()
  }

  handleClickCheckButton(): void {
    const params = {
      checked: !this.props.assetsAccount.checked
    }
    this.props.patchAssetsAccount(this.props.assetsAccount.id, params)
  }

  render(): JSX.Element {
    return (
      <tr className='total-asset-table-record-component' id={String(this.props.assetsAccount.id)}>
        <td className='icon-field'>
          <i className='fas fa-bars green cursor-move' />
        </td>
        <td className='icon-field'>
          {this.props.assetsAccount.checked ? (
            <FontAwesomeIcon className='left-icon dark-green button-border' icon={['fas', 'check']} onClick={this.handleClickCheckButton} />
          ) : (
            <FontAwesomeIcon className='left-icon light-green' icon={['fas', 'check']} onClick={this.handleClickCheckButton} />
          )}
        </td>
        <td>{this.props.assetsAccount.name}</td>
        <td>
          <HumanChargeSet balanceOfPayments={this.props.assetsAccount.balance_of_payments} charge={this.props.assetsAccount.money} currency={this.props.assetsAccount.currency} />
        </td>
        <td>
          <HumanDate date={new Date(this.props.assetsAccount.updated_at)} />
          <FromNow date={new Date(this.props.assetsAccount.updated_at)} />
        </td>
        <td>
          <Edit onClickIcon={this.handleClickEditIcon} tooltipDisable={true} />
        </td>
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
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
    profileStore: state.profile,
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
    deleteAssetsAccount(assetsAccountId: number): void {
      dispatch(deleteAssetsAccount(assetsAccountId)).then(() => {
        dispatch(getAssetsAccounts())
      })
    },
    openEditAssetsAccountModal(assetsAccount: AssetsAccount): void {
      dispatch(openEditAssetsAccountModal(assetsAccount))
    },
    closeEditAssetsAccountModal(): void {
      dispatch(closeEditAssetsAccountModal())
    }
  }
}

export default connect(mapState, mapDispatch)(TotalAssetTableRecordContainer)

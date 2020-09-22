import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AssetsAccount } from 'types/api'
import { ProfileStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import HumanCharge from 'components/common/humanCharge'
import DestroyModal from 'components/common/destroyModal'
import Trash from 'components/common/trash'
import { deleteAssetsAccount } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'

interface ParentProps {
  assetsAccount: AssetsAccount;
}

interface StateProps {
  profileStore: ProfileStore;
}

interface DispatchProps {
  deleteAssetsAccount: (assetsAccountId: number) => void;
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

  render(): JSX.Element {
    return (
      <tr className='total-asset-table-record-component'>
        <td>
          {this.props.assetsAccount.name}
        </td>
        <td>
          {this.props.assetsAccount.balance_of_payments === true ? (
            <FontAwesomeIcon className='left-icon blue' icon={['fas', 'plus-square']} />
          ) : (
            <FontAwesomeIcon className='left-icon red' icon={['fas', 'minus-square']} />
          )}
          <HumanCharge currency={this.props.assetsAccount.currency} charge={this.props.assetsAccount.money} />
        </td>
        <td className='trash-field-td'>
          <DestroyModal
            isOpen={this.state.isOpenDestroyModal}
            onClickCancel={this.handleClickDestroy}
            onClickClose={this.handleClickClose}
          />
          <Trash
            onClickIcon={this.handleClickTrashIcon}
          />
        </td>
      </tr>
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
    deleteAssetsAccount(assetsAccountId: number): void {
      dispatch(deleteAssetsAccount(assetsAccountId)).then(() => {
        dispatch(getAssetsAccounts())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(TotalAssetTableRecordContainer)

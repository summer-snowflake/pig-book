import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import { AssetsAccountsStore } from 'types/store'
import { patchAssetsAccount } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import CheckBox from 'components/common/CheckBox'
import HumanCharge from 'components/common/HumanCharge'

interface ParentProps {
  assetsAccount: AssetsAccount;
}

interface StateProps {
  assetsAccountsStore: AssetsAccountsStore;
}

interface DispatchProps {
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
}

type Props = ParentProps & DispatchProps

class AssetsAccountItem extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCheckButton = this.handleClickCheckButton.bind(this)
  }

  handleClickCheckButton(): void {
    const params = {
      checked: !this.props.assetsAccount.checked
    }
    this.props.patchAssetsAccount(this.props.assetsAccount.id, params)
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
      </tr>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    assetsAccountsStore: state.assetsAccounts
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    patchAssetsAccount(id: number, params: AssetsAccountParams): void {
      dispatch(patchAssetsAccount(id, params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(AssetsAccountItem)

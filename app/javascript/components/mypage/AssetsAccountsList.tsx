import React, { Component } from 'react'

import { AssetsAccount } from 'types/api'
import AssetsAccountItem from 'components/mypage/AssetsAccountItem'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { RootState } from 'reducers/rootReducer'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { connect } from 'react-redux'
import { AssetsAccountsStore } from 'types/store'

interface StateProps {
  assetsAccountsStore: AssetsAccountsStore;
}

interface DispatchProps {
  getAssetsAccounts: () => void;
}

type Props = StateProps & DispatchProps

class AssetsAccountsList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getAssetsAccounts()
  }

  render(): JSX.Element {
    return (
      <table className='assets-accounts-list-component table'>
        <tbody>
          {this.props.assetsAccountsStore.assetsAccounts && this.props.assetsAccountsStore.assetsAccounts.map((assetsAccount: AssetsAccount) => (
            <AssetsAccountItem assetsAccount={assetsAccount} key={assetsAccount.id} />
          ))}
        </tbody>
      </table>
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
    getAssetsAccounts(): void {
      dispatch(getAssetsAccounts())
    },
  }
}

export default connect(mapState, mapDispatch)(AssetsAccountsList)

import React, { Component } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { connect } from 'react-redux'
import Sortable from 'sortablejs'

import { AssetsAccount, AssetsAccountParams } from 'types/api'
import { AssetsAccountsStore } from 'types/store'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { patchAssetsAccount } from 'actions/assetsAccountActions'
import { RootState } from 'reducers/rootReducer'
import AssetsAccountItem from 'components/mypage/AssetsAccountItem'

interface StateProps {
  assetsAccountsStore: AssetsAccountsStore;
}

interface DispatchProps {
  getAssetsAccounts: () => void;
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
}

type Props = StateProps & DispatchProps

class AssetsAccountsList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getAssetsAccounts()
  }

  render(): JSX.Element {
    const sortElements = document.getElementById('sortable-assets-accounts');
    if (sortElements) {
      Sortable.create(sortElements, {
        animation: 100,
        handle: '.cursor-move',
        onEnd: (e) => {
          const params = {
            position: Number(e.newIndex) + 1
          }
          console.log(params)
          console.log(e)
          this.props.patchAssetsAccount(Number(e.item.id), params)
        }
      })
    }

    return (
      <div className='assets-accounts-list-component'>
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
      </div>
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
    patchAssetsAccount(id: number, params: AssetsAccountParams): void {
      dispatch(patchAssetsAccount(id, params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    }
  }
}

export default connect(mapState, mapDispatch)(AssetsAccountsList)

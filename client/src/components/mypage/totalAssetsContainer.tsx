import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withTranslation } from 'react-i18next'

import { AssetsAccount } from 'types/api'
import { AssetsAccountsStore, ProfileStore } from 'types/store'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import LoadingImage from 'components/common/loadingImage'
import TotalAssetTableRecord from 'components/mypage/totalAssetTableRecordContainer'
import TotalAssetsDisplayField from 'components/mypage/totalAssetsDisplayField'

interface StateProps {
  profileStore: ProfileStore;
  assetsAccountsStore: AssetsAccountsStore;
}

interface DispatchProps {
  getAssetsAccounts: (currency: string) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class TotalAssetsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getAssetsAccounts(this.props.profileStore.currency)
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
            <TotalAssetsDisplayField currency={this.props.profileStore.currency} sum={this.props.assetsAccountsStore.sum} />
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
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    profileStore: state.profile,
    assetsAccountsStore: state.assetsAccounts
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getAssetsAccounts(currency: string): void {
      dispatch(getAssetsAccounts(currency))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TotalAssetsContainer))

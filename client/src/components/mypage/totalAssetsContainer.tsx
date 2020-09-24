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
import NewAssetsAccountModal from './newAssetsAccountModalContainer'

interface StateProps {
  profileStore: ProfileStore;
  assetsAccountsStore: AssetsAccountsStore;
}

interface DispatchProps {
  getAssetsAccounts: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

interface State {
  isOpenCreateAccountModal: boolean
}

class TotalAssetsContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isOpenCreateAccountModal: false
    }

    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)

    this.props.getAssetsAccounts()
  }

  handleClickCreateButton(): void {
    this.setState({
      isOpenCreateAccountModal: true
    })
  }

  handleClickCloseModal(): void {
    this.setState({
      isOpenCreateAccountModal: false
    })
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
            <NewAssetsAccountModal isOpen={this.state.isOpenCreateAccountModal} onClickClose={this.handleClickCloseModal} />
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
    getAssetsAccounts(): void {
      dispatch(getAssetsAccounts())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(TotalAssetsContainer))

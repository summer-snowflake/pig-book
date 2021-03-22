import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { AssetsAccountParams } from 'types/api'
import { NewAssetsAccountStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { customModalStyles } from 'modules/modalStyles'
import { postAssetsAccount } from 'actions/assetsAccountActions'
import {
  changeAssetsAccountBalanceOfPayments, changeAssetsAccountName, changeAssetsAccountMoney
} from 'actions/assetsAccountStoreActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import AssetsAccountForm from 'components/mypage/assetsAccountForm'
import CloseButton from 'components/common/closeButton'

interface ParentProps {
  isOpen: boolean;
  onClickClose: () => void;
}

interface StateProps {
  newAssetsAccountStore: NewAssetsAccountStore;
}

interface DispatchProps {
  postAssetsAccount: (params: AssetsAccountParams) => void;
  changeAssetsAccountBalanceOfPayments: (balanceOfPayments: boolean) => void;
  changeAssetsAccountName: (name: string) => void;
  changeAssetsAccountMoney: (money: string) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class NewAssetsAccountModalContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeMoney = this.handleChangeMoney.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeAssetsAccountBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeAssetsAccountName(e.target.value)
  }

  handleChangeMoney(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeAssetsAccountMoney(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const params = {
      balance_of_payments: this.props.newAssetsAccountStore.balance_of_payments,
      name: this.props.newAssetsAccountStore.name,
      currency: this.props.newAssetsAccountStore.currency,
      money: this.props.newAssetsAccountStore.money.replace(/,/g, ''),
      position: this.props.newAssetsAccountStore.position,
      checked: true
    }

    this.props.postAssetsAccount(params)
  }

  render(): JSX.Element {
    return (
      <div className='new-assets-account-modal-component modal'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel='Example Modal'
              isOpen={this.props.isOpen}
              style={customModalStyles(40)}
            >
              <div className='modal-body'>
                <AssetsAccountForm
                  assetsAccountStore={this.props.newAssetsAccountStore}
                  onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
                  onChangeMoney={this.handleChangeMoney}
                  onChangeName={this.handleChangeName}
                  onClickSubmitButton={this.handleClickSubmitButton}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClickClose} />
              </div>
            </Modal>
          )}
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    newAssetsAccountStore: state.newAssetsAccount
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    postAssetsAccount(params: AssetsAccountParams): void {
      dispatch(postAssetsAccount(params)).then(() => {
        dispatch(getAssetsAccounts())
      })
    },
    changeAssetsAccountBalanceOfPayments(balanceOfPayments: boolean): void {
      dispatch(changeAssetsAccountBalanceOfPayments(balanceOfPayments))
    },
    changeAssetsAccountName(name: string): void {
      dispatch(changeAssetsAccountName(name))
    },
    changeAssetsAccountMoney(money: string): void {
      dispatch(changeAssetsAccountMoney(money))
    }
  }
}

export default connect(mapState, mapDispatch)(NewAssetsAccountModalContainer)

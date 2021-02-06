import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { AssetsAccountParams } from 'types/api'
import { EditAssetsAccountStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'
import { customModalStyles } from 'modules/modalStyles'
import { changeAssetsAccountBalanceOfPayments, changeAssetsAccountName, changeAssetsAccountMoney, patchAssetsAccount } from 'actions/assetsAccountActions'
import { getAssetsAccounts } from 'actions/assetsAccountsActions'
import { RootState } from 'reducers/rootReducer'
import AssetsAccountForm from 'components/mypage/assetsAccountForm'
import CloseButton from 'components/common/closeButton'

interface ParentProps {
  isOpen: boolean;
  onClickClose: () => void;
}

interface StateProps {
  editAssetsAccountStore: EditAssetsAccountStore;
}

interface DispatchProps {
  patchAssetsAccount: (id: number, params: AssetsAccountParams) => void;
  changeAssetsAccountBalanceOfPayments: (balanceOfPayments: boolean) => void;
  changeAssetsAccountName: (name: string) => void;
  changeAssetsAccountMoney: (money: string) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class EditAssetsAccountModalContainer extends Component<Props> {
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
    const id = this.props.editAssetsAccountStore.id
    const params = {
      balance_of_payments: this.props.editAssetsAccountStore.balance_of_payments,
      name: this.props.editAssetsAccountStore.name,
      currency: this.props.editAssetsAccountStore.currency,
      money: this.props.editAssetsAccountStore.money.replace(/,/g, ''),
      position: this.props.editAssetsAccountStore.position,
      checked: this.props.editAssetsAccountStore.checked
    }

    this.props.patchAssetsAccount(id, params)
  }

  render(): JSX.Element {
    return (
      <div className='edit-assets-account-modal-component modal'>
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
                  assetsAccountStore={this.props.editAssetsAccountStore}
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

export default connect(mapState, mapDispatch)(EditAssetsAccountModalContainer)

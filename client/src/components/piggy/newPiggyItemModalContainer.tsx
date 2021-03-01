import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import Modal from 'react-modal'
import { ThunkDispatch } from 'redux-thunk'

import { PiggyItemParams } from 'types/api'
import { NewPiggyItemStore, PiggyBankStore } from 'types/store'
import { customModalStyles } from 'modules/modalStyles'
import { toBoolean } from 'modules/toBoolean'
import { getPiggyItems } from 'actions/piggyItemsActions'
import { postPiggyItem } from 'actions/piggyItemActions'
import {
  changeNewPiggyItemBalanceOfPayments,
  changeNewPiggyItemCharge,
  changeNewPiggyItemName,
  changeNewPiggyItemPublishedOn,
} from 'actions/piggyItemStoreActions'
import { RootState } from 'reducers/rootReducer'
import CloseButton from 'components/common/closeButton'
import PiggyItemForm from 'components/piggy/piggyItemForm'

interface ParentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StateProps {
  piggyBankStore: PiggyBankStore;
  newPiggyItemStore: NewPiggyItemStore;
}

interface DispatchProps {
  getPiggyItems: (piggyBankId: number) => void;
  changeNewPiggyItemPublishedOn: (date: Date) => void;
  changeNewPiggyItemBalanceOfPayments: (balanceOfPayments: boolean) => void;
  changeNewPiggyItemName: (name: string) => void;
  changeNewPiggyItemCharge: (charge: string) => void;
  postPiggyItem: (piggyBankId: number, params: PiggyItemParams) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class NewPiggyItemModalContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeCharge = this.handleChangeCharge.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleChangePublishedOn(date: Date): void {
    this.props.changeNewPiggyItemPublishedOn(date)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeNewPiggyItemName(e.target.value)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeNewPiggyItemBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeCharge(e: React.ChangeEvent<HTMLInputElement>):void {
    this.props.changeNewPiggyItemCharge(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const store = this.props.newPiggyItemStore
    const params = {
      published_on: store.publishedOn,
      balance_of_payments: store.balance_of_payments,
      name: store.name,
      charge: store.charge
    }
    if (this.props.piggyBankStore.piggyBank) {
      this.props.postPiggyItem(this.props.piggyBankStore.piggyBank.id, params)
    }
  }

  render(): JSX.Element {
    return (
      <div className='new-piggy-item-modal-component modal'>
        <div className='modal-dialog'>
          {this.props.isOpen && (
            <Modal
              ariaHideApp={false}
              contentLabel="Example Modal"
              isOpen={this.props.isOpen}
              style={customModalStyles(40)}
            >
              <div className='modal-body'>
                <PiggyItemForm
                  piggyBank={this.props.piggyBankStore.piggyBank}
                  piggyItemStore={this.props.newPiggyItemStore}
                  onChangePublishedOn={this.handleChangePublishedOn}
                  onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
                  onChangeCharge={this.handleChangeCharge}
                  onChangeName={this.handleChangeName}
                  onKeyDown={this.handleKeyDown}
                  onClickSubmitButton={this.handleClickSubmitButton}
                />
              </div>
              <div className='modal-footer'>
                <CloseButton onClickClose={this.props.onClose} />
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
    piggyBankStore: state.piggyBank,
    newPiggyItemStore: state.newPiggyItem
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getPiggyItems(piggyBankId: number): void {
      dispatch(getPiggyItems(piggyBankId))
    },
    changeNewPiggyItemPublishedOn(date: Date): void {
      dispatch(changeNewPiggyItemPublishedOn(date))
    },
    changeNewPiggyItemBalanceOfPayments(balanceOfPayments: boolean): void {
      dispatch(changeNewPiggyItemBalanceOfPayments(balanceOfPayments))
    },
    changeNewPiggyItemName(name: string): void {
      dispatch(changeNewPiggyItemName(name))
    },
    changeNewPiggyItemCharge(charge: string): void {
      dispatch(changeNewPiggyItemCharge(charge))
    },
    postPiggyItem(piggyBankId: number, params: PiggyItemParams): void {
      dispatch(postPiggyItem(piggyBankId, params)).then(() => {
        dispatch(getPiggyItems(piggyBankId))
      })
    }
  }
}


export default connect(mapState, mapDispatch)(NewPiggyItemModalContainer)

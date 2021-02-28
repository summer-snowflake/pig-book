import React, { Component } from 'react'
import Modal from 'react-modal'

import { customModalStyles } from 'modules/modalStyles'
import CloseButton from 'components/common/closeButton'
import PiggyItemForm from 'components/piggy/piggyItemForm'
import { PiggyBank, PiggyItemParams } from 'types/api'
import { EditPiggyItemStore } from 'types/store'
import { toBoolean } from 'modules/toBoolean'

interface ParentProps {
  editPiggyItemStore: EditPiggyItemStore;
  piggyBank: PiggyBank | null;
  onChangePublishedOn: (date: Date) => void;
  onChangeName: (name: string) => void;
  onChangeBalanceOfPayments: (balanceOfPayments: boolean) => void;
  onChangeCharge: (charge: string) => void;
  onClickCloseButton: () => void;
  onClickSubmitButton: (piggyItemId: number, params: PiggyItemParams) => void;
}

type Props = ParentProps

class EditPiggyItemModal extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCloseModal = this.handleClickCloseModal.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeCharge = this.handleChangeCharge.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
  }

  handleClickCloseModal(): void {
    this.props.onClickCloseButton()
  }

  handleChangePublishedOn(date: Date): void {
    this.props.onChangePublishedOn(date)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChangeName(e.target.value)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChangeBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeCharge(e: React.ChangeEvent<HTMLInputElement>):void {
    this.props.onChangeCharge(e.target.value)
  }

  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      e.preventDefault()
      this.handleClickSubmitButton()
    }
  }

  handleClickSubmitButton(): void {
    const store = this.props.editPiggyItemStore
    const params = {
      published_on: store.publishedOn,
      balance_of_payments: store.balance_of_payments,
      name: store.name,
      charge: store.charge
    }
    if (this.props.piggyBank) {
      this.props.onClickSubmitButton(store.id, params)
    }
  }

  render(): JSX.Element {
    return (
      <div className='edit-piggy-item-modal-component modal'>
        <div className='modal-dialog'>
          <Modal
            ariaHideApp={false}
            contentLabel="Example Modal"
            isOpen={this.props.editPiggyItemStore.isOpen}
            style={customModalStyles(40)}
          >
            <div className='modal-body'>
              <PiggyItemForm
                piggyBank={this.props.piggyBank}
                piggyItemStore={this.props.editPiggyItemStore}
                onChangePublishedOn={this.handleChangePublishedOn}
                onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
                onChangeCharge={this.handleChangeCharge}
                onChangeName={this.handleChangeName}
                onKeyDown={this.handleKeyDown}
                onClickSubmitButton={this.handleClickSubmitButton}
              />
            </div>
            <div className='modal-footer'>
              <CloseButton onClickClose={this.handleClickCloseModal} />
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default EditPiggyItemModal

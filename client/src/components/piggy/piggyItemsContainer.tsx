import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { NewPiggyItemStore, EditPiggyItemStore, PiggyBankStore, PiggyItemsStore } from 'types/store'
import { getPiggyItems } from 'actions/piggyItemsActions'
import {
  closeNewPiggyItemModal,
  openNewPiggyItemModal,
  deletePiggyItem,
  openEditPiggyItemModal,
  closeEditPiggyItemModal,
  changeEditPiggyItemPublishedOn,
  changeEditPiggyItemBalanceOfPayments,
  changeEditPiggyItemName,
  changeEditPiggyItemCharge,
  patchPiggyItem
} from 'actions/piggyItemActions'
import { RootState } from 'reducers/rootReducer'
import HumanChargeSet from 'components/common/humanChargeSet'
import TrashFieldTd from 'components/common/trashFieldTd'
import HumanDate from 'components/common/humanDate'
import EditFieldTd from 'components/common/EditFieldTd'
import NewPiggyItemField from 'components/piggy/newPiggyItemField'
import PiggyItemForm from 'components/piggy/piggyItemForm'
import { PiggyItem, PiggyItemParams } from 'types/api'
import { toBoolean } from 'modules/toBoolean'

interface ParentProps {
  piggyBankId: number;
}

interface StateProps {
  piggyBankStore: PiggyBankStore;
  piggyItemsStore: PiggyItemsStore;
  newPiggyItemStore: NewPiggyItemStore;
  editPiggyItemStore: EditPiggyItemStore;
}

interface DispatchProps {
  getPiggyItems: (piggyBankId: number) => void;
  patchPiggyItem: (piggyBankId: number, piggyItemId: number, params: PiggyItemParams) => void;
  openNewPiggyItemModal: () => void;
  closeNewPiggyItemModal: () => void;
  deletePiggyItem: (piggyBankId: number, piggyItemId: number) => void;
  openEditPiggyItemModal: (piggyItem: PiggyItem) => void;
  closeEditPiggyItemModal: () => void;
  changeEditPiggyItemPublishedOn: (date: Date) => void;
  changeEditPiggyItemBalanceOfPayments: (balanceOfPayments: boolean) => void;
  changeEditPiggyItemName: (name: string) => void;
  changeEditPiggyItemCharge: (charge: string) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class PiggyItemsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleClickDestroyButton = this.handleClickDestroyButton.bind(this)
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this)
    this.handleChangePublishedOn = this.handleChangePublishedOn.bind(this)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeCharge = this.handleChangeCharge.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)

    this.props.getPiggyItems(this.props.piggyBankId)
  }

  handleClickPlusButton(): void {
    this.props.openNewPiggyItemModal()
  }

  handleCloseModal(): void {
    this.props.closeNewPiggyItemModal()
  }

  handleClickDestroyButton(piggyItemId: number): void {
    this.props.deletePiggyItem(this.props.piggyBankId, piggyItemId)
  }

  handleClickEditIcon(piggyItem: PiggyItem): void {
    this.props.openEditPiggyItemModal(piggyItem)
  }

  handleClickCloseButton(): void {
    this.props.closeEditPiggyItemModal()
  }

  handleChangePublishedOn(date: Date): void {
    this.props.changeEditPiggyItemPublishedOn(date)
  }

  handleChangeName(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeEditPiggyItemName(e.target.value)
  }

  handleChangeBalanceOfPayments(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.changeEditPiggyItemBalanceOfPayments(toBoolean(e.target.value))
  }

  handleChangeCharge(e: React.ChangeEvent<HTMLInputElement>):void {
    this.props.changeEditPiggyItemCharge(e.target.value)
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
    if (this.props.piggyBankStore.piggyBank) {
      this.props.patchPiggyItem(this.props.piggyBankStore.piggyBank.id, store.id, params)
    }
  }

  render(): JSX.Element {
    return (
      <div className='piggy-items-component'>
        <table className='table'>
          <tbody>
            {this.props.piggyItemsStore.piggyItems.map((piggyItem) => (
              <tr key={piggyItem.id}>
                <td><HumanDate date={new Date(piggyItem.published_on)} /></td>
                <td>{piggyItem.name}</td>
                {this.props.piggyBankStore.piggyBank && (
                  <td>
                    <HumanChargeSet
                      balanceOfPayments={piggyItem.balance_of_payments}
                      charge={piggyItem.charge}
                      currency={this.props.piggyBankStore.piggyBank.currency}
                    />
                  </td>
                )}
                <EditFieldTd
                  isOpenEditModal={this.props.editPiggyItemStore.isOpen}
                  piggyItem={piggyItem}
                  onClickCloseButton={this.handleClickCloseButton}
                  onClickEditIcon={this.handleClickEditIcon}
                  form={<PiggyItemForm
                    piggyBank={this.props.piggyBankStore.piggyBank}
                    piggyItemStore={this.props.editPiggyItemStore}
                    onChangePublishedOn={this.handleChangePublishedOn}
                    onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
                    onChangeCharge={this.handleChangeCharge}
                    onChangeName={this.handleChangeName}
                    onKeyDown={this.handleKeyDown}
                    onClickSubmitButton={this.handleClickSubmitButton}
                  />}
                />
                <TrashFieldTd piggyItemId={piggyItem.id} onClickDestroyButton={this.handleClickDestroyButton} />
              </tr>
            ))}
          </tbody>
        </table>
        <NewPiggyItemField
          isOpen={this.props.newPiggyItemStore.isOpen}
          onClickButton={this.handleClickPlusButton}
          onCloseModal={this.handleCloseModal}
        />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    piggyBankStore: state.piggyBank,
    piggyItemsStore: state.piggyItems,
    newPiggyItemStore: state.newPiggyItem,
    editPiggyItemStore: state.editPiggyItem
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getPiggyItems(piggyBankId: number): void {
      dispatch(getPiggyItems(piggyBankId))
    },
    openNewPiggyItemModal(): void {
      dispatch(openNewPiggyItemModal())
    },
    closeNewPiggyItemModal(): void {
      dispatch(closeNewPiggyItemModal())
    },
    openEditPiggyItemModal(piggyItemStore: PiggyItem): void {
      dispatch(openEditPiggyItemModal(piggyItemStore))
    },
    closeEditPiggyItemModal(): void {
      dispatch(closeEditPiggyItemModal())
    },
    changeEditPiggyItemPublishedOn(date: Date): void {
      dispatch(changeEditPiggyItemPublishedOn(date))
    },
    changeEditPiggyItemBalanceOfPayments(balanceOfPayments: boolean): void {
      dispatch(changeEditPiggyItemBalanceOfPayments(balanceOfPayments))
    },
    changeEditPiggyItemName(name: string): void {
      dispatch(changeEditPiggyItemName(name))
    },
    changeEditPiggyItemCharge(charge: string): void {
      dispatch(changeEditPiggyItemCharge(charge))
    },
    deletePiggyItem(piggyBankId: number, piggyItemId: number): void {
      dispatch(deletePiggyItem(piggyBankId, piggyItemId)).then(() => {
        dispatch(getPiggyItems(piggyBankId))
      })
    },
    patchPiggyItem(piggyBankId: number, piggyItemId: number, params: PiggyItemParams): void {
      dispatch(patchPiggyItem(piggyBankId, piggyItemId, params)).then(() => {
        dispatch(getPiggyItems(piggyBankId))
      })
    }
  }
}

export default connect(mapState, mapDispatch)(PiggyItemsContainer)

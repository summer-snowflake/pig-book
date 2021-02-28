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
import NewPiggyItemField from 'components/piggy/newPiggyItemField'
import { PiggyItem, PiggyItemParams } from 'types/api'
import EditPiggyItemModal from 'components/common/editPiggyItemModal'
import PiggyItemEditIcon from 'components/piggy/piggyItemEditIcon'
import PiggyItemsTotalDisplayField from 'components/piggy/piggyItemsTotalDisplayField'

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

  handleChangeName(name: string): void {
    this.props.changeEditPiggyItemName(name)
  }

  handleChangeBalanceOfPayments(balanceOfPayments: boolean): void {
    this.props.changeEditPiggyItemBalanceOfPayments(balanceOfPayments)
  }

  handleChangeCharge(charge: string): void {
    this.props.changeEditPiggyItemCharge(charge)
  }

  handleClickSubmitButton(piggyItemId: number, params: PiggyItemParams): void {
    if (this.props.piggyBankStore.piggyBank) {
      this.props.patchPiggyItem(this.props.piggyBankStore.piggyBank.id, piggyItemId, params)
    }
  }

  render(): JSX.Element {
    return (
      <div className='piggy-items-component'>
        {this.props.piggyBankStore.piggyBank && (
          <PiggyItemsTotalDisplayField
            currency={this.props.piggyBankStore.piggyBank.currency}
            piggyItems={this.props.piggyItemsStore.piggyItems}
          />
        )}
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
                <td>
                  <PiggyItemEditIcon
                    piggyItem={piggyItem}
                    onClickIcon={this.handleClickEditIcon}
                    tooltipDisable={true}
                  />
                </td>
                <TrashFieldTd piggyItemId={piggyItem.id} onClickDestroyButton={this.handleClickDestroyButton} />
              </tr>
            ))}
          </tbody>
        </table>
        <EditPiggyItemModal
          editPiggyItemStore={this.props.editPiggyItemStore}
          piggyBank={this.props.piggyBankStore.piggyBank}
          onClickCloseButton={this.handleClickCloseButton}
          onChangePublishedOn={this.handleChangePublishedOn}
          onChangeName={this.handleChangeName}
          onChangeBalanceOfPayments={this.handleChangeBalanceOfPayments}
          onChangeCharge={this.handleChangeCharge}
          onClickSubmitButton={this.handleClickSubmitButton}
        />
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
    openEditPiggyItemModal(piggyItem: PiggyItem): void {
      dispatch(openEditPiggyItemModal(piggyItem))
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

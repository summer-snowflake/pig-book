import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { NewPiggyItemStore, PiggyBankStore, PiggyItemsStore } from 'types/store'
import { getPiggyItems } from 'actions/piggyItemsActions'
import { closeNewPiggyItemModal, openNewPiggyItemModal } from 'actions/piggyItemActions'
import { RootState } from 'reducers/rootReducer'
import HumanChargeSet from 'components/common/humanChargeSet'
import HumanDate from 'components/common/humanDate'
import NewPiggyItemField from 'components/piggy/newPiggyItemField'

interface ParentProps {
  piggyBankId: number;
}

interface StateProps {
  piggyBankStore: PiggyBankStore;
  piggyItemsStore: PiggyItemsStore;
  newPiggyItemStore: NewPiggyItemStore;
}

interface DispatchProps {
  getPiggyItems: (piggyBankId: number) => void;
  openNewPiggyItemModal: () => void;
  closeNewPiggyItemModal: () => void;
}

type Props = ParentProps & StateProps & DispatchProps

class PiggyItemsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickPlusButton = this.handleClickPlusButton.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)

    this.props.getPiggyItems(this.props.piggyBankId)
  }

  handleClickPlusButton(): void {
    this.props.openNewPiggyItemModal()
  }

  handleCloseModal(): void {
    this.props.closeNewPiggyItemModal()
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
                    <HumanChargeSet balanceOfPayments={piggyItem.balance_of_payments} charge={piggyItem.charge} currency={this.props.piggyBankStore.piggyBank.currency} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <NewPiggyItemField isOpen={this.props.newPiggyItemStore.isOpen} onClickButton={this.handleClickPlusButton} onCloseModal={this.handleCloseModal} />
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    piggyBankStore: state.piggyBank,
    piggyItemsStore: state.piggyItems,
    newPiggyItemStore: state.newPiggyItem
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
    }
  }
}

export default connect(mapState, mapDispatch)(PiggyItemsContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { PiggyBankStore, PiggyItemsStore } from 'types/store'
import { getPiggyItems } from 'actions/piggyItemsActions'
import { RootState } from 'reducers/rootReducer'
import HumanChargeSet from 'components/common/humanChargeSet'
import HumanDate from 'components/common/humanDate'

interface ParentProps {
  piggyBankId: number;
}

interface StateProps {
  piggyBankStore: PiggyBankStore;
  piggyItemsStore: PiggyItemsStore;
}

interface DispatchProps {
  getPiggyItems: (piggyBankId: number) => void;
}

type Props = ParentProps & StateProps & DispatchProps

class PiggyItemsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getPiggyItems(this.props.piggyBankId)
  }

  render(): JSX.Element {
    return (
      <div className='piggy-items-component'>
        <table className='table'>
          <tbody>
            {this.props.piggyItemsStore.piggyItems.map((piggyItem) => (
              <tr key={piggyItem.id}>
                <td>{piggyItem.name}</td>
                {this.props.piggyBankStore.piggyBank && (
                  <td>
                    <HumanChargeSet balanceOfPayments={piggyItem.balance_of_payments} charge={piggyItem.charge} currency={this.props.piggyBankStore.piggyBank.currency} />
                  </td>
                )}
                <td><HumanDate date={new Date(piggyItem.published_on)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    piggyBankStore: state.piggyBank,
    piggyItemsStore: state.piggyItems
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getPiggyItems(piggyBankId: number): void {
      dispatch(getPiggyItems(piggyBankId))
    }
  }
}

export default connect(mapState, mapDispatch)(PiggyItemsContainer)

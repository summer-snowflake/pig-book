import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Breakdown } from 'types/api'
import { BreakdownsStore } from 'types/store'
import { getBreakdowns } from 'actions/breakdownsActions'
import { RootState } from 'reducers/rootReducer'
import BreakdownTableRecordContainer from 'components/settings/breakdown/breakdownTableRecordContainer'
import LoadingImage from 'components/common/loadingImage'
import Counter from 'components/common/counter'

interface StateProps {
  breakdownsStore: BreakdownsStore;
}

interface DispatchProps {
  getBreakdowns: () => void;
}

type Props = StateProps & DispatchProps

class BreakdownsListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getBreakdowns()
  }

  render(): JSX.Element {
    return (
      <div className='breakdowns-list-component'>
        <Counter count={this.props.breakdownsStore.breakdowns.length} max={20} />
        <table className='table'>
          <tbody>
            {this.props.breakdownsStore.breakdowns.map((breakdown: Breakdown) => (
              <BreakdownTableRecordContainer breakdown={breakdown} key={breakdown.id} />
            ))}
          </tbody>
        </table>
        {this.props.breakdownsStore.breakdowns.length === 0 && this.props.breakdownsStore.isLoading && (
          <LoadingImage />
        )}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    breakdownsStore: state.breakdowns
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getBreakdowns(): void {
      dispatch(getBreakdowns())
    }
  }
}

export default connect(mapState, mapDispatch)(BreakdownsListContainer)

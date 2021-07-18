import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Breakdown } from 'types/api'
import { BreakdownsStore } from 'types/store'
import { getBreakdowns } from 'actions/breakdownsActions'
import { RootState } from 'reducers/rootReducer'
import LoadingImage from 'components/common/LoadingImage'
import BreakdownItem from 'components/settings/breakdown/BreakdownItem'

interface StateProps {
  breakdownsStore: BreakdownsStore;
}

interface DispatchProps {
  getBreakdowns: () => void;
}

type Props = StateProps & DispatchProps

class BreakdownsList extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getBreakdowns()
  }

  render(): JSX.Element {
    return (
      <div className='breakdowns-list-component'>
        <div className='counter'>
          {this.props.breakdownsStore.breakdowns.length + ' / 20'}
        </div>
        <table className='table'>
          <tbody>
            {this.props.breakdownsStore.breakdowns.map((breakdown: Breakdown) => (
              <BreakdownItem breakdown={breakdown} key={breakdown.id} />
            ))}
            {this.props.breakdownsStore.breakdowns.length === 0 && this.props.breakdownsStore.isLoading && (
              <LoadingImage />
            )}
          </tbody>
        </table>
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

export default connect(mapState, mapDispatch)(BreakdownsList)

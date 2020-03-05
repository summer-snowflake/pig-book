import React, { Component } from 'react'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Breakdown } from 'types/api'
import BreakdownTableRecordContainer from 'components/settings/breakdown/breakdownTableRecordContainer'
import { getBreakdowns } from 'actions/breakdownsActions'
import { RootState } from 'reducers/rootReducer'

interface StateProps {
  breakdowns: {
    breakdowns: Breakdown[];
  };
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
      <table className='table breakdowns-list-component'>
        <tbody>
          {this.props.breakdowns.breakdowns.map((breakdown: Breakdown) => (
            <BreakdownTableRecordContainer breakdown={breakdown} key={breakdown.id} />
          ))}
        </tbody>
      </table>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    breakdowns: state.breakdowns
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

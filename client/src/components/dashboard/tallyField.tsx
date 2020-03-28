import React, { Component } from 'react'

import TallyButton from 'components/common/tallyButton'
import HumanTime from 'components/common/humanTime'
import { DashboardStore } from 'types/store'

interface Props {
  disabled: boolean;
  dashboard: DashboardStore;
  onClickTallyButton: (year: number) => void;
}

class TallyField extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
  }

  handleClickTallyButton(): void {
    this.props.onClickTallyButton(Number(this.props.dashboard.yearly.year))
  }

  render(): JSX.Element {
    return (
      <div className='tally-field-component  dashboard-tally-field float-right'>
        {this.props.dashboard.event && (
          <span className='tally-time'>
            <HumanTime date={new Date(this.props.dashboard.event.created_at)} />
          </span>
        )}
        <TallyButton disabled={this.props.disabled} onClickButton={this.handleClickTallyButton} year={this.props.dashboard.year} />
      </div>
    )
  }
}

export default TallyField

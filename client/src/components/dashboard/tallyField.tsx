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
    this.props.onClickTallyButton(Number(this.props.dashboard.year))
  }

  render(): JSX.Element {
    return (
      <span className='tally-field-component dashboard-tally-field'>
        {this.props.dashboard.event && (
          <span className='tally-time'>
            <HumanTime date={new Date(this.props.dashboard.event.created_at)} />
          </span>
        )}
        <TallyButton disabled={this.props.disabled} onClickButton={this.handleClickTallyButton} year={this.props.dashboard.year} />
      </span>
    )
  }
}

export default TallyField

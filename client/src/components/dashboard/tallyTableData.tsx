import React, { Component } from 'react'

import { MonthlyBalanceTable, YearlyBalanceTable } from 'types/api'
import HumanCharge from 'components/common/humanCharge'

interface Props {
  isCashlessRange: boolean;
  tally: MonthlyBalanceTable | YearlyBalanceTable | undefined;
}

class TallyTableData extends Component<Props> {
  render(): JSX.Element {
    return (
      <td className='tally-table-data-component'>
        <span className='tally-text'>
          <i className='fas fa-plus-square left-icon blue' />
          <HumanCharge charge={this.props.tally?.income || 0} currency={this.props.tally?.currency || ''} />
        </span>
        <span className='tally-text'>
          <i className='fas fa-minus-square left-icon red' />
          <HumanCharge charge={this.props.tally?.expenditure || 0} currency={this.props.tally?.currency || ''} />
        </span>

        { this.props.isCashlessRange && (
          <span className='tally-text'>
            <i className='far fa-check-square left-icon' />
            <HumanCharge charge={this.props.tally?.cashless_charge || 0} currency={this.props.tally?.currency || ''} />
          </span>
        )}
        <span className='tally-text'>
          <i className='fas fa-parking left-icon' />
          {this.props.tally?.point || 0}
        </span>
      </td>
    )
  }
}

export default TallyTableData

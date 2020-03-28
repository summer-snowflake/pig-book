import React, { Component } from 'react'

import { MonthlyBalanceTable, YearlyBalanceTable } from 'types/api'
import HumanCharge from 'components/common/humanCharge'

interface Props {
  tally: MonthlyBalanceTable | YearlyBalanceTable | undefined;
}

class TallyTableData extends Component<Props> {
  render(): JSX.Element {
    return (
      <td className='tally-table-data-component'>
        <div>
          <i className='fas fa-plus-square left-icon blue' />
          <HumanCharge charge={this.props.tally?.income || 0} currency={this.props.tally?.currency} />
        </div>
        <div>
          <i className='fas fa-minus-square left-icon red' />
          <HumanCharge charge={this.props.tally?.expenditure || 0} currency={this.props.tally?.currency} />
        </div>
        <div>
          <i className='far fa-check-square left-icon' />
          <HumanCharge charge={this.props.tally?.cashless_charge || 0} currency={this.props.tally?.currency} />
        </div>
        <div>
          <i className='fas fa-parking left-icon' />
          {this.props.tally?.cashless_charge || 0}
        </div>
      </td>
    )
  }
}

export default TallyTableData

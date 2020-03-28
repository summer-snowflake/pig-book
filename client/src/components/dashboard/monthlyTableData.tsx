import React, { Component } from 'react'

import { MonthlyBalanceTable } from 'types/api'
import HumanCharge from 'components/common/humanCharge'

interface Props {
  monthly: MonthlyBalanceTable | undefined;
  currency: string;
}

class MonthlyTableData extends Component<Props> {
  render(): JSX.Element {
    return (
      <td className='monthly-table-data-component'>
        <div>
          <i className='fas fa-plus-square left-icon blue' />
          <HumanCharge charge={this.props.monthly?.income || 0} currency={this.props.currency} />
        </div>
        <div>
          <i className='fas fa-minus-square left-icon red' />
          <HumanCharge charge={this.props.monthly?.expenditure || 0} currency={this.props.currency} />
        </div>
        <div>
          <i className='far fa-check-square left-icon' />
          <HumanCharge charge={this.props.monthly?.cashless_charge || 0} currency={this.props.currency} />
        </div>
        <div>
          <i className='fas fa-parking left-icon' />
          {this.props.monthly?.cashless_charge || 0}
        </div>
      </td>
    )
  }
}

export default MonthlyTableData

import React, { Component } from 'react'
import { MonthlyBalanceTable } from 'types/api'

interface Props {
  monthly: MonthlyBalanceTable | undefined;
}

class MonthlyTableData extends Component<Props> {
  render(): JSX.Element {
    return (
      <td className='monthly-table-data-component'>
        <p>
          <i className='fas fa-plus-square left-icon blue' />
          {this.props.monthly?.income || 0}
        </p>
        <p>
          <i className='fas fa-minus-square left-icon red' />
          {this.props.monthly?.expenditure || 0}
        </p>
        <p>
          <i className='far fa-check-square left-icon' />
          {this.props.monthly?.cashless_charge || 0}
        </p>
        <p>
          <i className='fas fa-parking left-icon' />
          {this.props.monthly?.cashless_charge || 0}
        </p>
      </td>
    )
  }
}

export default MonthlyTableData

import React, { Component } from 'react'

import { AssetsAccount } from 'types/api'
import CheckBox from 'components/common/CheckBox'
import HumanCharge from 'components/common/HumanCharge'

interface ParentProps {
  assetsAccount: AssetsAccount;
}

type Props = ParentProps

class AssetsAccountItem extends Component<Props> {
  render(): JSX.Element {
    return (
      <tr className='assets-account-item-component'>
        <td>
          <i className='fas fa-bars green cursor-move' />
        </td>
        <td>
          <CheckBox checked={this.props.assetsAccount.checked} />
        </td>
        <td>
          {this.props.assetsAccount.name}
        </td>
        <td>
          <HumanCharge
            balanceOfPayments={this.props.assetsAccount.balance_of_payments}
            humanCharge={this.props.assetsAccount.human_charge} />
        </td>
        <td className='column-human-date'>
          {this.props.assetsAccount.human_updated_at}
        </td>
        <td className='column-human-now'>
          {this.props.assetsAccount.from_now}
        </td>
      </tr>
    )
  }
}

export default AssetsAccountItem

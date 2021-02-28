import React, { Component } from 'react'

import { PiggyBank } from 'types/api'

interface ParentProps {
  piggyBank: PiggyBank;
  onClickPiggyBankTitle: (targetId: number) => void;
}

type Props = ParentProps

class PiggyBankListItem extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickPiggyBankTitle = this.handleClickPiggyBankTitle.bind(this)
  }

  handleClickPiggyBankTitle(): void {
    this.props.onClickPiggyBankTitle(this.props.piggyBank.id)
  }

  render(): JSX.Element {
    return (
      <li className='piggy-bank-list-item-component piggy-bank-list-item' key={this.props.piggyBank.id} onClick={this.handleClickPiggyBankTitle}>
        {this.props.piggyBank.title}
      </li>
    )
  }
}

export default PiggyBankListItem

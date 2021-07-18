import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Breakdown } from 'types/api'

interface Props extends I18nProps {
  breakdowns: Breakdown[];
  isLoading: boolean;
  defaultBreakdownId: number | undefined;
  onChangeBreakdown: (breakdownId: number) => void;
}

class BreakdownSelectBox extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeBreakdown = this.handleChangeBreakdown.bind(this)
  }

  handleChangeBreakdown(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.props.onChangeBreakdown(Number(e.target.value))
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <select
        className='breakdown-select-box-component select-form-control'
        disabled={this.props.isLoading || this.props.breakdowns.length === 0}
        name='breakdowns-list'
        onChange={this.handleChangeBreakdown}
        value={this.props.defaultBreakdownId || ''}>
        <option>{'- ' + t('menu.breakdown') + ' -'}</option>
        {this.props.breakdowns
          .map((breakdown: Breakdown) => (
            <option key={breakdown.id} value={breakdown.id}>{breakdown.name}</option>
          ))}
      </select>
    )
  }
}

export default withTranslation()(BreakdownSelectBox)

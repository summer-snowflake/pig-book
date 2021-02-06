import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { YearlyBalanceTable } from 'types/api'
import TallyTableData from 'components/dashboard/tallyTableData'

interface Props extends I18nProps {
  year: number;
  yearly: YearlyBalanceTable;
}

class YearlyData extends Component<Props> {
  isCashlessRange(): boolean {
    return this.props.year === 2019 || this.props.year === 2020
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <tr className='yearly-data-component'>
        <td>
          {t('label.total')}
        </td>
        <TallyTableData isCashlessRange={this.isCashlessRange()} tally={this.props.yearly} />
      </tr>
    )
  }
}

export default withTranslation()(YearlyData)

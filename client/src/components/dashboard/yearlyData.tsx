import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { YearlyBalanceTable } from 'types/api'
import TallyTableData from 'components/dashboard/tallyTableData'

interface Props extends I18nProps {
  yearly: YearlyBalanceTable;
}

class YearlyData extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <tr className='yearly-data-component'>
        <td>
          {t('label.total')}
        </td>
        <TallyTableData tally={this.props.yearly} />
      </tr>
    )
  }
}

export default withTranslation()(YearlyData)

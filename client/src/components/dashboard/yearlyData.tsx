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
      <tbody className='yearly-data-component'>
        <tr>
          <td>
            {t('label.total')}
          </td>
        </tr>
        <tr>
          <TallyTableData tally={this.props.yearly} />
        </tr>
      </tbody>
    )
  }
}

export default withTranslation()(YearlyData)

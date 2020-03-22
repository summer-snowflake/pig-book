import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { RecordTotals } from 'types/api'

interface Props extends I18nProps {
  totals: RecordTotals;
}

class RecordTotalsTable extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='record-totals-component'>
        <table className='table table-bordered float-right'>
          <tbody>
            <tr>
              <td>
                {t('label.total')}
                {this.props.totals.human_all_charge}
              </td>
              <td>
                <i className='fas fa-plus-square left-icon blue' />
                {this.props.totals.human_income_charge}
              </td>
              <td>
                <i className='fas fa-minus-square left-icon red' />
                {this.props.totals.human_expenditure_charge}
              </td>
              <td>
                <i className='far fa-check-square left-icon' />
                {this.props.totals.use_cashless_charge}
              </td>
              <td>
                <i className='fas fa-parking left-icon' />
                {this.props.totals.use_point}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default withTranslation()(RecordTotalsTable)

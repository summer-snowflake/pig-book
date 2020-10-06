import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { Dashboard } from 'types/api'

interface Props extends I18nProps {
  dashboards: Dashboard[];
}

class YearlyBarChartSmall extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.setFormatter = this.setFormatter.bind(this)
    this.setLabelFormatter = this.setLabelFormatter.bind(this)
  }

  tooltipValue(charge: string): string {
    const { t } = this.props

    if (t('label.locale') === 'jp-JP') {
      return Math.floor(Number(charge)).toLocaleString(t('label.locale'), { style: 'currency', currency: 'JPY'})
    } else {
      return Number(charge).toLocaleString(t('label.locale'), { maximumSignificantDigits: 3 })
    }
  }

  setFormatter(value: string, name: string, props: string): string[] {
    return [this.tooltipValue(value), name, props]
  }

  setLabelFormatter(props: string): string {
    const { t } = this.props
    return props + t('label.month')
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='yearly-bar-chart-small-component'>
        {this.props.dashboards.length > 0 && (
          <BarChart
            data={this.props.dashboards}
            height={300}
            width={265}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' unit='' />
            <YAxis
              hide={true}
              orientation='right'
            />
            <Tooltip
              cursor={false}
              formatter={this.setFormatter}
              labelFormatter={this.setLabelFormatter}
            />
            <Legend />
            <Bar dataKey='yearly_total.income' fill='#5e78ac' name={t('label.income')} />
            <Bar dataKey='yearly_total.expenditure' fill='#ac5e78' name={t('label.outgo')} />
          </BarChart>
        )}
      </div>
    )
  }
}

export default withTranslation()(YearlyBarChartSmall)

import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

import { YearlyBalanceTable } from 'types/api'

interface Props extends I18nProps {
  dataKey: string;
  yearly: YearlyBalanceTable[];
}

class YearlyPieChart extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props
    const yearly: YearlyBalanceTable[] = Object.assign(this.props.yearly)
    yearly.map((y) => {
      y.income = Number(y.income)
      y.expenditure = Number(y.expenditure)
      return y
    })
    // Tooltip ラベル
    const incomeTotal = yearly.length > 0 ? yearly.map ((t) => t.income).reduce((acc, cur) => acc + cur) : 0
    const outgoTotal = yearly.length > 0 ? yearly.map ((t) => t.expenditure).reduce((acc, cur) => acc + cur) : 0
    const formatTooltip = (value: number, _name: string, props: { payload: YearlyBalanceTable }): string => {
      const charge: number = this.props.dataKey === 'income' ? props.payload.income : props.payload.expenditure
      let humanCharge = ''
      if (t('label.locale') === 'jp-JP') {
        humanCharge = Math.floor(charge).toLocaleString(t('label.locale'), { style: 'currency', currency: 'JPY'})
      } else {
        humanCharge = charge.toLocaleString(t('label.locale'), { maximumSignificantDigits: 3 })
      }
      return humanCharge + ' (Rate: ' + (value / (this.props.dataKey === 'income' ? incomeTotal : outgoTotal) * 100).toFixed(0) + '%)'
    }
    // カラー
    const categoryColors = this.props.dataKey === 'income' ? (
      ['#8094bd', '#94bd80', '#80bda9', '#80b3bd', '#8dcae1', '#80bd8a', '#70a1b4']
    ) : (
      ['#d78ea5', '#d78ecf', '#ed9f96', '#e18dd1', '#f4c430', '#ed9583', '#ed96b9']
    )

    return (
      <div className='yearly-pie-chart-component'>
        <PieChart height={250} width={340}>
          <text dy={8} fill='#666666' textAnchor='middle' x='50%' y='50%'>
            {this.props.dataKey === 'income' ? t('label.income') : t('label.outgo') }
          </text>
          <Tooltip formatter={formatTooltip} />
          <Pie
            cx='50%'
            cy='50%'
            data={yearly.slice(0, 6).concat(yearly.slice(6))}
            dataKey={this.props.dataKey}
            innerRadius={40}
            nameKey='label'
            outerRadius={75}
          >
            {yearly.map((_entry, index) => <Cell fill={categoryColors[index % categoryColors.length]} key={index} />)}
          </Pie>
        </PieChart>
      </div>
    )
  }
}

export default withTranslation()(YearlyPieChart)

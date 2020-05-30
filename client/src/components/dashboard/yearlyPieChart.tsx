import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

import { YearlyBalanceTable } from 'types/api'

interface Props extends I18nProps {
  dataKey: string;
  categoryYearly: YearlyBalanceTable[];
  breakdownYearly: YearlyBalanceTable[];
}

class YearlyPieChart extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this)
  }

  renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, index }: { cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; index: number }): any {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 2.0
    const x: number = cx + radius * Math.cos(-midAngle * RADIAN)
    const y: number = cy + radius * Math.sin(-midAngle * RADIAN)
    const data = this.props.categoryYearly[index]

    return (
      <text dominantBaseline='central' fill='#666666' textAnchor={x > cx ? 'start' : 'end'} x={x} y={y}>
        {data.label}
      </text>
    )
  }

  render(): JSX.Element {
    const { t } = this.props
    const categoryYearly: YearlyBalanceTable[] = Object.assign(this.props.categoryYearly)
    categoryYearly.map((y) => {
      y.income = Number(y.income)
      y.expenditure = Number(y.expenditure)
      return y
    })
    const breakdownYearly: YearlyBalanceTable[] = Object.assign(this.props.breakdownYearly)
    breakdownYearly.map((y) => {
      y.income = Number(y.income)
      y.expenditure = Number(y.expenditure)
      return y
    })
    // Tooltip ラベル
    const incomeTotal = categoryYearly.length > 0 ? categoryYearly.map ((t) => t.income).reduce((acc, cur) => acc + cur) : 0
    const outgoTotal = categoryYearly.length > 0 ? categoryYearly.map ((t) => t.expenditure).reduce((acc, cur) => acc + cur) : 0
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
    const breakdownColors = this.props.dataKey === 'income' ? (
      ['#7385aa', '#85aa73', '#73aa98', '#73a1aa', '#7eb5ca', '#73aa7c', '#6490a2']
    ) : (
      ['#c17f94', '#c17fba', '#d58f87', '#ca7ebc', '#dbb02b', '#d58675', '#d587a6']
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
            data={categoryYearly.slice(0, 6).concat(categoryYearly.slice(6))}
            dataKey={this.props.dataKey}
            innerRadius={40}
            label={this.renderCustomizedLabel}
            labelLine={false}
            nameKey='label'
            outerRadius={75}
          >
            {categoryYearly.map((_entry, index) => <Cell fill={categoryColors[index % categoryColors.length]} key={index} />)}
          </Pie>
          <Pie
            cx='50%'
            cy='50%'
            data={breakdownYearly}
            dataKey={this.props.dataKey}
            innerRadius={80}
            nameKey='label'
          >
            {breakdownYearly.map((entry, index) => <Cell fill={breakdownColors[(categoryYearly.findIndex(({category_id})=> category_id === entry.category_id))]} key={index} />)}
          </Pie>
        </PieChart>
      </div>
    )
  }
}

export default withTranslation()(YearlyPieChart)

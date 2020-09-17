import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

import { YearlyBalanceTable } from 'types/api'

interface Props extends I18nProps {
  dataKey: string;
  categoryYearly: YearlyBalanceTable[];
  breakdownYearly: YearlyBalanceTable[];
  onUnmount: () => void;
}

class YearlyPieChart extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.setFormatter = this.setFormatter.bind(this)
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this)
    this.categoryYearly = this.categoryYearly.bind(this)
    this.breakdownYearly = this.breakdownYearly.bind(this)
  }

  componentWillUnmount() {
    this.props.onUnmount()
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

  tooltipValue(charge: number): string {
    const { t } = this.props

    if (t('label.locale') === 'jp-JP') {
      return Math.floor(charge).toLocaleString(t('label.locale'), { style: 'currency', currency: 'JPY'})
    } else {
      return charge.toLocaleString(t('label.locale'), { maximumSignificantDigits: 3 })
    }
  }

  setFormatter(value: number, name: string, props: { payload: YearlyBalanceTable } ): string {
    const incomeTotal = this.categoryYearly().length > 0 ? this.categoryYearly().map ((t) => t.income).reduce((acc, cur) => acc + cur) : 0
    const outgoTotal = this.categoryYearly().length > 0 ? this.categoryYearly().map ((t) => t.expenditure).reduce((acc, cur) => acc + cur) : 0

    const charge: number = this.props.dataKey === 'income' ? props.payload.income : props.payload.expenditure
    return this.tooltipValue(charge) + ' (Rate: ' + (value / (this.props.dataKey === 'income' ? incomeTotal : outgoTotal) * 100).toFixed(0) + '%)'
  }

  categoryYearly() {
    const categoryYearly: YearlyBalanceTable[] = Object.assign(this.props.categoryYearly)
    categoryYearly.map((y) => {
      y.income = Number(y.income)
      y.expenditure = Number(y.expenditure)
      return y
    })
    return categoryYearly
  }

  breakdownYearly() {
    const breakdownYearly: YearlyBalanceTable[] = Object.assign(this.props.breakdownYearly)
    breakdownYearly.map((y) => {
      y.income = Number(y.income)
      y.expenditure = Number(y.expenditure)
      return y
    })
    return breakdownYearly
  }

  render(): JSX.Element {
    const { t } = this.props
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
        <PieChart height={250} width={300}>
          <text dy={8} fill='#666666' textAnchor='middle' x='50%' y='50%'>
            {this.props.dataKey === 'income' ? t('label.income') : t('label.outgo') }
          </text>
          <Tooltip formatter={this.setFormatter} />
          <Pie
            cx='50%'
            cy='50%'
            data={this.categoryYearly().slice(0, 6).concat(this.categoryYearly().slice(6))}
            dataKey={this.props.dataKey}
            innerRadius={40}
            label={this.renderCustomizedLabel}
            labelLine={false}
            nameKey='label'
            outerRadius={75}
          >
            {this.categoryYearly().map((_entry, index) => <Cell fill={categoryColors[index % categoryColors.length]} key={index} />)}
          </Pie>
          <Pie
            cx='50%'
            cy='50%'
            data={this.breakdownYearly()}
            dataKey={this.props.dataKey}
            innerRadius={80}
            nameKey='label'
          >
            {this.breakdownYearly().map((entry, index) => <Cell fill={breakdownColors[(this.categoryYearly().findIndex(({category_id})=> category_id === entry.category_id))]} key={index} />)}
          </Pie>
        </PieChart>
      </div>
    )
  }
}

export default withTranslation()(YearlyPieChart)

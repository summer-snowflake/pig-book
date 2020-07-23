import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import { MonthlyCategoryBalanceTable, Breakdown, Category } from 'types/api';
import { categoryColors } from 'modules/colors'

interface ParentProps {
  monthlyTotal: MonthlyCategoryBalanceTable[];
  category: Category;
  breakdowns: Breakdown[];
}

type Props = ParentProps & I18nProps

class MonthlyCategoryBarChart extends Component<Props> {
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
    const width = window.innerWidth < 630 ? 386 : 600
    const XUnit = window.innerWidth < 630 ? '' : t('label.month')

    return (
      <div className='monthly-category-bar-chart-component'>
        {this.props.monthlyTotal.length !== 0 && (
          <BarChart
            data={this.props.monthlyTotal}
            height={300}
            width={width}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' unit={XUnit} />
            <YAxis orientation='right' />
            <Tooltip
              cursor={false}
              formatter={this.setFormatter}
              labelFormatter={this.setLabelFormatter}
            />
            <Legend />
            {this.props.breakdowns.map((breakdown, index) => (
              <Bar
                barSize={20}
                dataKey={breakdown.name}
                key={breakdown.id}
                fill={categoryColors(this.props.category.balance_of_payments)[index % categoryColors(this.props.category.balance_of_payments).length]}
                stackId={'breakdown'}
                stroke={'#f3e7d6'}
                strokeWidth={1}
              />
            ))}
            <Bar
              barSize={20}
              dataKey={t('label.none')}
              stackId={'breakdown'}
              fill={'#999'}
              stroke={'#f3e7d6'}
              strokeWidth={1}
            />
          </BarChart>
        )}
      </div>
    );
  }
}

export default withTranslation()(MonthlyCategoryBarChart)
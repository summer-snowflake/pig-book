import React from 'react'
import PropTypes from 'prop-types'

import { PieChart, Tooltip, Pie, Cell } from 'recharts'

class CategoryPieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryTally: this.props.categoryTally,
      breakdownTally: this.props.breakdownTally
    }
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryTally: nextProps.categoryTally,
      breakdownTally: nextProps.breakdownTally
    })
  }

  renderCustomizedLabel({cx, cy, midAngle, innerRadius, outerRadius, index}) {
    let RADIAN = Math.PI / 180
    let radius = innerRadius + (outerRadius - innerRadius) * 2.0
    let x = cx + radius * Math.cos(-midAngle * RADIAN)
    let y = cy + radius * Math.sin(-midAngle * RADIAN)
    let data = this.state.categoryTally[index]
    return (
      <text dominantBaseline='central' fill='#666666' textAnchor={x > cx ? 'start' : 'end'} x={x} y={y}>
        {data.category_name}
      </text>
    )
  }

  render() {
    let total = this.state.categoryTally.length > 0 ? this.state.categoryTally.map ((t) => t.charge).reduce((acc, cur) => acc + cur) : 0
    let formatTooltip = (value, name, props) => props.payload.human_charge + ' (Rate: ' + (value / total * 100).toFixed(0) + '%)'
    let categoryColors = this.props.balanceOfPayments ? (
      ['#8094bd', '#94bd80', '#80bda9', '#80b3bd', '#8dcae1', '#80bd8a', '#70a1b4']
    ) : (
      ['#d78ea5', '#d78ecf', '#ed9f96', '#e18dd1', '#f4c430', '#ed9583', '#ed96b9']
    )
    let breakdownColors = this.props.balanceOfPayments ? (
      ['#667697', '#769766', '#669787', '#668f97', '#70A1B4', '#66976e', '#598090']
    ) : (
      ['#ac7184', '#ac71a5', '#bd7f78', '#b470a7', '#c39c26', '#bd7768', '#bd7894']
    )

    return (
      <div className='category-pie-chart-component'>
        <PieChart height={250} width={340}>
          <text dy={8} fill='#666666' textAnchor='middle' x='50%' y='50%'>
            {this.props.balanceOfPayments ? '収入' : '支出' }
          </text>
          <Tooltip formatter={formatTooltip} />
          <Pie cx='50%' cy='50%' data={this.state.breakdownTally} dataKey='charge' fill='#61abbb' innerRadius={80} nameKey='breakdown_name'>
            {this.props.categoryTally.map((entry, index) => <Cell fill={breakdownColors[index % breakdownColors.length]} key={index} />)}
          </Pie>
          <Pie cx='50%' cy='50%' data={this.state.categoryTally} dataKey='charge' fill='#ffd351' innerRadius={40} label={this.renderCustomizedLabel} labelLine={false} nameKey='category_name' outerRadius={75}>
            {this.props.categoryTally.map((entry, index) => <Cell fill={categoryColors[index % categoryColors.length]} key={index} />)}
          </Pie>
        </PieChart>
      </div>
    )
  }
}

CategoryPieChart.propTypes = {
  breakdownTally: PropTypes.array,
  categoryTally: PropTypes.array,
  balanceOfPayments: PropTypes.bool
}

export default CategoryPieChart

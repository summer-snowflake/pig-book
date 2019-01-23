import React from 'react'
import PropTypes from 'prop-types'

import { PieChart, Tooltip, Pie, Cell } from 'recharts'

class CategoryPieChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tally: this.props.tally
    }
    this.renderCustomizedLabel = this.renderCustomizedLabel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tally: nextProps.tally
    })
  }

  renderCustomizedLabel({cx, cy, midAngle, innerRadius, outerRadius, index}) {
    let RADIAN = Math.PI / 180
    let radius = innerRadius + (outerRadius - innerRadius) * 2.0
    let x = cx + radius * Math.cos(-midAngle * RADIAN)
    let y = cy + radius * Math.sin(-midAngle * RADIAN)
    let data = this.state.tally[index]
    return (
      <text dominantBaseline='central' fill='#666666' textAnchor={x > cx ? 'start' : 'end'} x={x} y={y}>
        {data.category_name}
      </text>
    )
  }

  render() {
    let total = this.state.tally.length > 0 ? this.state.tally.map ((t) => t.charge).reduce((acc, cur) => acc + cur) : 0
    let formatTooltip = (value, name, props) => props.payload.human_charge + ' (Rate: ' + (value / total * 100).toFixed(0) + '%)'
    let colors = this.props.balanceOfPayments ? (
      ['#8884d8', '#d0ed57', '#a4de6c', '#82ca9d', '#8dd1e1', '#83a6ed']
    ) : (
      ['#d88884', '#edbf57', '#de6cdd', '#ca82af', '#e18dd1', '#ed9583']
    )

    return (
      <div className='category-pie-chart-component'>
        <PieChart height={250} width={340}>
          <text dy={8} fill='#666666' textAnchor='middle' x='50%' y='50%'>
            {this.props.balanceOfPayments ? '収入' : '支出' }
          </text>
          <Tooltip formatter={formatTooltip} />
          <Pie cx='50%' cy='50%' data={this.state.tally} dataKey='charge' fill='#61abbb' innerRadius={80} nameKey='category_name'>
            {this.props.tally.map((entry, index) => <Cell fill={colors[index % colors.length]} key={index} />)}
          </Pie>
          <Pie cx='50%' cy='50%' data={this.state.tally} dataKey='charge' fill='#ffd351' innerRadius={40} label={this.renderCustomizedLabel} labelLine={false} nameKey='category_name' outerRadius={75}>
            {this.props.tally.map((entry, index) => <Cell fill={colors[index % colors.length]} key={index} />)}
          </Pie>
        </PieChart>
      </div>
    )
  }
}

CategoryPieChart.propTypes = {
  tally: PropTypes.array,
  balanceOfPayments: PropTypes.bool
}

export default CategoryPieChart

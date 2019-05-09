import React from 'react'
import PropTypes from 'prop-types'

import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar } from 'recharts'

class YearlyChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tally: this.props.tally
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tally: nextProps.tally
    })
  }

  render() {
    return (
      <div className='yearly-chart-component'>
        <ComposedChart className='yearly-chart' data={this.state.tally} height={300} margin={{ top: 20, right: 60, bottom: 0, left: 0 }} width={680}>
          <XAxis dataKey='year' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke='#c5d967' />
          <Bar barSize={14} dataKey='income' fill='#5e78ac' fillOpacity={1} name='収入' stroke='rgba(34, 80, 162, 0.2)' />
          <Bar barSize={14} dataKey='expenditure' fill='#ac5e78' fillOpacity={1} name='支出' stroke='rgba(34, 80, 162, 0.2)' />
        </ComposedChart>
      </div>
    )
  }
}

YearlyChart.propTypes = {
  tally: PropTypes.array
}

export default YearlyChart

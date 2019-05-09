import React from 'react'
import PropTypes from 'prop-types'

class MonthlyTotalPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyTotal: { point: '0' }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      monthlyTotal: nextProps.tally.find( data => data.month == this.props.month )
    })
  }

  render() {
    return (
      <div className='monthly-total-point-component'>
        <i className='fas fa-parking left-icon green' />
        {(this.state.monthlyTotal || {}).point}
      </div>
    )
  }
}

MonthlyTotalPoint.propTypes = {
  month: PropTypes.number.isRequired,
  tally: PropTypes.array
}

export default MonthlyTotalPoint

import React from 'react'
import PropTypes from 'prop-types'

class SquareIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='square-icon-component'>
        {this.props.balanceOfPayments ? (
          <i className='fas fa-plus-square left-icon blue' />
        ) : (
          <i className='fas fa-minus-square left-icon red' />
        )}
      </span>
    )
  }
}

SquareIcon.propTypes = {
  balanceOfPayments: PropTypes.bool
}

export default SquareIcon

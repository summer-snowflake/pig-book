import React from 'react'
import PropTypes from 'prop-types'

class BalanceOfPaymentsIcons extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='balance-of-payments-icons-component'>
        <i className={'fas fa-plus-square ' + (this.props.selectedBalanceOfPayments == true ? 'blue' : 'gray')} onClick={this.props.handleClickPlusIcon} />
        <i className={'fas fa-minus-square ' + (this.props.selectedBalanceOfPayments == false ? 'red' : 'gray')} onClick={this.props.handleClickMinusIcon} />
      </div>
    )
  }
}

BalanceOfPaymentsIcons.propTypes = {
  handleClickMinusIcon: PropTypes.func.isRequired,
  handleClickPlusIcon: PropTypes.func.isRequired,
  selectedBalanceOfPayments: PropTypes.bool.isRequired,
}

export default BalanceOfPaymentsIcons

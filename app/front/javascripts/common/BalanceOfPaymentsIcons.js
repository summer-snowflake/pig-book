import React from 'react'
import PropTypes from 'prop-types'

class BalanceOfPaymentsIcons extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let balanceOfPayments = this.props.selectedBalanceOfPayments
    return (
      <div className='balance-of-payments-icons-component'>
        <i
          className={'fas fa-plus-square ' + (balanceOfPayments == true ? 'blue' : 'gray')}
          onClick={this.props.onClickPlusIcon}
        />
        <i
          className={'fas fa-minus-square ' + (balanceOfPayments == false ? 'red' : 'gray')}
          onClick={this.props.onClickMinusIcon}
        />
      </div>
    )
  }
}

BalanceOfPaymentsIcons.propTypes = {
  onClickMinusIcon: PropTypes.func.isRequired,
  onClickPlusIcon: PropTypes.func.isRequired,
  selectedBalanceOfPayments: PropTypes.bool.isRequired,
}

export default BalanceOfPaymentsIcons

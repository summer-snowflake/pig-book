import React from 'react'
import PropTypes from 'prop-types'

class BalanceOfPaymentsRadioButtons extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChangeBalanceOfPayments(e) {
    this.props.onChangeBalanceOfPayments(e.target.value)
  }

  render() {
    return (
      <span className='form-group balance-of-payments-radio-buttons-component'>
        <div className='form-check'>
          <input className='form-check-input' id='income' name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='true' />
          <label className='form-check-label' htmlFor='income'>
            {'収入'}
          </label>
        </div>
        <div className='form-check'>
          <input className='form-check-input' id='expenditure' name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='false' />
          <label className='form-check-label' htmlFor='expenditure'>
            {'支出'}
          </label>
        </div>
      </span>
    )
  }
}

BalanceOfPaymentsRadioButtons.propTypes = {
  onChangeBalanceOfPayments: PropTypes.func,
  successOrDanger: PropTypes.string,
  label: PropTypes.string
}

export default BalanceOfPaymentsRadioButtons

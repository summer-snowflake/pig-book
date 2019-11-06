import React from 'react'
import PropTypes from 'prop-types'

class BalanceOfPaymentsRadioButtons extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeBalanceOfPayments = this.handleChangeBalanceOfPayments.bind(this)
  }

  handleChangeBalanceOfPayments(e) {
    this.props.onChangeBalanceOfPayments(e)
  }

  render() {
    return (
      <span className='form-group balance-of-payments-radio-buttons-component'>
        <div className='form-check'>
          <input className='form-check-input' id={'income-' + this.props.id} name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='true' />
          <label className='form-check-label income' htmlFor={'income-' + this.props.id}>
            <span className={'badge-pill-component badge badge-pill badge-' + (this.props.value ? 'success' : 'secondary')}>
              <i className={'fas fa-check left-icon ' + (this.props.value ? '' : 'non-display')} />
              {'収入'}
            </span>
          </label>
        </div>
        <div className='form-check'>
          <input className='form-check-input' id={'expenditure-' + this.props.id} name='balance_of_payments' onChange={this.handleChangeBalanceOfPayments} type='radio' value='false' />
          <label className='form-check-label expenditure' htmlFor={'expenditure-' + this.props.id}>
            <span className={'badge-pill-component badge badge-pill badge-' + (this.props.value ? 'secondary' : 'danger')}>
              <i className={'fas fa-check left-icon ' + (this.props.value ? 'non-display' : '')} />
              {'支出'}
            </span>
          </label>
        </div>
      </span>
    )
  }
}

BalanceOfPaymentsRadioButtons.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.bool,
  onChangeBalanceOfPayments: PropTypes.func
}

export default BalanceOfPaymentsRadioButtons

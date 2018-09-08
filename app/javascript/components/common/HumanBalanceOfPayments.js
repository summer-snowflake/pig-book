import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

var bop = function(payments) {
  switch (payments) {
  case true:
    return 'income'
    break
  case false:
    return 'expenditure'
    break
  default:
    return 'balance_of_payments'
    break
  }
}

class HumanBalanceOfPayments extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>{t('label.' + bop(this.props.balanceOfPayments))}</span>
        )
      }}</I18n>
    )
  }
}

HumanBalanceOfPayments.propTypes = {
  balanceOfPayments: PropTypes.bool
}

export default HumanBalanceOfPayments

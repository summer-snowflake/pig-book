import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class MonthName extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>{t('month.' + this.props.month)}</span>
        )
      }}</I18n>
    )
  }
}

MonthName.propTypes = {
  month: PropTypes.number.isRequired
}

export default MonthName

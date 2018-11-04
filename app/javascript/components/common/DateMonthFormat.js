import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class DateMonthFormat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>
            {moment(this.props.month, 'MM').format(t('date.month_format'))}
          </span>
        )
      }}</I18n>
    )
  }
}

DateMonthFormat.propTypes = {
  month: PropTypes.number
}

export default DateMonthFormat

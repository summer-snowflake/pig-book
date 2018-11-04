import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'
import moment from 'moment'

class DateYearFormat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>
            {moment(this.props.year, 'YYYY').format(t('date.year_format'))}
          </span>
        )
      }}</I18n>
    )
  }
}

DateYearFormat.propTypes = {
  year: PropTypes.number.isRequired
}

export default DateYearFormat

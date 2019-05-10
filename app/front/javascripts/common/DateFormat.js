import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class DateFormat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>
            {this.props.targetDate.format(t('date.format'))}
            {this.props.displayLabel && t('label.records') }
          </span>
        )
      }}</I18n>
    )
  }
}

DateFormat.propTypes = {
  displayLabel: PropTypes.bool,
  targetDate: PropTypes.object.isRequired
}

export default DateFormat

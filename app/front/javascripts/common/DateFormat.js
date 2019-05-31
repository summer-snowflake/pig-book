import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class DateFormat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let date = new Date(this.props.targetDate)
    let day = '日月火水木金土'.charAt(date.getDay())
    return (
      <I18n>{(t) => {
        return (
          <span>
            {this.props.targetDate.format(t('date.format'))}
            {'(' + day + ')'}
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

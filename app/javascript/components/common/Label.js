import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'

class Label extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span>{t('label.' + this.props.label)}</span>
        )
      }}</I18n>
    )
  }
}

Label.propTypes = {
  label: PropTypes.string.isRequired
}

export default Label

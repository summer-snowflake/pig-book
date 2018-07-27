import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../../plugins/i18n'
import Button from './../../common/Button'

class MonthlyCalculateButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.props.onClickButton()
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <Button humanValueName={t('button.tally')} onClickButton={this.handleClickButton} valueName='tally' />
        )
      }}</I18n>
    )
  }
}

MonthlyCalculateButton.propTypes = {
  onClickButton: PropTypes.func.isRequired
}

export default MonthlyCalculateButton

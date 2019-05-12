import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'
import Button from './Button'

class CopyButton extends React.Component {
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
          <Button buttonType='ligth' humanValueName={t('button.copy')} onClickButton={this.handleClickButton} valueName='copy' />
        )
      }}</I18n>
    )
  }
}

CopyButton.propTypes = {
  onClickButton: PropTypes.func.isRequired
}

export default CopyButton

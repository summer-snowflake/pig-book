import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import i18n from './../plugins/i18n'
import Button from './Button'

class AddButton extends React.Component {
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
          <Button humanValueName={t('button.add')} isDisabled={this.props.isDisabled} onClickButton={this.handleClickButton} valueName='add' />
        )
      }}</I18n>
    )
  }
}

AddButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClickButton: PropTypes.func.isRequired
}

export default AddButton

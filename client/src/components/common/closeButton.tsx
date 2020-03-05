import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  onClickClose: () => void;
}

class CloseButton extends Component<Props & I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button className='close-button-component btn btn-light' onClick={this.props.onClickClose}>
        <i className='fas fa-times left-icon' />
        {t('button.close')}
      </button>
    )
  }
}

export default withTranslation()(CloseButton)

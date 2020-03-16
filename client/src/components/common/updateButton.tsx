import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  onClickButton: () => void;
}

class UpdateButton extends Component<Props & I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button className='update-button-component btn btn-primary' onClick={this.props.onClickButton}>
        {t('button.update')}
      </button>
    )
  }
}

export default withTranslation()(UpdateButton)

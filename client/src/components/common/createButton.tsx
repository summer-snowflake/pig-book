import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  onClickCreate: () => void;
}

class CreateButton extends Component<Props & I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button className='create-button-component btn btn-primary' onClick={this.props.onClickCreate}>
        {t('button.create')}
      </button>
    )
  }
}

export default withTranslation()(CreateButton)

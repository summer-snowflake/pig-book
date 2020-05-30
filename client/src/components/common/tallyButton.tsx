import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  disabled: boolean;
  onClickButton: () => void;
}

class TallyButton extends Component<Props & I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button
        className='tally-button-component btn btn-primary'
        disabled={this.props.disabled}
        onClick={this.props.onClickButton}
      >
        <i className='fas fa-sync-alt left-icon' />
        {t('button.tally')}
      </button>
    )
  }
}

export default withTranslation()(TallyButton)

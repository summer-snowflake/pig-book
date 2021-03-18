import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props extends I18nProps {
  onClickTodayButton: () => void;
}

class TodayButton extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button
        className='today-button-component btn btn-secondary btn-sm'
        onClick={this.props.onClickTodayButton}
      >
        {t('button.today')}
      </button>
    )
  }
}

export default withTranslation()(TodayButton)

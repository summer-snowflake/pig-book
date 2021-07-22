import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickTodayButton: () => void;
}

type Props = ParentProps & I18nProps

class TodayButton extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button
        className='today-button-component btn btn-secondary'
        onClick={this.props.onClickTodayButton}
      >
        {t('button.today')}
      </button>
    )
  }
}

export default withTranslation()(TodayButton)

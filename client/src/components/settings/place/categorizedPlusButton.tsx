import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

interface Props extends I18nProps {
  onClickButton: () => void;
}

class CategorizedButton extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <button className='categorized-button-component btn btn-secondary btn-sm' data-tip={t('toolTip.addCategory')} onClick={this.props.onClickButton}>
        <i className='fas fa-plus' />
        <ReactTooltip />
      </button>
    )
  }
}

export default withTranslation()(CategorizedButton)

import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

interface Props extends I18nProps {
  onClickIcon: () => void;
}

class Trash extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='trash-component icon-field float-right'>
        <span data-tip={t('toolTip.delete')} onClick={this.props.onClickIcon}>
          <i className='fas fa-trash' />
          <ReactTooltip />
        </span>
      </div>
    )
  }
}

export default withTranslation()(Trash)


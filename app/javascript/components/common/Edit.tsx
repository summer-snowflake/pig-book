import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickIcon: () => void;
  tooltipDisable?: boolean;
}

type Props = ParentProps & I18nProps

class Edit extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='edit-component'>
        <span data-tip={t('toolTip.edit')} onClick={this.props.onClickIcon}>
          <i className='fas fa-edit' />
          {!this.props.tooltipDisable && (
            <ReactTooltip />
          )}
        </span>
      </div>
    )
  }
}

export default withTranslation()(Edit)

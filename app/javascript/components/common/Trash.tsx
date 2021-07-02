import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickIcon: () => void;
  tooltipDisable?: boolean; // NOTE: 並び替え対象のDOMの場合、並び替え時のstyleが崩れる可能性があるため disable オプションを用意
}

type Props = ParentProps & I18nProps

class Trash extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='trash-component'>
        <span data-tip={t('toolTip.delete')} onClick={this.props.onClickIcon}>
          <i className='fas fa-trash' />
          {!this.props.tooltipDisable && (
            <ReactTooltip />
          )}
        </span>
      </div>
    )
  }
}

export default withTranslation()(Trash)


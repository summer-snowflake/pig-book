import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickIcon: () => void;
  tooltipDisable?: boolean; // NOTE: 並び替え対象のDOMの場合、並び替え時のstyleが崩れる可能性があるため disable オプションを用意
}

type Props = ParentProps & I18nProps

class Edit extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='edit-component'>
        <span data-tip={t('toolTip.edit')} onClick={this.props.onClickIcon}>
          <i className='fas fa-edit' />
        </span>
      </div>
    )
  }
}

export default withTranslation()(Edit)

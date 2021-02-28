import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'
import { PiggyItem } from 'types/api'

interface Props extends I18nProps {
  onClickIcon: (piggyItem: PiggyItem) => void;
  piggyItem: PiggyItem;
  tooltipDisable?: boolean;
}

class EditIcon extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickIcon = this.handleClickIcon.bind(this)
  }

  handleClickIcon(): void {
    this.props.onClickIcon(this.props.piggyItem)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='edit-component icon-field float-right'>
        <span data-tip={t('toolTip.edit')} onClick={this.handleClickIcon}>
          <i className='fas fa-edit' />
          {!this.props.tooltipDisable && (
            <ReactTooltip />
          )}
        </span>
      </div>
    )
  }
}

export default withTranslation()(EditIcon)

import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  onClickIcon: () => void;
}

type Props = I18nProps & ParentProps

class ListIcon extends Component<Props> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='list-icon-component icon-field'>
        <span data-tip={t('toolTip.list')} onClick={this.props.onClickIcon}>
          <i className='fas fa-align-justify'></i>
          <ReactTooltip />
        </span>
      </div>
    )
  }
}

export default withTranslation()(ListIcon)


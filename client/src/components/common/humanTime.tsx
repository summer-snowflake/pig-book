import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import HumanDate from 'components/common/humanDate'

interface Props {
  date: Date;
}

class HumanTime extends Component<Props & I18nProps> {
  toHumanDate(): string {
    const { t } = this.props
    const format = t('format.time')
    let dateStr = format
    dateStr = dateStr.replace(/HH/, String(this.props.date.getHours()))
    dateStr = dateStr.replace(/MI/, String(this.props.date.getMinutes()))
    dateStr = dateStr.replace(/SS/, String(this.props.date.getSeconds()))
    return dateStr
  }

  render(): JSX.Element {
    return (
      <span className='human-time-component'>
        <HumanDate date={this.props.date} />
        {this.toHumanDate()}
      </span>
    )
  }
}

export default withTranslation()(HumanTime)

import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  date: Date;
}

class HumanDate extends Component<Props & I18nProps> {
  toHumanDate() {
    const { t } = this.props
    const format = t('format.date')
    let dateStr = format
    dateStr = dateStr.replace(/YYYY/, String(this.props.date.getFullYear()))
    dateStr = dateStr.replace(/MM/, String(this.props.date.getMonth() + 1))
    dateStr = dateStr.replace(/DD/, String(this.props.date.getDate()))
    dateStr = dateStr.replace(/W/, t('format.week.' + String(this.props.date.getDay())))
    return dateStr
  }

  render(): JSX.Element {
    return (
      <span className='human-date-component'>
        {this.toHumanDate()}
      </span>
    )
  }
}

export default withTranslation()(HumanDate)

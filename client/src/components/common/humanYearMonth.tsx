import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface Props {
  year: number;
  month: number;
}

class HumanYearMonth extends Component<Props & I18nProps> {
  toHumanDate(): string {
    const { t } = this.props
    let yearStr = ''
    if (this.props.year) {
      const yearFormat = t('format.year')
      yearStr = yearFormat
      yearStr = yearStr.replace(/YYYY/, String(this.props.year))
    }
    let monthStr = ''
    if (this.props.month) {
      const monthFormat = t('format.month')
      monthStr = monthFormat
      monthStr = monthStr.replace(/MM/, String(this.props.month))
    }
    return yearStr + monthStr
  }

  render(): JSX.Element {
    return (
      <span className='human-month-component'>
        {this.toHumanDate()}
      </span>
    )
  }
}

export default withTranslation()(HumanYearMonth)

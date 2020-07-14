import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

interface Props {
  date: Date;
}

class fromNow extends Component<Props & I18nProps> {
  render(): JSX.Element {
    dayjs.locale('ja')
    dayjs.extend(relativeTime)

    return (
      <span className='from-now-component'>
        {dayjs(new Date(this.props.date)).fromNow()}
      </span>
    )
  }
}

export default withTranslation()(fromNow)

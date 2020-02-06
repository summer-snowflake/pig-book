import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'

import i18n from './../../plugins/i18n'

class TallyTimeLabel extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <I18n>{(t) => {
        return (
          <span className='last-tally-at'>
            <i className='far fa-clock left-icon' />
            {this.props.lastTallyAt && this.props.lastTallyAt.format(t('time.format'))}
          </span>
        )
      }}</I18n>
    )
  }
}

TallyTimeLabel.propTypes = {
  lastTallyAt: PropTypes.object
}

export default TallyTimeLabel

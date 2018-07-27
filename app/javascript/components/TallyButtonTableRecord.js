import React from 'react'
import PropTypes from 'prop-types'

import TallyButton from './admin/users/TallyButton'
import TallyTimeLabel from './admin/users/TallyTimeLabel'
import ErrorBoundary from './common/ErrorBoundary'

class TallyButtonTableRecord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lastTallyAt: undefined
    }
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    console.log('click')
  }

  render() {
    return (
      <div className='monthly-calculate-table-record-component'>
        <ErrorBoundary>
          <span>
            <TallyButton onClickButton={this.handleClickButton} />
            <TallyTimeLabel lastTallyAt={this.state.lastTallyAt} />
          </span>
        </ErrorBoundary>
      </div>
    )
  }
}

TallyButtonTableRecord.propTypes = {
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default TallyButtonTableRecord

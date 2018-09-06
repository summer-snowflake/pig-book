import React from 'react'
import PropTypes from 'prop-types'

import ImportHistory from './ImportHistory'

class ImportHistories extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='import-histories-component'>
        <table className='table'>
          <tbody>
            {this.props.histories.map((history) =>
              <ImportHistory getImportHistories={this.props.getImportHistories} history={history} key={history.id} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

ImportHistories.propTypes = {
  last_request_at: PropTypes.number.isRequired,
  user_token: PropTypes.string.isRequired,
  histories: PropTypes.array.isRequired,
  getImportHistories: PropTypes.func.isRequired
}

export default ImportHistories

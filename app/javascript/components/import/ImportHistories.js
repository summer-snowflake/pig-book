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
              <ImportHistory getImportHistories={this.props.getImportHistories} history={history} key={history.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

ImportHistories.propTypes = {
  histories: PropTypes.array.isRequired,
  getImportHistories: PropTypes.func.isRequired
}

export default ImportHistories

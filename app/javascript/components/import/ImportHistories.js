import React from 'react'
import PropTypes from 'prop-types'

import ImportHistory from './ImportHistory'

class ImportHistories extends React.Component {
  constructor(props) {
    super(props)
    this.getImportHistoriesWithStatus = this.getImportHistoriesWithStatus.bind(this)
  }

  getImportHistoriesWithStatus(activeLink) {
    this.props.getImportHistoriesWithStatus(activeLink)
  }

  render() {
    return (
      <div className='import-histories-component'>
        <table className='table'>
          <tbody>
            {this.props.histories.map((history) => (
              <ImportHistory
                activeLink={this.props.activeLink}
                getImportHistories={this.props.getImportHistories}
                getImportHistoriesWithStatus={this.getImportHistoriesWithStatus}
                history={history}
                isLoading={this.props.isLoading}
                key={history.id}
                onLoad={this.props.onLoad}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

ImportHistories.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activeLink: PropTypes.string.isRequired,
  histories: PropTypes.array.isRequired,
  getImportHistories: PropTypes.func.isRequired,
  getImportHistoriesWithStatus: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
}

export default ImportHistories

import React from 'react'
import PropTypes from 'prop-types'

import DateYearFormat from './../common/DateYearFormat'

class SearchKeywords extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='records-tag-component'>
        <span className='search-keyword-button'>
          <DateYearFormat year={this.props.name} />
        </span>
      </span>
    )
  }
}

SearchKeywords.propTypes = {
  name: PropTypes.number.isRequired
}

export default SearchKeywords

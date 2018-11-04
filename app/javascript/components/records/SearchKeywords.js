import React from 'react'
import PropTypes from 'prop-types'

import DateYearFormat from './../common/DateYearFormat'
import DateMonthFormat from './../common/DateMonthFormat'

class SearchKeywords extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='records-tag-component'>
        <span className='search-keyword-button'>
          <DateYearFormat year={this.props.year} />
        </span>
        <span className='search-keyword-button'>
          <DateMonthFormat month={this.props.month} />
        </span>
      </span>
    )
  }
}

SearchKeywords.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number
}

export default SearchKeywords

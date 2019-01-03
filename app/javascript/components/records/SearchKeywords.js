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
      <span className='search-keywords-component'>
        <span className='search-keyword-button'>
          <DateYearFormat year={this.props.year} />
        </span>
        {this.props.month && (
          <span className='search-keyword-button'>
            <DateMonthFormat month={this.props.month} />
            <i className='fas fa-times right-icon' onClick={this.props.handleClickMonthTagButton} />
          </span>
        )}
      </span>
    )
  }
}

SearchKeywords.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number,
  handleClickMonthTagButton: PropTypes.func.isRequired
}

export default SearchKeywords

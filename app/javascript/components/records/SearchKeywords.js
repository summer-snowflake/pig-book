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
        {(this.props.month || this.props.month != 0) && (
          <span className='search-keyword-button'>
            <DateMonthFormat month={this.props.month} />
            <i className='fas fa-times right-icon' onClick={this.props.handleClickMonthTagButton} />
          </span>
        )}
        {(this.props.categoryName.length > 0) && (
          <span className='search-keyword-button'>
            <i className='fas fa-th-large left-icon yellow' />
            {this.props.categoryName}
            <i className='fas fa-times right-icon' onClick={this.props.handleClickCategoryTagButton} />
          </span>
        )}
        {(this.props.breakdownName.length > 0) && (
          <span className='search-keyword-button'>
            <i className='fas fa-list left-icon light-blue' />
            {this.props.breakdownName}
            <i className='fas fa-times right-icon' onClick={this.props.handleClickBreakdownTagButton} />
          </span>
        )}
      </span>
    )
  }
}

SearchKeywords.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number,
  categoryName: PropTypes.string,
  breakdownName: PropTypes.string,
  handleClickMonthTagButton: PropTypes.func.isRequired,
  handleClickCategoryTagButton: PropTypes.func.isRequired,
  handleClickBreakdownTagButton: PropTypes.func.isRequired
}

export default SearchKeywords

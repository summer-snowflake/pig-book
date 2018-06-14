import React from 'react'
import PropTypes from 'prop-types'
import CategoryCardBody from './categories/CategoryCardBody'
import ErrorBoundary from './common/ErrorBoundary'

class CategoryCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='category-card-component'>
        <ErrorBoundary>
          <CategoryCardBody categories={this.props.categories} last_request_at={this.props.last_request_at} user_token={this.props.user_token} />
        </ErrorBoundary>
      </div>
    )
  }
}

CategoryCard.propTypes = {
  categories: PropTypes.array.isRequired,
  user_token: PropTypes.string.isRequired,
  last_request_at: PropTypes.number.isRequired
}

export default CategoryCard

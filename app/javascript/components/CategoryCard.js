import React from 'react'
import PropTypes from 'prop-types'
import reactMixin from 'react-mixin'

import CategoryCardBody from './categories/CategoryCardBody'
import ErrorBoundary from './common/ErrorBoundary'
import LocalStorageMixin from './mixins/LocalStorageMixin'

class CategoryCard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.saveAuthenticationData(this.props.last_request_at, this.props.user_token)
  }

  render() {
    return (
      <div className='category-card-component'>
        <ErrorBoundary>
          <CategoryCardBody categories={this.props.categories} />
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

reactMixin.onClass(CategoryCard, LocalStorageMixin)

export default CategoryCard

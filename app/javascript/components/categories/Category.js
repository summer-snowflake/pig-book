import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(category) {
    this.props.onClickTrashIcon(category)
  }

  render() {
    return (
      <tr className='category-component' id={'category-' + this.props.category.id}>
        <td>
          <span className={'badge badge-pill badge-' + this.props.category.success_or_danger_style_class}>
            {this.props.category.human_balance_of_payments}
          </span>
        </td>
        <td>
          {this.props.category.name}
        </td>
        <td>
          <span className={'badge badge-info'}>
            <span>
              <i className='fas fa-list left-icon' />
              {(this.props.category.breakdowns || {}).length}
            </span>
          </span>
        </td>
        <td>
          <i className='fas fa-map-marker-alt left-icon' />
          {(this.props.category.places || {}).length}
        </td>
        <td>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.category} />
        </td>
      </tr>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired
}

export default Category

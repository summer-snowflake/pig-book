import React, { Component } from 'react'

import { Category } from 'types/api'

import 'stylesheets/dashboard.sass'

interface ParentProps {
  category: Category;
  activeCategoryId: number | null;
  onClickCategory: (category: Category) => void;
}

type Props = ParentProps

class CategoryTab extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleClickCategory = this.handleClickCategory.bind(this)
  }

  handleClickCategory(): void {
    this.props.onClickCategory(this.props.category)
  }

  render(): JSX.Element {
    return (
      <li className='category-tab-component nav-item' onClick={this.handleClickCategory}>
        <span className={'nav-link' + (this.props.activeCategoryId === this.props.category.id ? ' active' : '')}>
          {this.props.category.name}
        </span>
      </li>
    )
  }
}

export default CategoryTab

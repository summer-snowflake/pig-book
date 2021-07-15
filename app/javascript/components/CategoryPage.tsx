import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import CategoryCard from 'components/settings/category/CategoryCard'

class CategoryPage extends Component {
  render(): JSX.Element {
    return (
      <div className='category-page-component center-container'>
        <div className='row'>
          <div className='col-3'>
            <SettingsMenu />
          </div>
          <div className='col'>
            <CategoryCard />
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPage

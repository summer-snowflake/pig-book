import React, { Component } from 'react'
import MonthlyCategoryBarChart from './monthlyCategoryBarChart'
import { Breakdown, Category } from 'types/api'

interface ParentProps {
  monthlyTotal: any[];
  category: Category | undefined;
  breakdowns: Breakdown[];
}

type Props = ParentProps

class CategoryDashboardContainer extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='category-dashboard-component'>
        {this.props.category && (
          <MonthlyCategoryBarChart
            breakdowns={this.props.breakdowns}
            category={this.props.category}
            monthlyTotal={this.props.monthlyTotal}
          />
        )}
      </div>
    )
  }
}

export default CategoryDashboardContainer

import React, { Component } from 'react'
import MonthlyCategoryBarChart from './monthlyCategoryBarChart'
import { WithRelationsCategory } from 'types/api'

interface ParentProps {
  monthlyTotal: any[];
  category: WithRelationsCategory;
}

type Props = ParentProps

class CategoryDashboardContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

  }

  render(): JSX.Element {
    return (
      <div className='category-dashboard-component'>
        <MonthlyCategoryBarChart monthlyTotal={this.props.monthlyTotal} category={this.props.category} />
      </div>
    )
  }
}

export default CategoryDashboardContainer

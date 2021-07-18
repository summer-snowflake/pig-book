import React, { Component } from 'react'
import { AdminUser } from 'types/api'

interface Props {
  user: AdminUser;
}

class UserItem extends Component<Props> {
  render(): JSX.Element {
    return (
      <tr className='user-item-component'>
        <td className='icon-label-field'>
          {this.props.user.admin && (
            <i className='fas fa-crown red' />
          )}
        </td>
        <td className='icon-label-field'>
          {this.props.user.active ? (
            <i className='fas fa-user green' />
          ) : (
            <i className='far fa-user green' />
          )}
        </td>
        <td>
          <i className='far fa-envelope left-icon' />
          {this.props.user.email}
        </td>
        <td>
          <span>
            {this.props.user.daily_option && (
              <i className='fas fa-chart-line right-icon' />
            )}
          </span>
          <span>
            {this.props.user.unlimited_option && (
              <i className='fas fa-infinity right-icon' />
            )}
          </span>
          <span>
            {this.props.user.piggy_bank_option && (
              <i className='fas fa-piggy-bank right-icon' />
            )}
          </span>
       </td>
        <td>
          <span className='total-count'>
            <i className='fas fa-th-large left-icon yellow' />
            {this.props.user.categories_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-list left-icon light-blue' />
            {this.props.user.breakdowns_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-map-marker-alt left-icon blue' />
            {this.props.user.places_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-sitemap left-icon pink' />
            {this.props.user.records_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-bookmark left-icon green' />
            {this.props.user.tags_count}
          </span>
        </td>
        <td>
          {this.props.user.created_at && (
            <span>
              {this.props.user.human_created_on}
            </span>
          )}
        </td>
        <td>
          {this.props.user.current_sign_in_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              {this.props.user.human_current_sign_in_at}
            </span>
          )}
        </td>
        <td>
          {this.props.user.updated_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              {this.props.user.human_updated_at}
            </span>
          )}
        </td>
      </tr>
    )
  }
}

export default UserItem

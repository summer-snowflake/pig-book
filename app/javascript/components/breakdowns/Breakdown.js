import React from 'react'
import PropTypes from 'prop-types'
import Trash from './../common/Trash'

class Breakdown extends React.Component {
  constructor(props) {
    super(props)
    this.onClickTrashIcon = this.onClickTrashIcon.bind(this)
  }

  onClickTrashIcon(breakdown) {
    this.props.onClickTrashIcon(breakdown)
  }

  render() {
    return (
      <tr className='breakdown-component' id={'breakdown-' + this.props.breakdown.id}>
        <td>
          {this.props.breakdown.category_name}
        </td>
        <td>
          {this.props.breakdown.name}
        </td>
        <td className='icon-td'>
          <Trash handleClick={this.onClickTrashIcon} item={this.props.breakdown} />
        </td>
      </tr>
    )
  }
}

Breakdown.propTypes = {
  breakdown: PropTypes.object.isRequired,
  onClickTrashIcon: PropTypes.func.isRequired
}

export default Breakdown

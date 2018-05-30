class CategoryComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickTrashIcon(category) {
    this.props.handleClickTrashIcon(category)
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
          <TrashComponent handleClick={this.handleClickTrashIcon} item={this.props.category} />
        </td>
      </tr>
    )
  }
}

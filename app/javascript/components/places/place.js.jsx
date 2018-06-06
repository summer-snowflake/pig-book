class PlaceComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickTrashIcon(place) {
    this.props.onClickTrashIcon(place)
  }

  render() {
    return (
      <tr className='place-component' id={'place-' + this.props.place.id}>
        <td>
          {this.props.place.name}
        </td>
        <td>
          <TrashComponent item={this.props.place} onClick={this.handleClickTrashIcon} />
        </td>
      </tr>
    )
  }
}

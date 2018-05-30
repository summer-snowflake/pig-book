class PlacesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: {
        id: null
      }
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickTrashIcon(place) {
    this.setState({
      place: place
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className='places-component'>
        <table className='table'>
          <tbody>
            {this.props.places.map((place) =>
              <PlaceComponent place={place} key={place.id} onClickTrashIcon={this.handleClickTrashIcon} />
            )}
          </tbody>
        </table>
        <ModalComponent item={this.state.place} url={'places/' + this.state.place.id} />
      </div>
    )
  }
}

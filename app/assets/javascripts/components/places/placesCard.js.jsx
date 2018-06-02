class PlacesCardComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 'DD',
      places: [],
      place: {
        id: null
      }
    }
    this.getPlaces = this.getPlaces.bind(this)
  }

  componentWillMount() {
    console.log('aaa')
    console.log(this.props.places)
    this.getPlaces()
  }

  getPlaces() {
    //axios.get('/api/places')
    //  .then(function (response) {
    //    console.log(response);
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });

    //this.setState({a: 'AAA'})
    //$.ajax({
    //  type: 'GET',
    //  url: '/api/places',
    //  success(data) {
    //  },
    //  error(XMLHttpRequest, textStatus, errorThrown) {
    //    console.log('error!')
    //  }
    //})
    //fetch('api/places')
    //  .then((res) => res.json())
    //  .then((res) => {
    //    this.setState({places: res})
    //  })
    //  .catch((error) => {
    //    console.log(error)
    //    //console.error(error)
    //  })
  }

  render() {
    return (
      <div className='places-card-component'>
        <PlacesComponent places={this.props.places} />
      </div>
    )
  }
}

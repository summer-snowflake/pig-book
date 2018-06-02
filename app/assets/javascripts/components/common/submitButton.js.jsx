class SubmitButtonComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span className='submit-button-component'>
        <a data-method='delete' href={this.props.url}>
          <button className='btn btn-secondary' data-dismiss='modal' id='submit'>
            <i className='far fa-trash-alt left-icon' />
            {'はい'}
          </button>
        </a>
      </span>
    )
  }
}

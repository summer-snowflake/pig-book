class CategoriesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        id: null
      }
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
  }

  handleClickTrashIcon(category) {
    this.setState({
      category: category
    })
  }

  render() {
    return (
      <div className='categories-component'>
        <table className='table'>
          <tbody>
            {this.props.categories.map((category) =>
              <CategoryComponent category={category} key={category.id} onClickTrashIcon={this.handleClickTrashIcon} />
            )}
          </tbody>
        </table>
        <ModalComponent item={this.state.category} url={'categories/' + this.state.category.id} />
      </div>
    )
  }
}

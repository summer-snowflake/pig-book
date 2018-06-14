export default {
  fieldWithErrors(column) {
    return (column in this.props.errorMessages) ? 'field-with-errors' : ''
  }
}

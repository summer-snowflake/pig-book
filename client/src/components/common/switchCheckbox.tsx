import React, { Component } from 'react'

interface Props {
  onChangeCheck: (id: number) => void;
  id: number;
  value: boolean;
}

class switchCheckbox extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangeCheck = this.handleChangeCheck.bind(this)
  }

  handleChangeCheck(): void {
    this.props.onChangeCheck(this.props.id)
  }

  render(): JSX.Element {
    return (
      <div className='switch-checkbox-component' onClick={this.handleChangeCheck}>
        <input className='switch-checkbox' checked={this.props.value} disabled={true} type='checkbox' id={'switch-' + this.props.id} />
        <label className='switch-label' htmlFor={'switch-' + this.props.id}>
          <span />
        </label>
        <div className='switch-ball' />
      </div>
    )
  }
}

export default switchCheckbox

import React, { Component } from 'react'

interface Props {
  onChangeCheck: () => void;
  id: number;
}

class switchCheckbox extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='switch-checkbox-component'>
        <input className='switch-checkbox' type='checkbox' id={'switch-' + this.props.id} />
        <label className='switch-label' htmlFor={'switch-' + this.props.id}>
          <span />
        </label>
        <div className='switch-ball' />
      </div>
    )
  }
}

export default switchCheckbox

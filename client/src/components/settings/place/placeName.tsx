import React, { Component } from 'react'

interface Props {
  place: {
    name: string;
  };
}

class PlaceName extends Component<Props> {
  render(): JSX.Element {
    return (
      <span className='place-name-component'>
        {this.props.place.name}
      </span>
    )
  }
}

export default PlaceName

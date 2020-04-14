import React, { Component } from 'react'

interface Props {
  messages: string[];
}

class Messages extends Component<Props> {
  render(): JSX.Element {
    return (
      <div className='messages-component'>
        {this.props.messages.map((message, index) => (
          <span className='form-text darken-green' key={index}>
            {message}
          </span>
        ))}
      </div>
    )
  }
}

export default Messages

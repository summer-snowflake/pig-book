import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'

import { MessagesStore } from 'types/store'
import { RootState } from 'reducers/rootReducer'
import { clearMessages } from 'actions/errorsActions'

interface StateProps {
  messagesStore: MessagesStore;
}

interface DispatchProps {
  clearMessages: () => void;
}

type Props = StateProps & DispatchProps

class Notification extends Component<Props> {
  render(): JSX.Element {
    const notice = String(this.props.messagesStore.status).slice(0, 1) === '2'

    return (
      <div className='notification-component row flex-end'>
        {this.props.messagesStore.messages.length > 0 && (
          <div className={'notification-field ' + (notice ? 'notice' : 'alert')}>
            <span>
              <i className='fas fa-exclamation-circle left-icon' />
              {this.props.messagesStore.messages.map((message, index) => (
                <span key={index}>{message}</span>
              ))}
            </span>
          </div>
        )}
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    messagesStore: state.messages
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    clearMessages(): void {
      dispatch(clearMessages())
    }
  }
}

export default connect(mapState, mapDispatch)(Notification)

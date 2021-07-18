import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

interface ParentProps {
  children: React.ReactNode;
  value: string;
}

interface State {
  hover: boolean;
}

type Props = ParentProps & I18nProps

class Tooltip extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hover: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(): void {
    this.setState({
      hover: true
    })
  }

  handleMouseLeave(): void {
    this.setState({
      hover: false
    })
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <span className='tooltip-component' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {this.state.hover && (
          <span className='tooltip'>{this.props.value}</span>
        )}
        {this.props.children}
      </span>
    )
  }
}

export default withTranslation()(Tooltip)

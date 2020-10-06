import React, { Component } from 'react'

import TallyButton from 'components/common/tallyButton'

interface State {
  year: number;
}

interface Props {
  disabled: boolean;
  onClickTallyButton: (year: number) => void;
}

class OtherTallyField extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const today = new Date()
    this.state = {
      year: today.getFullYear() - 1
    }

    this.handleClickTallyButton = this.handleClickTallyButton.bind(this)
    this.handleChangeYear = this.handleChangeYear.bind(this)
  }

  handleClickTallyButton(): void {
    this.props.onClickTallyButton(Number(this.state.year))
  }

  handleChangeYear(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({
      year: Number(e.target.value)
    })
  }

  render(): JSX.Element {
    const today = new Date()
    const oldYear = 2004

    return (
      <div className='other-tally-field-component'>
        <select
          className='form-control years-select'
          onChange={this.handleChangeYear}
          value={this.state.year}
        >
          {Array.from(new Array(today.getFullYear() - oldYear)).map((v,i)=> i + oldYear).reverse().map((y) =>(
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <TallyButton disabled={this.props.disabled} onClickButton={this.handleClickTallyButton} year={this.state.year} />
      </div>
    )
  }
}

export default OtherTallyField

import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { Place } from 'types/api'

interface Props extends I18nProps {
  places: Place[];
  isLoading: boolean;
  defaultPlaceId: number | undefined;
  onChangePlace: (placeId: number) => void;
}

class PlaceSelectBox extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.handleChangePlace = this.handleChangePlace.bind(this)
  }

  handleChangePlace(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.props.onChangePlace(Number(e.target.value))
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <select
        className='place-select-box-component select-form-control'
        disabled={this.props.isLoading || this.props.places.length === 0}
        name='places-list'
        onChange={this.handleChangePlace}
        value={this.props.defaultPlaceId || ''}>
        <option>{'- ' + t('menu.place') + ' -'}</option>
        {this.props.places
          .map((place: Place) => (
            <option key={place.id} value={place.id}>{place.name}</option>
          ))}
      </select>
    )
  }
}

export default withTranslation()(PlaceSelectBox)

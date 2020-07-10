import React, { Component} from 'react'
import { Carousel } from 'react-responsive-carousel'
import { withTranslation } from 'react-i18next'

import slideImage01 from 'images/slide01.png'
import slideImage02 from 'images/slide02.png'

import 'stylesheets/carousel.min.css'
import 'stylesheets/top.sass'

type Props = I18nProps

class TopCarousel extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='top-carousel-component'>
        <Carousel autoPlay={true} showArrows={true} showThumbs={false} infiniteLoop={true}>
          <div className='carousel-image'>
            <img alt='slide-01' src={slideImage01} />
            <p className='legend'>
              <span className='legend-title'>{t('menu.input')}</span>
              <span className='legend-text'>{t('slide.input')}</span>
            </p>
          </div>
          <div className='carousel-image'>
            <img alt='slide-02' src={slideImage02} />
            <p className='legend'>
              <span className='legend-title'>{t('menu.dashboard')}</span>
              <span className='legend-text'>{t('slide.dashboard')}</span>
            </p>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default withTranslation()(TopCarousel)

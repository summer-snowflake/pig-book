import React, { Component} from 'react'
import { Carousel } from 'react-responsive-carousel'

import slideImage01 from 'images/slide01.png'
import slideImage02 from 'images/slide02.png'

import 'stylesheets/carousel.min.css'
import 'stylesheets/top.sass'

class TopCarousel extends Component {
  render(): JSX.Element {
    return (
      <div className='top-carousel-component'>
        <Carousel autoPlay={true} showArrows={true} showThumbs={false} infiniteLoop={true}>
          <div className='carousel-image'>
            <img alt='slide-01' src={slideImage01} />
          </div>
          <div className='carousel-image'>
            <img alt='slide-02' src={slideImage02} />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default TopCarousel

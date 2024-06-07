import React from 'react'
import { default as ReactSlickSlider } from 'react-slick'
export const NextArrow = ({ currentSlide, slideCount, style, ...props }) => {
  return <div {...props} />
}

export const PrevArrow = ({ currentSlide, slideCount, style, ...props }) => {
  return <div {...props} />
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
}

const Carousal = ({ setting, children, ...props }) => {
  return (
    <ReactSlickSlider {...setting} {...props}>
      {children}
    </ReactSlickSlider>
  )
}

export default Carousal

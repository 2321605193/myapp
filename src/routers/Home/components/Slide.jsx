import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './Slide.css';

const PosterSlide = ({data}) => {
  const settings = {
    dots: true, //是否要点
    autoplay: true, //自动播放
    className: 'posterSlide', //类
    dotsClass: 'posterSlide__dots'
  };

  return (

    <Slider {...settings}>
      {
        data.map(item=>(
          <div key={item.image}>
            <img  className='posterSlide__img' src={item.image} alt=""/>
          </div>
        ))
      }
    </Slider>
  );
};

PosterSlide.propTypes={
  data:PropTypes.array.isRequired,
};

export default PosterSlide;

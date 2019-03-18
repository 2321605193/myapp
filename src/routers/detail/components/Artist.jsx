import React from 'react';
import PropTypes from 'prop-types';
import "./Artist.css";
/**
**@desc: 详情页演职员表
**@date:  2019.2.24
**@author: JunNa
*/

const Artist = ({data})=> {
  return (
    <div className="mArtist">
      <ul className="mArtist__list">
        {
          data.map(item =>(
            <li className="" key={item.name}>
              <a href="#" className="artistInfo">
                <div className="artistInfo__image" style={{background:`url(${item.image}) 50% /contain no-repeat`}}/>
                <div>
                  <dl className="artistInfo__name">{item.name}</dl>
                  {/*dl 定义某一个东西 与dd配套使用*/}
                  <dd className="artistInfo__job">{item.job}</dd>
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

Artist.propTypes = {
  data:PropTypes.array.isRequired,
};

export default Artist;

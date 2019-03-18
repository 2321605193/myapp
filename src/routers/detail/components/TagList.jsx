import React from 'react';
import PropTypes from 'prop-types';
import './TagList.css';

const TagList = ({data,current,onClick}) => {
  const onClickTag=(value)=>{
    if(value !==current){
      onClick(value);
    }
  };
  return (
    <div  className="tagList">
      {
        data.map(tag =>(
          <span
            key={tag.text}
            className={`tagList__item ${current===tag.text && 'tagList__item--active'}`}
            onClick={()=>onClickTag(tag.text)}
          >
            {tag.text}{tag.count}
          </span>)
        )}
    </div>

  );
};

TagList.propTypes = {
  data:PropTypes.array.isRequired,
  current:PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TagList;

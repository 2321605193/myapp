import React from 'react';
import "./BaseInfo.css";
import PropTypes from 'prop-types';

const BaseInfo = ({onShowImage}) => {
  return (
    <div className='baseInfo'>
      <div className="baseInfo__detail">
        <h3 className="baseInfo__name">唐人街探案2</h3>
        <div className="baseInfo__subTitle">Detective Chinatown 2</div>
        <div className="baseInfo__other">喜剧 / 动作 / 剧情</div>
        <div className="baseInfo__other">中国大陆 120分钟</div>
        <div className="baseInfo__other">2018年2月大陆上映</div>
      </div>
      <div className="baseInfo__poster" style={{backgroundImage:"url(/source/movie/asset4.jpeg)"}} onClick={onShowImage} />
    </div>
  );
};

BaseInfo.propTypes = {
  onShowImage:PropTypes.func.isRequired
}
export default BaseInfo;

import React from 'react';
import PropTypes from 'prop-types';
import './ScoreDistribute.css';
import Star from "../../../components/Star";

const ScoreDistribute = props => {
  return (
    <div className="scoreDistribute">
     <div className="score">
       <div className="score__value">9.3</div>
       <div className="score__desc">10000人评论</div>
     </div>
      <div className="distribute">
        <div>
          <div className="distribute__Item">
            <Star  value={10} size={8}/>
            <div className="distribute__btm">
              <div className="distribute__top" style={{width:'90%'}}/>
            </div>
          </div>
          <div className="distribute__Item">
            <Star  value={8}  size={8}/>
            <div className="distribute__btm">
              <div className="distribute__top" style={{width:'30%'}}/>
            </div>
          </div>
          <div className="distribute__Item">
            <Star  value={6}  size={8}/>
            <div className="distribute__btm">
              <div className="distribute__top" style={{width:'20%'}}/>
            </div>
          </div>
          <div className="distribute__Item">
            <Star  value={4}  size={8}/>
            <div className="distribute__btm">
              <div className="distribute__top" style={{width:'10%'}}/>
            </div>
          </div>
          <div className="distribute__Item">
            <Star  value={2}  size={8}/>
            <div className="distribute__btm">
              <div className="distribute__top" style={{width:'10%'}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ScoreDistribute.propTypes = {
  
};

export default ScoreDistribute;

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { removeSeat } from '../actions';

import './SeatSelected.css';

const SeatSelected = ({data,onRemove }) => {
  if(!data.length){
    return null;
  }
  return (
    <div className='seatSelected'>
      <ul className="seatSelected__list">
        {
          data.map(seat =>(
            <li key={seat.id} className="seatSelected__item movieTicket">
              <div className="movieTicket__detail">
                <div className='movieTicket__position'>{seat.rowIndex}排{seat.colIndex}座</div>
                <div className='movieTicket__price'><i className='movieTicket__tag'>卡</i>33元</div>
              </div>
              <div className="movieTicket__close" onClick={() => onRemove(seat.id)}></div>
            </li>
          ))
        }

      </ul>

      <div className="seatSelected__buy">{33 *data.length}  确认选座</div>

    </div>
  );
};

SeatSelected.propTypes = {
  data:PropTypes.array.isRequired,
  onRemove:PropTypes.func.isRequired
};

const mapStateToProps =state =>{
  return{
    data:state
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    onRemove:id =>{
      dispatch(removeSeat(id));
    },

  };
};




export default connect( mapStateToProps,mapDispatchToProps)(SeatSelected);

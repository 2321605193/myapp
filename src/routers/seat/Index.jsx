import React, {Component} from 'react';
import PropTypes from 'prop-types';

//引入redux
import {Provider} from 'react-redux';
import { createStore } from 'redux';

import seatSelect from './reducers';


import './Index.css';
import MovieInfo from './compontents/MovieInfo';
import SeatSelected from './compontents/SeatSelected';
import SeatSelector from './container/SeatSelector';


//第一步创建store
let store = createStore(seatSelect);


class Seat extends Component {

  //注释部分使用react实现数据交互
  // state = {
  //   selectSeat:[]
  // }

  // addSeat = (seat) => {
  //   this.setState(prevState =>(
  //     {
  //       selectSeat: [...prevState.selectSeat, seat]
  //     }));
  // }
  //
  // removeSeat = (id) =>{
  //   this.setState({
  //     selectSeat: this.state.selectSeat.filter(seat => seat.id !== id)
  //   });
  // }


  render() {


    //const {selectSeat} = this.state;


    return (
      <Provider store={store}> {/*挂载store*/}

        <div className='seat'>
          <div className="tOperator">
            <i className='tOperator__icon tOperator__icon--blackBack' onClick={()=>{window.history.back();}}/>
            万达影院
            <i className='tOperator__icon tOperator__icon--blackShare'/>
          </div>

          <MovieInfo />
          <div className="seat__main">
            <div className="seat__tip" />
            <div className="seat__graph">
              <div className="seat__screen">
                B13银幕
              </div>
              <div className="seat__map">
                <SeatSelector /*selectSeat={selectSeat} onAdd={this.addSeat} onRemove={this.removeSeat}*//>
              </div>

            </div>



          </div>
          <SeatSelected /*data={selectSeat} onRemove={this.removeSeat}*/ />

        </div>
      </Provider>

    );
  }
}

Seat.propTypes = {};

export default Seat;

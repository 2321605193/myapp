import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {data} from '../mock/seat';

import { connect } from "react-redux";
import { addSeat,removeSeat } from "../actions";
//设置座位大小
const SEAT_WIDTH = 50;
const SEAT_HEIGHT = 50;

//canvas优化
const ratio = window.devicePixelRatio;
const DRAW_SEAT_WIDTH = SEAT_WIDTH * ratio;
const DRAW_SEAT_HEIGHT = SEAT_HEIGHT * ratio;

//默认canvas只有宽300 高150
const lastSeat = data[data.length - 1];
const CANVAS_WIDTH=lastSeat.colIndex * SEAT_WIDTH;
const CANVAS_HEIGHT=lastSeat.rowIndex * SEAT_WIDTH;

const DRAW_CANVAS_WIDTH = CANVAS_WIDTH * ratio;
const DRAW_CANVAS_HEIGHT = CANVAS_HEIGHT * ratio;
// let col = 1;
// let row = 1;
// const CANVAS_WIDTH = data.forEach(seat =>{
//   if(seat.rowIndex >  row){
//     row = seat.rowIndex;
//   }
//   if(seat.colIndex >  col){
//     col = seat.colIndex;
//   }
// });

class SeatSelector extends Component {

componentDidMount() {
  //初始化canvas
  this.ctx = this.refs.canvas.getContext('2d');
  this.ctx.font = `${10 * ratio}px Arial`;//设置canvas字体
  this.ctx.fillStyle = '#fff';
  this.ctx.textAlign = 'center';


  //加载所需要的图片

  const  emptyImage = new Image();
  const  selectImage = new Image();
  const  soldImage = new Image();
  let count = 0;

  const loadCallback = () =>{//设置图片加载完再执行
    count++;
    if(count === 3){
      this.emptyImage=emptyImage;
      this.selectImage=selectImage;
      this.soldImage=soldImage;
      this.drawAllSeat();

      this.drawSelectSeat();//已选择座位
    }

  };

  emptyImage.onload = loadCallback;
  selectImage.onload = loadCallback;
  soldImage.onload = loadCallback;

  emptyImage.src = './source/seat-empty.png';
  selectImage.src = './source/seat-selected.png';
  soldImage.src = './source/seat-sold.png';

}

drawAllSeat = () =>{
  const seatData = data;
  for(let i=0; i< seatData.length; i++){
    const {isSold,xPos,yPos} = seatData[i];
    const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH;
    const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT;

    if(isSold){
      //绘制已售样式
      //参数介绍         图片           x坐标      y坐标     图片宽      图片高
      this.ctx.drawImage(this.soldImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT);

    }
    else{
      //绘制空座样式
      this.ctx.drawImage(this.emptyImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT);
    }

  }
}

drawSelectSeat = () =>{
  const {selectSeat}= this.props;

  for(let i=0; i< selectSeat.length; i++){
    const {xPos,yPos,rowIndex,colIndex} = selectSeat[i];
    const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH;
    const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT;
    this.ctx.drawImage(this.selectImage,offsetLeft,offsetTop,DRAW_SEAT_WIDTH,DRAW_SEAT_HEIGHT);
    this.ctx.fillText(`${rowIndex}排 `,offsetLeft+DRAW_SEAT_WIDTH / 2,offsetTop+DRAW_SEAT_HEIGHT/2.5);
    this.ctx.fillText(`${colIndex}座 `,offsetLeft+DRAW_SEAT_WIDTH / 2,offsetTop+DRAW_SEAT_HEIGHT*2/3);
  }

}


clickSeat = (e) =>{
  const offset =this.refs.canvas.getBoundingClientRect();
 // 返回值是一个 DOMRect 对象，
  // DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
  // 除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
  const clickX = e.pageX - offset.left; //点击的位置相对于canvas的位置
  const clickY = e.pageY - offset.top;
  //pageX 当前点击的 位置 距离可视区域的位置

  const xPos = Math.ceil(clickX / SEAT_WIDTH);//ceil 向上取整 得到的值是几排几座
  const yPos = Math.ceil(clickY / SEAT_HEIGHT);

  const seat=data.find(seat => seat.xPos === xPos && seat.yPos === yPos); //得到座位数据

  //若已经选择，点击则取消选择 反之选择座位
  //若当前座位已售 则不响应
  //若已选择四个座位，则不能再选

  if(!seat || seat.isSold){
    return ;
  }

  const seatIndex = this.props.selectSeat.findIndex(item => item.id===seat.id);
  //没找到返回-1
  if(seatIndex >-1){
    //若已经选择，点击则取消选择 反之选择座位
    this.props.onRemove(seat.id);
  }else{
    if(this.props.selectSeat.length >= 4){
      //若已选择四个座位，则不能再选
      alert("不能超过四个座位");
    }else{
      this.props.onAdd(seat);

    }
  }


}


componentDidUpdate(prevProps, prevState) {

  this.ctx.clearRect(0,0,DRAW_CANVAS_WIDTH,DRAW_CANVAS_HEIGHT);//擦掉canvas
  this.drawAllSeat(); //初始座位
  this.drawSelectSeat();//已选择座位
}


  render() {

    return (
      <canvas onClick={this.clickSeat} ref='canvas' style={{width:CANVAS_WIDTH,height:CANVAS_HEIGHT}} width={DRAW_CANVAS_WIDTH} height={DRAW_CANVAS_HEIGHT}/>
       //style里面的宽高相当于相框  外面的相当于画布 ，把大画布放到小相框里，更加精细
      );
  }
}

SeatSelector.propTypes = {
  selectSeat: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd:PropTypes.func.isRequired
};

const mapStateToProps = state =>{
  return{
    selectSeat:state
  };
};

const mapDispatchToProps = dispatch =>{
  return  {
    onAdd:seat =>{
      dispatch(addSeat(seat));

    },
    onRemove:id =>{
      dispatch(removeSeat(id));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SeatSelector);

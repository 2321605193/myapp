//引用redux

export const addSeat = seat =>{
  return{
    type:'ADD_SEAT',
    seat
  };

};

export const removeSeat = id =>{
  return{
    type:'REMOVE_SEAT',
    id
  };


}

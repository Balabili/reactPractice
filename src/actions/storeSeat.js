import * as types from '../constants/ActionTypes';

export const changeStoreSeat = (seats) => {
  return {
    type: types.CHANGE_STORE_SEATLIST,
    seats: seats
  }
}

export const changeSelectedSeat = (selectedSeats) => {
  return {
    type: types.CHANGE_STORE_SELECT_SEATLIST,
    selectedSeats: selectedSeats
  }
}
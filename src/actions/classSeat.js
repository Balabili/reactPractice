import * as types from '../constants/ActionTypes';

export const addIdList = (idList) => {
  return {
    type: types.ADD_CONST_ID_LIST,
    idList: idList
  }
}

export const changeSelectedSeat = (seatId) => {
  return {
    type: types.CHANGE_SELECTED_SEAT,
    seatId: seatId
  }
}

export const changeSeats = (seats) => {
  return {
    type: types.CURRENT_DURATION_SEATS,
    seats: seats
  }
}

export const changeSeatPosition = (seatPosition) => {
  return {
    type: types.SELECT_SEAT_POSITION,
    seatPosition: seatPosition
  }
}

export const addOldSeatId = (seatId) => {
  return {
    type: types.OLD_SEAT_ID,
    oldSeatId: seatId
  }
}

export const changeSeatRequiredStatus = (oldSeatRequired) => {
  return {
    type: types.ADD_OLD_SEATID_REQUIRED,
    oldSeatRequired: oldSeatRequired
  }
}
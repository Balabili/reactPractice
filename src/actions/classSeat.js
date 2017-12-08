import * as types from '../constants/ActionTypes';

export const addUserId = (userId) => {
  return {
    type: types.ADD_USERID,
    userId: userId
  }
}

export const addCourseDuration = (duration) => {
  return {
    type: types.ADD_DURATION,
    duration: duration
  }
}

export const changeViewSeatStatus = (isView) => {
  return {
    type: types.CHANGE_VIEWSEAT_STATUS,
    isView: isView
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
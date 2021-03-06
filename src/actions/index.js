import * as types from '../constants/ActionTypes';

export const addCourseId = (courseId) => {
  return {
    type: types.ADD_COURSEID,
    courseId: courseId || ''
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
    seatId: seatId || ''
  }
}

export const changeDuration = (durationList) => {
  return {
    type: types.CHANGE_DURATION,
    durations: durationList || []
  }
}

export const changeSeats = (seats) => {
  return {
    type: types.CURRENT_DURATION_SEATS,
    seats: seats || []
  }
}
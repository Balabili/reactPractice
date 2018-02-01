import * as types from '../constants/ActionTypes';

export const changeSeatList = (seatList) => {
  return {
    type: types.BUSINESS_SELECT_SEATLIST,
    seatList: seatList
  }
}
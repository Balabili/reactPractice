import * as types from '../constants/ActionTypes';

export const saveCurrentUserId = (userId) => {
  return {
    type: types.SAVE_CURRENTUSER_ID,
    userId: userId
  }
}

export const saveQuantumId = (quantumId) => {
  return {
    type: types.SAVE_QUANTUM_ID,
    quantumId: quantumId
  }
}

export const saveStoreSeatTemplateType = (templateType) => {
  return {
    type: types.CHANGE_STORE_TEMPLATE_TYPE,
    templateType: templateType
  };
}

export const addMovieSeatPrice = (moviePrice) => {
  return {
    type: types.ADD_MOVIE_SINGLE_PRICE,
    moviePrice: moviePrice
  };
}

export const addStoreSeatPriceMap = (priceMap) => {
  return {
    type: types.ADD_STORE_SEAT_PRICE,
    priceMap: priceMap
  };
}

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
import * as types from '../constants/ActionTypes';

export const addTodo = (durationList) => {
  return {
    type: types.CHANGE_DURATION,
    durations: durationList
  }
}
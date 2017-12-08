import * as types from '../constants/ActionTypes';

export const changeCurrentMonth = (month) => {
  return {
    type: types.GET_USER_SCHEDULE_MONTH,
    month: month
  }
}

export const changeCurrentMonday = (monday) => {
  return {
    type: types.GET_USER_SCHEDULE_MONDAY,
    monday: monday
  }
}

export const changePlannedSchedule = (scheduleList) => {
  return {
    type: types.GET_USER_SCHEDULE_PLANNED_LIST,
    scheduleList: scheduleList
  }
}

export const changeUnPlannedSchedule = (unusedScheduleList) => {
  return {
    type: types.GET_USER_SCHEDULE_UNPLANNED_LIST,
    unusedScheduleList: unusedScheduleList
  }
}

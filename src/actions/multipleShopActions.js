import * as types from '../constants/ActionTypes';

export const sentMultipleDetails = (details) => {
  return {
    type: types.GET_MULTIPLE_DETAILS,
    details: details
  }
}

export const sentMultipleExtra = (extra) => {
    return {
      type: types.GET_MULTIPLE_EXTRA,
      extra: extra
    }
}
export const sentMultipleSchool = (school) => {
    return {
      type: types.GET_MULTIPLE_SCHOOL,
      school: school
    }
}
export const sentMultipleRecommend = (recommend) => {
    return {
      type: types.GET_MULTIPLE_RECOMMEND,
      recommend: recommend
    }
}
export const sentMultipleTeacher = (teacher) => {
  return {
    type: types.GET_MULTIPLE_TEACHER,
    teacher: teacher
  }
}
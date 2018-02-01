import * as types from '../constants/ActionTypes';

export const sentCourseDetails = (details) => {
  return {
    type: types.GET_COURSE_DETAILS,
    details: details
  }
}

export const sentCourseInd = (ind) => {
  return {
    type: types.GET_COURSE_INDEX,
    ind: ind
  }
}

export const sentCoursefeatures = (features) => {
  return {
    type: types.GET_COURSE_FEATURES,
    features: features
  }
}

export const sentCourseTimes = (times) => {
  return {
    type: types.GET_COURSE_TIMES,
    times: times
  }
}

export const sentCourseComment = (com) => {
  return {
    type: types.GET_COURSE_COMMENT,
    com: com
  }
}

export const sentCourseSchool = (school) => {
  return {
    type: types.GET_COURSE_SCHOOL,
    school: school
  }
}

export const sentCoursetv = (tv) => {
  return {
    type: types.GET_COURSE_TV,
    tv: tv
  }
}

export const sentCourseTeacher = (teacher) => {
  return {
    type: types.GET_COURSE_TEACHER,
    teacher: teacher
  }
}

export const sentCourseIntroduce = (introduce) => {
  return {
    type: types.GET_COURSE_INTRODUCE,
    introduce: introduce
  }
}

export const sentCourseRecommend = (recommend) => {
  return {
    type: types.GET_COURSE_RECOMMEND,
    recommend: recommend
  }
}
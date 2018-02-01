import * as types from '../constants/ActionTypes';

export const saveTeacherPageSchoolId = (schoolId) => {
  return {
    type: types.SAVE_TEACHER_PAGE_SCHOOLID,
    schoolId: schoolId
  }
}

export const changeTeachers = (teachers) => {
  return {
    type: types.GET_ALL_TEACHERS,
    teachers: teachers
  }
}

export const changeCurrentTeacher = (teacherId) => {
  return {
    type: types.GET_CURRENT_TEACHERID,
    teacherId: teacherId
  }
}

export const changeCurrentMonday = (monday) => {
  return {
    type: types.GET_TEACHER_CURRENT_MONDAY,
    monday: monday
  }
}

export const changeSelectedDay = (day) => {
  return {
    type: types.GET_TEACHER_SELECTED_DAY,
    selectDay: day
  }
}

export const changeTeacherLessonList = (lessonList) => {
  return {
    type: types.GET_TEACHER_LESSONLIST,
    lessonList: lessonList
  }
}
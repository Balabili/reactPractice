import * as types from '../constants/ActionTypes';

export const saveSchedulePageSchoolId = (schoolId) => {
  return {
    type: types.SAVE_SCHOOL_SCHEDULE_PAGE_SCHOOLID,
    schoolId: schoolId
  }
}

export const changeScheduleViewStatus = (isTeacher) => {
  return {
    type: types.GET_VIEW_STATUS,
    isTeacherView: isTeacher
  }
}

export const changeLessonList = (lessons) => {
  return {
    type: types.GET_ALL_LESSON,
    lessons: lessons
  }
}

export const changeCurrentLesson = (lessonId) => {
  return {
    type: types.GET_CURRENT_LESSON,
    lessonId: lessonId
  }
}

export const getCurrentTeacherList = (teachers) => {
  return {
    type: types.GET_TEACHER_LIST,
    teachers: teachers
  }
}

export const changeCurrentTeacher = (teacherId) => {
  return {
    type: types.GET_CURRENT_TEACHER,
    teacherId: teacherId
  }
}

export const getClassValidMonthList = (monthList) => {
  return {
    type: types.GET_ALL_VALID_MONTH,
    classValidMonthList: monthList
  }
}

export const changeCurrentClassPlace = (currentPlace) => {
  return {
    type: types.GET_CURRENT_CLASS_PLACE,
    currentPlace: currentPlace
  }
}

export const changeCurrentMonth = (month) => {
  return {
    type: types.GET_CURRENT_MONTH,
    currentMonth: month
  }
}

export const changeCurrentMonday = (monday) => {
  return {
    type: types.GET_CURRENT_MONDAY,
    currentMonday: monday
  }
}

export const changeCurrentSchedule = (scheduleList) => {
  return {
    type: types.GET_CURRENT_SCHEDULE,
    scheduleList: scheduleList
  }
}

export const changeCurrentTeacherSchedule = (teacherScheduleList) => {
  return {
    type: types.GET_CURRENT_TEACHER_SCHEDULE,
    teacherScheduleList: teacherScheduleList
  }
}

export const changeLessonColorMap = (lessonColorMap) => {
  return {
    type: types.GET_LESSON_COLOR_MAP,
    lessonColorMap: lessonColorMap
  }
}

export const changeValidTimeline = (validDuration) => {
  return {
    type: types.GET_VALID_DURATION,
    validDuration: validDuration
  }
} 

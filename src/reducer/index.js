import { combineReducers } from 'redux';
import { formatMonth } from '../utils/util';

const initSeatState = {
  userId: '',
  duration: {},
  isView: true,
  seatId: '',
  seats: []
};

const seatPage = (state = initSeatState, action) => {
  switch (action.type) {
    case 'ADD_USERID':
      return { ...state, userId: action.userId };
    case 'ADD_DURATION':
      return { ...state, duration: action.duration };
    case 'CHANGE_VIEWSEAT_STATUS':
      return { ...state, isView: action.isView };
    case 'CHANGE_SELECTED_SEAT':
      return { ...state, seatId: action.seatId };
    case 'CURRENT_DURATION_SEATS':
      return { ...state, seats: action.seats };
    default:
      return state;
  }
};

const initStoreSeatState = {
  seats: [],
  selectedSeats: []
}

const storeSeatPage = (state = initStoreSeatState, action) => {
  switch (action.type) {
    case 'CHANGE_STORE_SEATLIST':
      return { ...state, seats: action.seats };
    case 'CHANGE_STORE_SELECT_SEATLIST':
      return { ...state, selectedSeats: action.selectedSeats };
    default:
      return state;
  }
};

const initScheduleState = {
  isTeacherView: false,
  lessons: [],
  lessonId: '',
  teachers: [],
  teacherId: '',
  lessonColorMap: {},
  validDuration: { beginTime: '', endTime: '' },
  classValidMonthList: [],
  currentMonth: { key: '2017-11', value: formatMonth(new Date()) },
  currentPlace: '',
  scheduleList: { fornoon: [[], [], [], [], [], [], []], afternoon: [[], [], [], [], [], [], []], night: [[], [], [], [], [], [], []] },
  teacherScheduleList: { fornoon: [], afternoon: [], night: [] },
  colorList: ['#26c281', '#f5d76e', '#f7ca18', '#f4d03f', '#fde3a7', '#f89406', '#eb9532', '#e87e04', '#f4b350', '#f2784b',
    '#eb974e', '#f5ab35', '#d35400', '#f39c12', '#f9690e']
};

const schedulePage = (state = initScheduleState, action) => {
  switch (action.type) {
    case 'GET_VIEW_STATUS':
      return { ...state, isTeacherView: action.isTeacherView };
    case 'GET_ALL_LESSON':
      return { ...state, lessons: action.lessons };
    case 'GET_CURRENT_LESSON':
      return { ...state, lessonId: action.lessonId };
    case 'GET_TEACHER_LIST':
      return { ...state, teachers: action.teachers };
    case 'GET_CURRENT_TEACHER':
      return { ...state, teacherId: action.teacherId };
    case 'GET_ALL_VALID_MONTH':
      return { ...state, classValidMonthList: action.classValidMonthList };
    case 'GET_CURRENT_MONTH':
      return { ...state, currentMonth: action.currentMonth };
    case 'GET_CURRENT_CLASS_PLACE':
      return { ...state, currentPlace: action.currentPlace };
    case 'GET_CURRENT_MONDAY':
      return { ...state, currentMonday: action.currentMonday };
    case 'GET_CURRENT_SCHEDULE':
      return { ...state, scheduleList: action.scheduleList };
    case 'GET_CURRENT_TEACHER_SCHEDULE':
      return { ...state, teacherScheduleList: action.teacherScheduleList };
    case 'GET_LESSON_COLOR_MAP':
      return { ...state, lessonColorMap: action.lessonColorMap };
    case 'GET_VALID_DURATION':
      return { ...state, validDuration: action.validDuration };
    default:
      return state;
  }
}

const initTeacherScheduleState = {
  teachers: [],
  teacherId: '',
  monday: new Date(),
  selectDay: new Date(),
  lessonList: {}
}

const teacherSchedulePage = (state = initTeacherScheduleState, action) => {
  switch (action.type) {
    case 'GET_ALL_TEACHERS':
      return { ...state, teachers: action.teachers };
    case 'GET_CURRENT_TEACHERID':
      return { ...state, teacherId: action.teacherId };
    case 'GET_TEACHER_CURRENT_MONDAY':
      return { ...state, monday: action.monday };
    case 'GET_TEACHER_SELECTED_DAY':
      return { ...state, selectDay: action.selectDay };
    case 'GET_TEACHER_LESSONLIST':
      return { ...state, lessonList: action.lessonList };
    default:
      return state;
  }
}

const initUserScheduleState = {
  currentMonth: '',
  currentMonday: new Date(),
  scheduleList: [],
  unusedScheduleList: [],
  scheduleTypeColorMap: { 1: '#ffd5dd', 2: '#dbcdff', 3: '#ddeebf' }
}

const userSchedulePage = (state = initUserScheduleState, action) => {
  switch (action.type) {
    case 'GET_USER_SCHEDULE_MONTH':
      return { ...state, currentMonth: action.month };
    case 'GET_USER_SCHEDULE_MONDAY':
      return { ...state, currentMonday: action.monday };
    case 'GET_USER_SCHEDULE_PLANNED_LIST':
      return { ...state, scheduleList: action.scheduleList };
    case 'GET_USER_SCHEDULE_UNPLANNED_LIST':
      return { ...state, unusedScheduleList: action.unusedScheduleList };
    default:
      return state;
  }
}

const reducer = combineReducers({
  seatPage,
  storeSeatPage,
  schedulePage,
  teacherSchedulePage,
  userSchedulePage
});

export default reducer;
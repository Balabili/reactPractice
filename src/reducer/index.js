import { combineReducers } from 'redux';
import { formatMonth } from '../utils/util';

const initSeatState = {
  idList: {},
  seatId: '',
  seats: [],
  seatPosition: null,
  oldSeatId: '',
  oldSeatRequired: false
};

const seatPage = (state = initSeatState, action) => {
  switch (action.type) {
    case 'ADD_CONST_ID_LIST':
      return { ...state, idList: action.idList };
    case 'CHANGE_SELECTED_SEAT':
      return { ...state, seatId: action.seatId };
    case 'CURRENT_DURATION_SEATS':
      return { ...state, seats: action.seats };
    case 'SELECT_SEAT_POSITION':
      return { ...state, seatPosition: action.seatPosition };
    case 'OLD_SEAT_ID':
      return { ...state, oldSeatId: action.oldSeatId };
    case 'ADD_OLD_SEATID_REQUIRED':
      return { ...state, oldSeatRequired: action.oldSeatRequired };
    default:
      return state;
  }
};

const initBusinessSeatState = {
  seatList: []
};

const businessSeatPage = (state = initBusinessSeatState, action) => {
  switch (action.type) {
    case 'BUSINESS_SELECT_SEATLIST':
      return { ...state, seatList: action.seatList };
    default:
      return state;
  }
}

const initStoreSeatState = {
  userId: '',
  quantumId: '',
  templateType: '1',
  moviePrice: 0,
  priceMap: {},
  seats: {},
  selectedSeats: [],
  seatColorMap: { 'A': '#fcd9d9', 'B': '#fce7d9', 'C': '#d9e8fc', 'D': '#dbefe6', 'E': '#eae9fd' }
}

const storeSeatPage = (state = initStoreSeatState, action) => {
  switch (action.type) {
    case 'SAVE_CURRENTUSER_ID':
    return { ...state, userId: action.userId };
    case 'SAVE_QUANTUM_ID':
      return { ...state, quantumId: action.quantumId };
    case 'CHANGE_STORE_TEMPLATE_TYPE':
      return { ...state, templateType: action.templateType };
    case 'ADD_STORE_SEAT_PRICE':
      return { ...state, priceMap: action.priceMap };
    case 'ADD_MOVIE_SINGLE_PRICE':
      return { ...state, moviePrice: action.moviePrice };
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
  schoolId: '',
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
    case 'SAVE_SCHOOL_SCHEDULE_PAGE_SCHOOLID':
      return { ...state, schoolId: action.schoolId };
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
  schoolId: '',
  teacherId: '',
  monday: new Date(),
  selectDay: new Date(),
  lessonList: {}
}

const teacherSchedulePage = (state = initTeacherScheduleState, action) => {
  switch (action.type) {
    case 'SAVE_TEACHER_PAGE_SCHOOLID':
      return { ...state, schoolId: action.schoolId };
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

const initMultipleState = {
  details: [],
  extra: [],
  school: [],
  recommend: [],
  teacher: []
}

const multipleShopPage = (state = initMultipleState, action) => {
  switch (action.type) {
    case 'GET_MULTIPLE_DETAILS':
      return { ...state, details: action.details };
    case 'GET_MULTIPLE_EXTRA':
      return { ...state, extra: action.extra };
    case 'GET_MULTIPLE_SCHOOL':
      return { ...state, school: action.school };
    case 'GET_MULTIPLE_RECOMMEND':
      return { ...state, recommend: action.recommend };
    case 'GET_MULTIPLE_TEACHER':
      return { ...state, teacher: action.teacher };
    default:
      return state;
  }
}

const reducer = combineReducers({
  seatPage,
  businessSeatPage,
  storeSeatPage,
  schedulePage,
  teacherSchedulePage,
  userSchedulePage,
  multipleShopPage
});

export default reducer;
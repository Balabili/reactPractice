import { addDate } from '../utils/util';

function formatWeek(currentMonday, count, activeTabIndex, isSameMonth) {
  const today = new Date(), currentDate = addDate(currentMonday, count), date = currentDate.getDate();
  let week = currentDate.getDay();
  switch (week) {
    case 0:
      week = '周日';
      break;
    case 1:
      week = '周一';
      break;
    case 2:
      week = '周二';
      break;
    case 3:
      week = '周三';
      break;
    case 4:
      week = '周四';
      break;
    case 5:
      week = '周五';
      break;
    case 6:
      week = '周六';
      break;
    default: break;
  }
  if (count === activeTabIndex) {
    return { week: week, date: date + '日', isToday: true, isSameMonth: isSameMonth ? isSameMonth : (currentDate.getDate() < currentMonday.getDate()) };
  } else {
    if (typeof (activeTabIndex) === 'number') {
      return { week: week, date: date + '日', isSameMonth: isSameMonth ? isSameMonth : (currentDate.getDate() < currentMonday.getDate()) };
    }
    if (today.getFullYear() === currentDate.getFullYear() && today.getMonth() === currentDate.getMonth() && today.getDate() === date) {
      return { week: week, date: date + '日', isToday: true, isSameMonth: isSameMonth ? isSameMonth : (currentDate.getDate() < currentMonday.getDate()) };
    }
  }
  return { week: week, date: date + '日', isSameMonth: isSameMonth ? isSameMonth : (currentDate.getDate() < currentMonday.getDate()) };
}

export const getCurrentWeekDateList = (currentMonday, activeTabIndex) => {
  if (!currentMonday) { return []; }
  const currentSunday = addDate(currentMonday, 6), isSameMonth = currentSunday.getDate() > currentMonday.getDate();
  let weekList = [];
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      weekList.push(formatWeek(currentMonday, 0, activeTabIndex, isSameMonth));
    } else {
      weekList.push(formatWeek(currentMonday, i, activeTabIndex, isSameMonth));
    }
  }
  return weekList;
}

export const formatScheduleList = (fetchData) => {
  const len = fetchData.length;
  let fornoon = [[], [], [], [], [], [], []], afternoon = [[], [], [], [], [], [], []], night = [[], [], [], [], [], [], []];
  for (let i = 0; i < len; i++) {
    const index = fetchData[i].week - 1;
    fornoon[index] = fetchData[i].forenoonList || [];
    afternoon[index] = fetchData[i].afternoonList || [];
    night[index] = fetchData[i].nightList || [];
  }
  return { fornoon: fornoon, afternoon: afternoon, night: night }
}

export const formatTeacher = (teachers, colorList) => {
  const len = teachers.length;
  for (let i = 0; i < len; i++) {
    teachers[i].color = colorList[i];
  }
  teachers.unshift({ teacher_id: '', name: '全部', selected: true });
  return teachers;
}

export const calculateMonday = (date) => {
  let currentWeek = date.getDay();
  //星期日变成7
  currentWeek = currentWeek === 0 ? 7 : currentWeek;
  return addDate(date, 1 - currentWeek);
}
import React from 'react';
import { addDate } from '../utils/util';
import A_Actived from '../images/A_kx.png';
import A_Deactived from '../images/A_yixuan.png';
import B_Actived from '../images/B_kx.png';
import B_Deactived from '../images/B_yixuan.png';
import C_Actived from '../images/C_kx.png';
import C_Deactived from '../images/C_yx.png';
import D_Actived from '../images/D_kx.png';
import D_Deactived from '../images/D_YX.png';
import E_Actived from '../images/E_KX.png';
import E_Deactived from '../images/E_YX.png';
import selected from '../images/xuanzhong.png';
import imgActived from '../images/seat_grey.png';
import imgSelected from '../images/seat_green.png';
import imgDeactived from '../images/seat_red.png';

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

// 格式化课程表数据
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

// 格式化教师
export const formatTeacher = (teachers, colorList) => {
  const len = teachers.length;
  for (let i = 0; i < len; i++) {
    teachers[i].color = colorList[i];
  }
  teachers.unshift({ teacher_id: '', name: '全部', selected: true });
  return teachers;
}

// 计算周一
export const calculateMonday = (date) => {
  let currentWeek = date.getDay();
  //星期日变成7
  currentWeek = currentWeek === 0 ? 7 : currentWeek;
  return addDate(date, 1 - currentWeek);
}

// 格式化个人课表
export const formatMyScheduleResultList = (resultList) => {
  const len = resultList.length;
  let arr = [[], [], [], [], [], [], []];
  for (let i = 0; i < len; i++) {
    arr[resultList[i].week - 1] = resultList[i].dayList;
  }
  return arr;
}

function hasCurrentColumn(seatList, col) {
  const len = seatList.length;
  for (let i = 0; i < len; i++) {
    if (seatList[i].column === col) {
      return seatList[i];
    }
  }
  return false;
}

function getCompetitionBgImage(columnData) {
  switch (columnData.zone) {
    case 'A':
      if (columnData.type === '1') {
        return { backgroundImage: `url(${A_Actived})` };
      } else if (columnData.type === '3') {
        return { backgroundImage: `url(${A_Deactived})` };
      } else {
        return { backgroundImage: `url(${selected})` };
      }
    case 'B':
      if (columnData.type === '1') {
        return { backgroundImage: `url(${B_Actived})` };
      } else if (columnData.type === '3') {
        return { backgroundImage: `url(${B_Deactived})` };
      } else {
        return { backgroundImage: `url(${selected})` };
      }
    case 'C':
      if (columnData.type === '1') {
        return { backgroundImage: `url(${C_Actived})` };
      } else if (columnData.type === '3') {
        return { backgroundImage: `url(${C_Deactived})` };
      } else {
        return { backgroundImage: `url(${selected})` };
      }
    case 'D':
      if (columnData.type === '1') {
        return { backgroundImage: `url(${D_Actived})` };
      } else if (columnData.type === '3') {
        return { backgroundImage: `url(${D_Deactived})` };
      } else {
        return { backgroundImage: `url(${selected})` };
      }
    case 'E':
      if (columnData.type === '1') {
        return { backgroundImage: `url(${E_Actived})` };
      } else if (columnData.type === '3') {
        return { backgroundImage: `url(${E_Deactived})` };
      } else {
        return { backgroundImage: `url(${selected})` };
      }
    default:
      return {};
  }
}

function getMovieBgImage(type) {
  if (type === '1') {
    return { backgroundImage: `url(${imgActived})` };
  } else if (type === '2') {
    return { backgroundImage: `url(${imgSelected})` };
  } else {
    return { backgroundImage: `url(${imgDeactived})` };
  }
}

export const getSeatColumns = (seatList, isMovie) => {
  const len = seatList.length, maxColumn = seatList[len - 1].column, seatListDom = [];
  for (let i = 1; i < maxColumn + 1; i++) {
    const currentColumn = hasCurrentColumn(seatList, i);
    if (currentColumn) {
      seatListDom.push(
        <span className='Store-seat-item' key={i} data-id={currentColumn.seatId} data-type={currentColumn.type}
          style={isMovie ? getMovieBgImage(currentColumn.type) : getCompetitionBgImage(currentColumn)}>
        </span>
      );
    } else {
      seatListDom.push(
        <span className='Store-seat-item' key={i} style={{ visibility: 'hidden' }}></span>
      );
    }
  }
  return seatListDom;
}


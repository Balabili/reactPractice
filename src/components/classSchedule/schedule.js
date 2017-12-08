import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScheduleSection from './scheduleSection';
import * as actions from '../../actions/classSchedule';
import { addDate, touchMove, formatDate } from '../../utils/util';
import { getCurrentWeekDateList, formatScheduleList } from '../../api/classSchedule';
import ajax from '../../utils/fetch';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.getTouchStartPosition = this.getTouchStartPosition.bind(this);
    this.calculateMovePosition = this.calculateMovePosition.bind(this);
    this.state = { startX: '', startY: '', touchMoveDisabled: false };
  }

  getTouchStartPosition({ targetTouches }) {
    this.setState({
      startX: targetTouches[0].pageX,
      startY: targetTouches[0].pageY
    });
  }

  calculateMovePosition({ targetTouches }) {
    const self = this, state = self.state, currentMonday = self.props.currentMonday,
      start = { X: state.startX, Y: state.startY },
      end = { X: targetTouches[0].pageX, Y: targetTouches[0].pageY },
      position = touchMove(start, end);
    if (state.touchMoveDisabled) {
      return;
    }
    self.setState({ touchMoveDisabled: true });
    let newMonday = '';
    if (position === 'left') {
      newMonday = addDate(currentMonday, 7);
    } else if (position === 'right') {
      newMonday = addDate(currentMonday, -7);
    } else {
      self.setState({ touchMoveDisabled: false });
      return;
    }
    const calculatedMonday = this.calculateCurrentMonth(newMonday, position === 'left');
    //如果当前周没变  直接return防止产生无效消耗
    if (calculatedMonday.getFullYear() === currentMonday.getFullYear() && calculatedMonday.getMonth() === currentMonday.getMonth()
      && calculatedMonday.getDate() === currentMonday.getDate()) {
      self.setState({ touchMoveDisabled: false });
      return;
    }
    this.getCurrentClassList(calculatedMonday);
  }

  calculateCurrentMonth(newMonday, isNextWeek) {
    const { currentMonth, currentMonday, validDuration, classValidMonthList, changeCurrentMonday, changeCurrentMonth } = this.props,
      len = classValidMonthList.length, currentSunday = addDate(newMonday, 6),
      mondayMonth = this.formatMonth(newMonday), sundayMonth = this.formatMonth(currentSunday);
    //根据起止时间判断是不是可以左滑右划改变当前周
    if (isNextWeek) {
      const endDate = validDuration.endTime,
        mondayYear = newMonday.getFullYear(), mondayMonth = newMonday.getMonth() + 1, mondayDate = newMonday.getDate(),
        year = +endDate.substr(0, 4), month = +endDate.substr(5, 2), date = +endDate.substr(8, 2);
      if (mondayYear > year
        || (mondayYear === year && mondayMonth > month)
        || (mondayYear === year && mondayMonth === month && mondayDate > date)) {
        return currentMonday;
      }
    } else {
      const startDate = validDuration.beginTime,
        sundayYear = currentSunday.getFullYear(), sundayMonth = currentSunday.getMonth() + 1, sundayDate = currentSunday.getDate(),
        year = +startDate.substr(0, 4), month = +startDate.substr(5, 2), date = +startDate.substr(8, 2);;
      if (sundayYear < year
        || (sundayYear === year && sundayMonth < month)
        || (sundayYear === year && sundayMonth === month && sundayDate < date)) {
        return currentMonday;
      }
    }
    let hasValidMonth = false;
    //如果周末是当前月  不改变月份  只改变monday
    if (sundayMonth === currentMonth.key) {
      changeCurrentMonday(newMonday);
      return newMonday;
    }
    //如果周末不是当前月份   遍历所有有效月份获取
    for (let i = 0; i < len; i++) {
      if (classValidMonthList[i].key === sundayMonth) {
        changeCurrentMonday(newMonday);
        changeCurrentMonth(classValidMonthList[i]);
        hasValidMonth = true;
        return newMonday;
      }
    }
    //如果最后有效日期所在的周 周末所在的月份不在月份列表里 选中列表中最后一个月份
    if (!hasValidMonth && (classValidMonthList[len - 1].key === mondayMonth)) {
      changeCurrentMonday(newMonday);
      return newMonday;
    }
  }

  getCurrentClassList(currentMonday) {
    const self = this, { teacherId, lessonId } = this.props, end = formatDate(addDate(currentMonday, 6));
    let data = { schoolId: '2af15be1620d45e2968b70b8bf56179f', beginTime: formatDate(currentMonday), endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    if (teacherId) {
      data.teacherId = teacherId;
    }
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList }) => {
      const { changeCurrentSchedule } = self.props;
      changeCurrentSchedule(formatScheduleList(resultList));
      self.setState({ touchMoveDisabled: false });
    }).catch((e) => {
      console.log(e);
      self.setState({ touchMoveDisabled: false });
    });
  }

  formatMonth(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month >= 10 ? (month + '') : ('0' + month);
    return year + '-' + month;
  }

  render() {
    const { scheduleList, isTeacherView, teacherScheduleList, currentMonday } = this.props, currentWeekDateList = getCurrentWeekDateList(currentMonday),
      title = currentWeekDateList.map((item, index) => {
        return (
          <div className={`Week-column Week-column-title ${item.isToday ? 'Week-column-title-today' : (item.isSameMonth ? 'Week-column-title-active' : '')}`} key={index}>
            <div>{item.week}</div>
            <div>{item.date}</div>
          </div>
        );
      });
    return (
      <div className='Schedule-gird-container' onTouchStart={this.getTouchStartPosition} onTouchMove={this.calculateMovePosition}>
        <div className='Schedule-header'>
          <div className='Schedule-header-sidebar'></div>
          <div className='Schedule-header-content'>
            {title}
          </div>
        </div>
        <ScheduleSection time='上午' lessonList={isTeacherView ? teacherScheduleList.fornoon : scheduleList.fornoon}></ScheduleSection>
        <ScheduleSection time='下午' lessonList={isTeacherView ? teacherScheduleList.afternoon : scheduleList.afternoon}></ScheduleSection>
        <ScheduleSection time='晚上' lessonList={isTeacherView ? teacherScheduleList.night : scheduleList.night}></ScheduleSection>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.schedulePage;
  return {
    classValidMonthList: stateData.classValidMonthList,
    currentMonday: stateData.currentMonday,
    currentMonth: stateData.currentMonth,
    scheduleList: stateData.scheduleList,
    teacherScheduleList: stateData.teacherScheduleList,
    teacherId: stateData.teacherId,
    lessonId: stateData.lessonId,
    isTeacherView: stateData.isTeacherView,
    validDuration: stateData.validDuration
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentMonday: actions.changeCurrentMonday,
    changeCurrentMonth: actions.changeCurrentMonth,
    changeCurrentSchedule: actions.changeCurrentSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
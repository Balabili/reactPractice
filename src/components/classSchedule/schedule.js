import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spin from 'antd/lib/spin';
import ScheduleSection from './scheduleSection';
import * as actions from '../../actions/classSchedule';
import { addDate, touchMove, formatDate } from '../../utils/util';
import { getCurrentWeekDateList, formatScheduleList } from '../../api/commonApi';
import ajax from '../../utils/fetch';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.getTouchStartPosition = this.getTouchStartPosition.bind(this);
    this.calculateMovePosition = this.calculateMovePosition.bind(this);
    // state为左滑右划服务
    this.state = { startX: '', startY: '', touchMoveDisabled: false };
  }

  getTouchStartPosition({ targetTouches }) {
    // 手指触摸屏幕时记录初始位置
    this.setState({
      startX: targetTouches[0].pageX,
      startY: targetTouches[0].pageY
    });
  }

  calculateMovePosition({ targetTouches }) {
    const self = this, state = self.state, currentMonday = self.props.currentMonday,
      //记录手指触屏的初始位置和结束位置，计算滑动方向  
      start = { X: state.startX, Y: state.startY },
      end = { X: targetTouches[0].pageX, Y: targetTouches[0].pageY },
      position = touchMove(start, end);
    //如果处于上次滑动并且在取数据的过程中则直接return 防止滑动是手指拉动过长导致跳转N周
    if (state.touchMoveDisabled) {
      return;
    }
    //禁止滑动
    self.setState({ touchMoveDisabled: true });
    let newMonday = '';
    if (position === 'left') {
      // 左滑时间加一周
      newMonday = addDate(currentMonday, 7);
    } else if (position === 'right') {
      // 右划时间减少一周
      newMonday = addDate(currentMonday, -7);
    } else {
      // 触发上划下滑  接触禁止滑动  直接return
      self.setState({ touchMoveDisabled: false });
      return;
    }
    // 计算滑动之后的周一   根据时间的边界值进行额外判断滑动时是否改变周一的值
    const calculatedMonday = this.calculateCurrentMonth(newMonday, position === 'left');
    //如果当前周没变  直接return防止产生无效消耗  浪费效率
    if (calculatedMonday.getFullYear() === currentMonday.getFullYear() && calculatedMonday.getMonth() === currentMonday.getMonth()
      && calculatedMonday.getDate() === currentMonday.getDate()) {
      self.setState({ touchMoveDisabled: false });
      return;
    }
    // 获取课表数据
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
    const self = this, { teacherId, lessonId, schoolId } = this.props, end = formatDate(addDate(currentMonday, 6));
    let data = { schoolId: schoolId, beginTime: formatDate(currentMonday), endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    if (teacherId) {
      data.teacherId = teacherId;
    }
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList }) => {
      const { changeCurrentSchedule } = self.props;
      // 修改课表
      changeCurrentSchedule(formatScheduleList(resultList));
      // 加延迟解决手指滑动一下跳跃多个周
      setTimeout(() => {
        self.setState({ touchMoveDisabled: false });
      }, 250);
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
        // 遍历生成课程表表头
        return (
          <div className={`Week-column Week-column-title ${item.isToday ? 'Week-column-title-today' : (item.isSameMonth ? 'Week-column-title-active' : '')}`} key={index}>
            <div>{item.week}</div>
            <div>{item.date}</div>
          </div>
        );
      });

    //根据是否是教师课程表动态传递数据
    return (
      <Spin spinning={this.state.touchMoveDisabled}>
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
      </Spin>
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
    validDuration: stateData.validDuration,
    schoolId: stateData.schoolId
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
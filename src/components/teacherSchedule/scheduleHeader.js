import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/teacherSchedule';
import { formatDate, addDate } from '../../utils/util';
import { getCurrentWeekDateList } from '../../api/commonApi';
import ajax from '../../utils/fetch';

class TeacherScheduleHeader extends React.Component {
  constructor() {
    super();
    this.selectDay = this.selectDay.bind(this);
    this.state = { tabIndex: null };
  }

  selectDay({ currentTarget }) {
    if (currentTarget.classList.length === 2) {
      return;
    }
    const self = this, { monday, schoolId, teacherId, changeSelectedDay, changeTeacherLessonList } = self.props, weekIndex = +currentTarget.dataset.week,
      selectedDay = addDate(monday, weekIndex), data = { schoolId: schoolId, teacherId: teacherId, dateTime: formatDate(selectedDay) };
    ajax('http://192.168.51.98:8088/app/findSchoolTeacherTimetable', data).then(({ resultList }) => {
      self.setState({ tabIndex: weekIndex });
      changeSelectedDay(selectedDay);
      changeTeacherLessonList(resultList[0] || {});
    }).catch((e) => { console.log(e); });
  }

  render() {
    const self = this, { monday } = self.props, currentWeek = getCurrentWeekDateList(monday, self.state.tabIndex),
      header = currentWeek.map((item, index) => {
        return (
          <div className={`Teacher-schedule-header-item ${item.isToday ? 'Teacher-schedule-header-item-active' : ''}`}
            onClick={self.selectDay} key={index} data-week={index}>
            <div>{item.week}</div>
            <div>{item.date}</div>
          </div>
        );
      });

    return (
      <div className='Teacher-schedule-header'>
        {header}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.teacherSchedulePage;
  return {
    monday: stateData.monday,
    schoolId: stateData.schoolId,
    teacherId: stateData.teacherId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSelectedDay: actions.changeSelectedDay,
    changeTeacherLessonList: actions.changeTeacherLessonList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScheduleHeader);
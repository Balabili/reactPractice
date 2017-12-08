import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/teacherSchedule';
import { addDate } from '../../utils/util';
import { getCurrentWeekDateList } from '../../api/classSchedule';
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
    const { monday, changeSelectedDay,changeTeacherLessonList } = this.props, weekIndex = +currentTarget.dataset.week, selectedDay = addDate(monday, weekIndex);
    this.setState({ tabIndex: weekIndex });
    changeSelectedDay(selectedDay);
    //获取课程信息
    //ajax
    //changeTeacherLessonList();
  }

  render() {
    const { monday } = this.props, currentWeek = getCurrentWeekDateList(monday, this.state.tabIndex),
      header = currentWeek.map((item, index) => {
        return (
          <div className={`Teacher-schedule-header-item ${item.isToday ? 'Teacher-schedule-header-item-active' : ''}`}
            onClick={this.selectDay} key={index} data-week={index}>
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
  return {
    monday: state.teacherSchedulePage.monday
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeSelectedDay: actions.changeSelectedDay,
    changeTeacherLessonList:actions.changeTeacherLessonList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScheduleHeader);
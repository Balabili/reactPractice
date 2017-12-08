import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/teacherSchedule';
import Header from '../components/teacherSchedule/header';
import Schedule from '../components/teacherSchedule/schedule';
import { addDate } from '../utils/util';

class TeacherSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { changeTeachers, changeCurrentTeacher, changeCurrentMonday, changeTeacherLessonList } = this.props, teacherList = [
      { id: '11', name: '你大爷' }, { id: '22', name: '你2爷' }, { id: '33', name: '你3爷' },
      { id: '44', name: '你4爷' }, { id: '55', name: '你5爷' }, { id: '66', name: '你6爷' }
    ], lessonList = {
      fornoon: [{ time: '8:00~10:00', name: 'SQL从入门到崩溃' }, { time: '10:00~12:00', name: 'SQL从删库到跑路' }],
      afternoon: [{ time: '13:00~15:00', name: 'SQL从入门到崩溃' }, { time: '15:00~17:00', name: 'SQL从删库到跑路' }],
      night: [{ time: '18:00~20:00', name: 'SQL从入门到崩溃' }, { time: '20:00~22:00', name: 'SQL从删库到跑路' }]
    };
    changeCurrentMonday(this.calculateMonday(new Date()));
    changeTeachers(teacherList);
    changeCurrentTeacher(teacherList[0].id);
    changeTeacherLessonList(lessonList);
  }

  calculateMonday(date) {
    let currentWeek = date.getDay();
    //星期日变成7
    currentWeek = currentWeek === 0 ? 7 : currentWeek;
    return addDate(date, 1 - currentWeek);
  }

  render() {
    return (
      <div className='Teacher-schedule-container'>
        <Header></Header>
        <Schedule></Schedule>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeTeachers: actions.changeTeachers,
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeCurrentMonday: actions.changeCurrentMonday,
    changeTeacherLessonList: actions.changeTeacherLessonList
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(TeacherSchedule);
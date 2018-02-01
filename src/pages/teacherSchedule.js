import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/teacherSchedule';
import Header from '../components/teacherSchedule/header';
import Schedule from '../components/teacherSchedule/schedule';
import { addDate } from '../utils/util';
import ajax from '../utils/fetch';

class TeacherSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 作为学校分享页子组件的兼容
    const self = this, props = self.props,
      { changeTeachers, changeCurrentTeacher, changeCurrentMonday, changeTeacherLessonList, saveTeacherPageSchoolId } = props,
      match = props.match ? props.match : '', params = match ? match.params : '', schoolId = params ? params.schoolId : props.schoolId;
    saveTeacherPageSchoolId(schoolId);
    ajax('http://192.168.51.98:8088/app/findSchoolTeacherTimetable', { schoolId: schoolId }).then(({ resultList, teacherList }) => {
      // resultList教师当天课表  teacherList所有教师list
      //计算当前周的周一并保存
      changeCurrentMonday(this.calculateMonday(new Date()));
      // 保存所有教师列表
      changeTeachers(teacherList);
      // 默认取第一个教师的数据  保存teacherList中第一个教师的id
      changeCurrentTeacher(teacherList[0].teacherId);
      changeTeacherLessonList(resultList[0] || {});
    }).catch((e) => { console.log(e); });
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
        <Header />
        <Schedule />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.teacherSchedulePage;
  return {
    schoolId: stateData.schoolId
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeTeachers: actions.changeTeachers,
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeCurrentMonday: actions.changeCurrentMonday,
    changeTeacherLessonList: actions.changeTeacherLessonList,
    saveTeacherPageSchoolId: actions.saveTeacherPageSchoolId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherSchedule);
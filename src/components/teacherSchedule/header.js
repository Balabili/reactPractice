import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'antd/lib/select';
import * as actions from '../../actions/teacherSchedule';
import { formatDate, loadURL } from '../../utils/util';
import ajax from '../../utils/fetch';
const Option = Select.Option;

class TeacherScheduleHeader extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.viewAllClassSchedule = this.viewAllClassSchedule.bind(this);
  }

  handleChange(teacherId) {
    const self = this, { selectDay, schoolId, changeCurrentTeacher, changeTeacherLessonList } = self.props,
      data = { schoolId: schoolId, teacherId: teacherId, dateTime: formatDate(selectDay) };
    ajax('http://192.168.51.98:8088/app/findSchoolTeacherTimetable', data).then(({ resultList }) => {
      // 修改教师当天的课表
      changeTeacherLessonList(resultList[0] || {});
      // 修改当前选中教师的id
      changeCurrentTeacher(teacherId);
    }).catch((e) => { console.log(e); });
  }

  viewAllClassSchedule() {
    //通知安卓跳转
    loadURL('teacherSchedule://viewAll');
  }

  render() {
    const { teachers, teacherId } = this.props, options = teachers.map((item, index) => {
      return (<Option key={index} value={item.teacherId}>{item.teacherName}</Option>);
    });

    return (
      <div className='Teacher-schedule-header-container'>
        <Select className='Teacher-selector-container' value={teacherId} onChange={this.handleChange}>
          {options}
        </Select>
        <div className='View-all-schedule' onClick={this.viewAllClassSchedule}>查看所有课表</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.teacherSchedulePage;
  return {
    teachers: stateData.teachers,
    schoolId: stateData.schoolId,
    teacherId: stateData.teacherId,
    selectDay: stateData.selectDay
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeTeacherLessonList: actions.changeTeacherLessonList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScheduleHeader);
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'antd/lib/select';
import * as actions from '../../actions/teacherSchedule';
import ajax from '../../utils/fetch';
const Option = Select.Option;

class TeacherScheduleHeader extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(teacherId) {
    const { changeCurrentTeacher, changeTeacherLessonList } = this.props;
    changeCurrentTeacher(teacherId);
    //ajax
    //changeTeacherLessonList()
  }

  render() {
    const { teachers, teacherId } = this.props, options = teachers.map((item, index) => {
      return (<Option key={index} value={item.id}>{item.name}</Option>);
    });

    return (
      <div className='Teacher-schedule-header-container'>
        <Select className='Teacher-selector-container' value={teacherId} onChange={this.handleChange}>
          {options}
        </Select>
        <div className='View-all-schedule'>查看所有课表</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = state.teacherSchedulePage;
  return {
    teachers: data.teachers,
    teacherId: data.teacherId
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeTeacherLessonList: actions.changeTeacherLessonList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScheduleHeader);
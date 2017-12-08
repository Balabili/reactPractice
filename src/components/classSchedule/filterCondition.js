import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Condition from './condition';
import * as actions from '../../actions/classSchedule';
import { addDate, formatDate } from '../../utils/util';
import { formatScheduleList, formatTeacher } from '../../api/classSchedule';
import ajax from '../../utils/fetch';

class FilterCondition extends React.Component {
  constructor(props) {
    super(props);
    this.changeLesson = this.changeLesson.bind(this);
    this.changeTeacher = this.changeTeacher.bind(this);
  }

  changeLesson(lessonId) {
    const self = this, { currentMonday, changeLessonList, changeCurrentLesson, lessons } = self.props,
      start = formatDate(currentMonday), end = formatDate(addDate(currentMonday, 6)),
      lessonList = lessons.map((item, index) => {
        item.selected = item.level_id === lessonId;
        return item;
      });
    changeLessonList(lessonList);
    changeCurrentLesson(lessonId);
    let data = { schoolId: '2af15be1620d45e2968b70b8bf56179f', beginTime: start, endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList, teacherList }) => {
      const { changeCurrentSchedule, getCurrentTeacherList, colorList } = self.props;
      //改变课程  重新获取老师  改变老师List添加一个全部  默认选中  时间不变  获取课程数据
      getCurrentTeacherList(formatTeacher(teacherList, colorList));
      changeCurrentSchedule(formatScheduleList(resultList));
    }).catch((e) => { console.log(e); });
  }

  changeTeacher(teacherId) {
    const self = this, { teachers, getCurrentTeacherList, changeCurrentTeacher, currentMonday, lessonId } = self.props,
      start = formatDate(currentMonday), end = formatDate(addDate(currentMonday, 6)),
      teacherList = teachers.map((item) => {
        item.selected = item.teacher_id === teacherId;
        return item;
      });
    let data = { schoolId: '2af15be1620d45e2968b70b8bf56179f', beginTime: start, endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    if (teacherId) {
      data.teacherId = teacherId;
    }
    getCurrentTeacherList(teacherList);
    changeCurrentTeacher(teacherId);
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList }) => {
      const { changeCurrentSchedule } = self.props;
      changeCurrentSchedule(formatScheduleList(resultList));
    }).catch((e) => { console.log(e); });
  }

  render() {
    const { lessons, teachers } = this.props;
    return (
      <div className='Schedule-filter-container'>
        <Condition title='课程' itemList={lessons} onChangeTab={this.changeLesson}></Condition>
        <Condition title='教师' itemList={teachers} onChangeTab={this.changeTeacher}></Condition>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lessons: state.schedulePage.lessons,
    lessonId: state.schedulePage.lessonId,
    teachers: state.schedulePage.teachers,
    colorList: state.schedulePage.colorList,
    currentMonday: state.schedulePage.currentMonday,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeLessonList: actions.changeLessonList,
    changeCurrentLesson: actions.changeCurrentLesson,
    getCurrentTeacherList: actions.getCurrentTeacherList,
    changeCurrentTeacher: actions.changeCurrentTeacher,
    changeCurrentSchedule: actions.changeCurrentSchedule
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCondition);
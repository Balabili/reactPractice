import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Condition from './condition';
import * as actions from '../../actions/classSchedule';
import { addDate, formatDate } from '../../utils/util';
import { formatScheduleList, formatTeacher } from '../../api/commonApi';
import ajax from '../../utils/fetch';

class FilterCondition extends React.Component {
  constructor(props) {
    super(props);
    this.changeLesson = this.changeLesson.bind(this);
    this.changeTeacher = this.changeTeacher.bind(this);
  }

  changeLesson(lessonId) {
    const self = this, { currentMonday, changeLessonList, changeCurrentLesson, lessons, schoolId } = self.props,
      //格式化当前周的周一和周末  用于获取当前周的数据
      start = formatDate(currentMonday), end = formatDate(addDate(currentMonday, 6)),
      lessonList = lessons.map((item, index) => {
        item.selected = item.level_id === lessonId;
        return item;
      });
    // 改变课程状态
    changeLessonList(lessonList);
    //修改当前选中的课程id
    changeCurrentLesson(lessonId);
    let data = { schoolId: schoolId, beginTime: start, endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList, teacherList }) => {
      const { changeCurrentSchedule, getCurrentTeacherList, colorList } = self.props;
      //改变课程  重新获取老师  改变老师List添加一个全部  默认选中  时间不变  获取课程数据
      getCurrentTeacherList(formatTeacher(teacherList, colorList));
      //修改课表的课程
      changeCurrentSchedule(formatScheduleList(resultList));
    }).catch((e) => { console.log(e); });
  }

  changeTeacher(teacherId) {
    const self = this, { teachers, getCurrentTeacherList, changeCurrentTeacher, currentMonday, lessonId, schoolId } = self.props,
      //格式化当前周的周一和周末  用于获取当前周的数据
      start = formatDate(currentMonday), end = formatDate(addDate(currentMonday, 6)),
      teacherList = teachers.map((item) => {
        item.selected = item.teacher_id === teacherId;
        return item;
      });
    let data = { schoolId: schoolId, beginTime: start, endTime: end };
    if (lessonId) {
      data.levelId = lessonId;
    }
    if (teacherId) {
      data.teacherId = teacherId;
    }
    //修改教师选中状态
    getCurrentTeacherList(teacherList);
    //修改当前选中的教师的id
    changeCurrentTeacher(teacherId);
    ajax('http://192.168.51.98:8088/app/schoolTimeTable', data).then(({ resultList }) => {
      const { changeCurrentSchedule } = self.props;
      //修改课表的课程
      changeCurrentSchedule(formatScheduleList(resultList));
    }).catch((e) => { console.log(e); });
  }

  render() {
    const { lessons, teachers } = this.props;
    return (
      <div className='Schedule-filter-container'>
        <Condition title='课程' itemList={lessons} onChangeTab={this.changeLesson} />
        <Condition title='教师' itemList={teachers} onChangeTab={this.changeTeacher} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.schedulePage;
  return {
    lessons: stateData.lessons,
    lessonId: stateData.lessonId,
    teachers: stateData.teachers,
    colorList: stateData.colorList,
    currentMonday: stateData.currentMonday,
    schoolId: stateData.schoolId
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
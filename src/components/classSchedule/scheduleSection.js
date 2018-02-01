import React from 'react';
import { connect } from 'react-redux';
import { loadURL } from '../../utils/util';

class ScheduleSection extends React.Component {
  constructor(props) {
    super(props);
    this.viewLessonDetails = this.viewLessonDetails.bind(this);
  }

  viewLessonDetails({ target }) {
    const targetNode = target.dataset.id ? target : target.parentNode;
    let id = targetNode.dataset.id;
    if (id) {
      //通知安卓跳转链接
      loadURL(`classSchedule://${targetNode.dataset.id}`);
    } else {
      return;
    }
  }

  getChildLesson(lesson) {
    //没有数据  直接return
    if (!lesson) { return ''; }
    const { teachers } = this.props, len = teachers.length;
    return lesson.map((item, index) => {
      let style = {};
      // 生成对应课程的背景色
      for (let i = 0; i < len; i++) {
        if (teachers[i].teacher_id === item.teacherId) {
          style.backgroundColor = teachers[i].color;
          break;
        }
      }
      return (
        <div key={index} data-id={item.id} style={style} className='Schedule-body-lesson-component'>
          <div>{item.teacherName}</div>
          <div>{item.time}</div>
          <div>{item.name}</div>
          <div>￥{item.price || '0.00'}</div>
        </div>
      );
    });
  }

  currentTeacherHaveLessons(lessonList) {
    const lessonLength = lessonList.length;
    for (let i = 0; i < lessonLength; i++) {
      const lessons = lessonList[i].lessons || [], len = lessons.length;
      for (let j = 0; j < len; j++) {
        if (lessons[j].length) {
          return true;
        }
      }
    }
    return false;
  }

  getTeacherChildLesson(lessonList) {
    const self = this;
    return lessonList.map((item, index) => {
      return (
        <div key={index} className='Schedule-body-lesson-section'>
          {item.length ? self.initTeacherChildLesson(item) : ''}
        </div>
      );
    });
  }

  initTeacherChildLesson(data) {
    const { lessonColorMap } = this.props;
    return data.map((item, index) => {
      return (
        <div key={index} style={{ backgroundColor: lessonColorMap[item.id] }} data-id={item.id} className='Schedule-body-lesson-component'>
          <div>{item.time}</div>
          <div>{item.name}</div>
          <div>￥{item.price || '1000.00'}</div>
        </div>
      );
    });
  }

  render() {
    // hasLesson判断当前时段是否有课程
    let hasLesson = false, schedule = null;
    const self = this, defaulfSection = (<div className='Section-no-lesson'>没有课程</div>), { time, lessonList, isTeacherView } = this.props;
    if (isTeacherView) {
      hasLesson = self.currentTeacherHaveLessons(lessonList);
      // 没有课程不生成虚拟dom树 减少效率消耗
      if (hasLesson) {
        schedule = lessonList.map((item, index) => {
          return (
            <div key={index} className='Schedule-body-teacher-lesson-section'>
              <div className='Schedule-body-teacher-lesson-section-placename'>{item.place}</div>
              <div key={index} className='Schedule-body-teacher-lesson-section-container'>
                {item.lessons && item.lessons.length ? self.getTeacherChildLesson(item.lessons) : ''}
              </div>
            </div>
          );
        });
      }
    } else {
      schedule = lessonList.map((item, index) => {
        if (item.length) { hasLesson = true; }
        return (
          <div key={index} className='Schedule-body-lesson-section'>
            {item.length ? self.getChildLesson(item) : ''}
          </div>
        );
      });
    }

    // 根据是否是教师课程表动态生成对应的dom树
    return (
      <div className='Schedule-body-section-container'>
        <div className='Schedule-body-section-sidebar'>{time}</div>
        <div className={`${isTeacherView ? 'Teacher-schedule-body-section-content' : 'Schedule-body-section-content'}`} onClick={this.viewLessonDetails}>
          {hasLesson ? schedule : defaulfSection}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stateData = state.schedulePage;
  return {
    teachers: stateData.teachers,
    isTeacherView: stateData.isTeacherView,
    lessonColorMap: stateData.lessonColorMap
  };
}

export default connect(mapStateToProps)(ScheduleSection);